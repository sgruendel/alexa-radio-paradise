import Alexa from 'ask-sdk-core';
// eslint-disable-next-line no-unused-vars -- needed for typedefs
import services from 'ask-sdk-model';
import winston from 'winston';

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    transports: [
        new winston.transports.Console({
            format: winston.format.simple(),
        }),
    ],
    exitOnError: false,
});

import * as radioParadise from './radio-paradise.js';
import * as utils from './utils.js';

const RP_IMAGE_URL = 'https://img.radioparadise.com/';
const ER_SUCCESS_MATCH = 'ER_SUCCESS_MATCH';
const ER_SUCCESS_NO_MATCH = 'ER_SUCCESS_NO_MATCH';

/**
 * Generate a response for a given song, including speech output, card content, and image URLs.
 *
 * @param handlerInput Alexa handler input
 * @param {radioParadise.Song} song information about a specific song
 * @param {string} msg Message to be spoken by Alexa. It may contain placeholders that will be replaced with specific
 *          values from the `song` object.
 * @param {string} txt Text template for generating the card content. It is used to format the information about the
 *          song, such as the artist, title, album, and release year.  The template may contain placeholders.
 *
 * @returns a response object that includes the speech output, a standard card, and any APL directives if applicable.
 */
function getResponseForSong(handlerInput, song, msg, txt) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const locale = Alexa.getLocale(handlerInput.requestEnvelope);

    // i18next must not escape interpolation values, as they may contain <lang> tags
    const speechOutput = requestAttributes.t(msg, {
        channel: song.channel.title,
        artist: utils.speakArtist(song.artist, locale, logger),
        song: utils.speakTitle(song.title, locale, logger),
        album: utils.speakAlbum(song.album, locale, logger),
        released: song.year,
        interpolation: { escapeValue: false },
    });
    const additionalInfo = requestAttributes.t('ADDITIONAL_INFO_MESSAGE', {
        avgRating: song.rating,
        length: utils.secondsToTime(Number(song.duration) / 1000),
    });
    const cardContent =
        requestAttributes.t(txt, {
            artist: song.artist,
            song: song.title,
            album: song.album,
            released: song.year,
            interpolation: { escapeValue: false },
        }) +
        ' ' +
        additionalInfo;
    logger.info(cardContent);
    const smallImageUrl = RP_IMAGE_URL + song.cover.replace('/l/', '/s/');
    const largeImageUrl = RP_IMAGE_URL + song.cover;
    if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
        const primaryText = requestAttributes.t(txt, {
            artist: song.artist,
            song: song.title,
            album: song.album,
            released: song.year,
        });

        const document = {
            type: 'APL',
            version: '1.6',
            import: [
                {
                    name: 'alexa-layouts',
                    version: '1.3.0',
                },
            ],
            mainTemplate: {
                parameters: ['detailTemplateData'],
                item: [
                    {
                        type: 'AlexaDetail',
                        headerTitle: '${detailTemplateData.headerTitle}',
                        primaryText: '${detailTemplateData.primaryText}',
                        secondaryText: '${detailTemplateData.secondaryText}',
                        imageSource: '${detailTemplateData.imageSource}',
                    },
                ],
            },
        };
        const datasources = {
            detailTemplateData: {
                headerTitle: song.channel.title,
                primaryText: primaryText,
                secondaryText: '<font size="2">' + additionalInfo + '</font>',
                imageSource: largeImageUrl,
            },
        };
        handlerInput.responseBuilder.addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            version: '1.1',
            document,
            datasources,
        });
    }

    let domainStart = '';
    let domainEnd = '';
    if (locale === 'en-US') {
        logger.debug('Using music domain for ' + locale);
        domainStart = '<amazon:domain name="music">';
        domainEnd = '</amazon:domain>';
    }
    return handlerInput.responseBuilder
        .speak(domainStart + speechOutput + domainEnd)
        .withStandardCard(song.channel.title, cardContent, smallImageUrl, largeImageUrl)
        .getResponse();
}

async function getNowPlayingResponse(channelId, handlerInput) {
    const locale = Alexa.getLocale(handlerInput.requestEnvelope);

    let response;
    await radioParadise
        .getNowPlaying(channelId)
        .then((songs) => {
            /** @type {radioParadise.Song[]} */
            let songArray = [];
            for (let i = 0; songs.song[i]; i++) {
                songArray.push(utils.fixSong(songs.song[i], locale));
            }

            logger.debug('songs for ' + channelId, songs);
            response = getResponseForSong(
                handlerInput,
                songArray[0],
                'CURRENTLY_PLAYING_MESSAGE',
                'CURRENTLY_PLAYING_TEXT',
            );
            handlerInput.attributesManager.setSessionAttributes({ index: 0, song: songArray });
        })
        .catch((err) => {
            logger.error(err.stack || err.toString());
            const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
            const speechOutput = requestAttributes.t('CANT_GET_PLAYLIST_MESSAGE');
            response = handlerInput.responseBuilder.speak(speechOutput).getResponse();
        });
    return response;
}

export async function handleRadioParadiseIntent(handlerInput) {
    /** @type {services.IntentRequest} */
    // @ts-ignore
    const { request } = handlerInput.requestEnvelope;
    logger.debug('request', request);

    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const slots = request.intent && request.intent.slots;
    const rpaChannel =
        slots && slots.channel && slots.channel.resolutions && slots.channel.resolutions.resolutionsPerAuthority[0];
    logger.debug('channel', rpaChannel);
    let channelId = radioParadise.mix.main;
    if (rpaChannel) {
        switch (rpaChannel.status.code) {
            case ER_SUCCESS_NO_MATCH:
                logger.error('no match for channel ' + slots.channel.value);
                const speechOutput = requestAttributes.t('UNKNOWN_CHANNEL_MESSAGE');
                return handlerInput.responseBuilder.speak(speechOutput).getResponse();

            case ER_SUCCESS_MATCH:
                channelId = rpaChannel.values[0].value.id;
                logger.debug('using channel ' + rpaChannel.values[0].value.name);
                break;

            default:
                logger.error('unexpected status code ' + rpaChannel.status.code);
        }
    }

    return getNowPlayingResponse(channelId, handlerInput);
}

export async function handlePreviousIntent(handlerInput) {
    /** @type {services.IntentRequest} */
    // @ts-ignore
    const { request } = handlerInput.requestEnvelope;
    logger.debug('request', request);

    const attributes = handlerInput.attributesManager.getSessionAttributes();
    logger.debug('attributes', attributes);
    const song = attributes.song[attributes.index + 1];
    if (song) {
        attributes.index += 1;
        handlerInput.attributesManager.setSessionAttributes(attributes);
        return getResponseForSong(handlerInput, song, 'PREVIOUSLY_PLAYING_MESSAGE', 'PREVIOUSLY_PLAYING_TEXT');
    } else {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        return handlerInput.responseBuilder.speak(requestAttributes.t('END_OF_PLAYLIST')).getResponse();
    }
}

export async function handleNextIntentOverflow(handlerInput) {
    /** @type {services.IntentRequest} */
    // @ts-ignore
    const { request } = handlerInput.requestEnvelope;
    logger.debug('request', request);

    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    logger.debug('using channel ' + sessionAttributes.song[0].channel.title);
    return getNowPlayingResponse(sessionAttributes.song[0].channel.chan, handlerInput);
}

export async function handleNextIntent(handlerInput) {
    /** @type {services.IntentRequest} */
    // @ts-ignore
    const { request } = handlerInput.requestEnvelope;
    logger.debug('request', request);

    const attributes = handlerInput.attributesManager.getSessionAttributes();
    logger.debug('attributes', attributes);

    // No need to check for `index > 0`, for `index = 0` NextIntentOverflowHandler already handled it.
    attributes.index -= 1;

    // No need to set session attributes, we've just modified the object directly :)
    return getResponseForSong(
        handlerInput,
        attributes.song[attributes.index],
        'NEXT_PLAYING_MESSAGE',
        'NEXT_PLAYING_TEXT',
    );
}
