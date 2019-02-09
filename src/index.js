'use strict';

const Alexa = require('ask-sdk-core');
const i18next = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');
const dashbot = process.env.DASHBOT_API_KEY ? require('dashbot')(process.env.DASHBOT_API_KEY).alexa : undefined;
const winston = require('winston');

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    transports: [
        new winston.transports.Console({
            format: winston.format.simple(),
        }),
    ],
    exitOnError: false,
});

const radioParadise = require('./radio-paradise');

const SKILL_ID = 'amzn1.ask.skill.9a6c0ff8-b416-407c-be53-1c67a58fe526';
const TITLE = 'Radio Paradise Playlist'; // Used for card and display title
const EN_ON = '<lang xml:lang="en-US">';
const EN_OFF = '</lang>';
const RP_IMAGE_URL = 'https://img.radioparadise.com/';

const languageStrings = {
    en: {
        translation: {
            HELP_MESSAGE: "You can say 'Open Paradise Playlist' and I will tell you what's playing now on Radio Paradise.",
            STOP_MESSAGE: 'See you soon!',
            NOT_UNDERSTOOD_MESSAGE: 'Sorry, I don\'t understand. Please say again?',
            ASK_BILL_MESSAGE: 'Let me ask Bill ...',
            CURRENTLY_PLAYING_MESSAGE: "You're listening to {{song}} by {{artist}} from the {{released}} album {{album}}.",
            CURRENTLY_PLAYING_TEXT: "You're listening to {{song}} by {{artist}} from the {{released}} album {{album}}.",
            PREVIOUSLY_PLAYING_MESSAGE: 'Previously, you were listening to {{song}} by {{artist}} from the {{released}} album {{album}}.',
            PREVIOUSLY_PLAYING_TEXT: 'Previously, you were listening to {{song}} by {{artist}} from the {{released}} album {{album}}.',
            NEXT_PLAYING_MESSAGE: 'Next, you were listening to {{song}} by {{artist}} from the {{released}} album {{album}}.',
            NEXT_PLAYING_TEXT: 'Next, you were listening to {{song}} by {{artist}} from the {{released}} album {{album}}.',
            ADDITIONAL_INFO_MESSAGE: 'Average rating by your fellow Radio Paradise listeners is {{avgRating}}, the length is {{length}}.',
            CANT_GET_PLAYLIST_MESSAGE: "I'm sorry, Bill's not there right now.",
            END_OF_PLAYLIST: "I'm sorry, but that's too long ago.",
        },
    },
    'en-US': {
        translation: {
            CANT_GET_PLAYLIST_MESSAGE: '<say-as interpret-as="interjection">bummer</say-as>, Bill\'s not there right now.',
        },
    },
    'en-CA': {
        translation: {
            CANT_GET_PLAYLIST_MESSAGE: '<say-as interpret-as="interjection">bummer</say-as>, Bill\'s not there right now.',
        },
    },
    'en-GB': {
        translation: {
            CANT_GET_PLAYLIST_MESSAGE: '<say-as interpret-as="interjection">blimey</say-as>, Bill\'s not there right now.',
        },
    },
    'en-AU': {
        translation: {
            CANT_GET_PLAYLIST_MESSAGE: '<say-as interpret-as="interjection">blimey</say-as>, Bill\'s not there right now.',
        },
    },
    'en-IN': {
        translation: {
            CANT_GET_PLAYLIST_MESSAGE: '<say-as interpret-as="interjection">blimey</say-as>, Bill\'s not there right now.',
        },
    },
    de: {
        translation: {
            HELP_MESSAGE: 'Du kannst sagen „Öffne Paradise Playlist“ und ich sage dir was gerade auf Radio Paradise läuft.',
            STOP_MESSAGE: '<say-as interpret-as="interjection">bis dann</say-as>.',
            NOT_UNDERSTOOD_MESSAGE: 'Entschuldigung, das verstehe ich nicht. Bitte wiederhole das?',
            CURRENTLY_PLAYING_MESSAGE: 'Du hörst gerade ' + EN_ON + '{{song}}' + EN_OFF + ' von ' + EN_ON + '{{artist}}' + EN_OFF + ' aus dem Album ' + EN_ON + '{{album}}' + EN_OFF + ' von {{released}}.',
            CURRENTLY_PLAYING_TEXT: 'Du hörst gerade {{song}} von {{artist}} aus dem Album {{album}} von {{released}}.',
            PREVIOUSLY_PLAYING_MESSAGE: 'Davor hörtest du ' + EN_ON + '{{song}}' + EN_OFF + ' von ' + EN_ON + '{{artist}}' + EN_OFF + ' aus dem Album ' + EN_ON + '{{album}}' + EN_OFF + ' von {{released}}.',
            PREVIOUSLY_PLAYING_TEXT: 'Davor hörtest du {{song}} von {{artist}} aus dem Album {{album}} von {{released}}.',
            NEXT_PLAYING_MESSAGE: 'Danach hörtest du ' + EN_ON + '{{song}}' + EN_OFF + ' von ' + EN_ON + '{{artist}}' + EN_OFF + ' aus dem Album ' + EN_ON + '{{album}}' + EN_OFF + ' von {{released}}.',
            NEXT_PLAYING_TEXT: 'Danach hörtest du {{song}} von {{artist}} aus dem Album {{album}} von {{released}}.',
            ADDITIONAL_INFO_MESSAGE: 'Die durchschnittliche Bewertung aller Radio Paradise-Hörer ist {{avgRating}}, die Länge beträgt {{length}}.',
            CANT_GET_PLAYLIST_MESSAGE: '<say-as interpret-as="interjection">schade</say-as>, Bill ist gerade nicht da.',
            END_OF_PLAYLIST: 'Tut mir leid, aber das ist zu lange her.',
        },
    },
    es: {
        translation: {
            HELP_MESSAGE: 'Puedes decir „Abre Paradise Playlist“ y te diré qué se está reproduciendo ahora en Radio Paradise.',
            STOP_MESSAGE: '¡Adiós!',
            NOT_UNDERSTOOD_MESSAGE: 'Lo siento, no entiendo. Por favor repita eso?',
            CURRENTLY_PLAYING_MESSAGE: 'Estás escuchando ' + EN_ON + '{{song}}' + EN_OFF + ' por ' + EN_ON + '{{artist}}' + EN_OFF + ' del álbum ' + EN_ON + '{{album}}' + EN_OFF + ' de {{released}}.',
            CURRENTLY_PLAYING_TEXT: 'Estás escuchando {{song}} por {{artist}} del álbum {{album}} de {{released}}.',
            PREVIOUSLY_PLAYING_MESSAGE: 'Antes de eso, escuchaste ' + EN_ON + '{{song}}' + EN_OFF + ' por ' + EN_ON + '{{artist}}' + EN_OFF + ' del álbum ' + EN_ON + '{{album}}' + EN_OFF + ' de {{released}}.',
            PREVIOUSLY_PLAYING_TEXT: 'Antes de eso, escuchaste {{song}} por {{artist}} del álbum {{album}} de {{released}}.',
            NEXT_PLAYING_MESSAGE: 'Entonces oíste ' + EN_ON + '{{song}}' + EN_OFF + ' por ' + EN_ON + '{{artist}}' + EN_OFF + ' del álbum ' + EN_ON + '{{album}}' + EN_OFF + ' de {{released}}.',
            NEXT_PLAYING_TEXT: 'Entonces oíste {{song}} por {{artist}} del álbum {{album}} de {{released}}.',
            ADDITIONAL_INFO_MESSAGE: 'La calificación promedio de sus compañeros oyentes de Radio Paradise es {{avgRating}}, la duración es {{length}}.',
            CANT_GET_PLAYLIST_MESSAGE: 'Lo siento, Bill no está ahí ahora.',
            END_OF_PLAYLIST: 'Lo siento, pero eso fue hace mucho tiempo.',
        },
    },
    fr: {
        translation: {
            HELP_MESSAGE: 'Vous pouvez dire «Ouvre Paradise Playlist» et je vous dirai ce qui se passe actuellement sur Radio Paradise.',
            STOP_MESSAGE: 'Au revoir!',
            NOT_UNDERSTOOD_MESSAGE: 'Désolé, je ne comprends pas. Veuillez répéter ça?',
            CURRENTLY_PLAYING_MESSAGE: 'Vous écoutez ' + EN_ON + '{{song}}' + EN_OFF + ' de ' + EN_ON + '{{artist}}' + EN_OFF + " de l'album " + EN_ON + '{{album}}' + EN_OFF + ' de {{released}}.',
            CURRENTLY_PLAYING_TEXT: "Vous écoutez {{song}} de {{artist}} de l'album {{album}} de {{released}}.",
            PREVIOUSLY_PLAYING_MESSAGE: 'Avant cela, vous avez entendu ' + EN_ON + '{{song}}' + EN_OFF + ' de ' + EN_ON + '{{artist}}' + EN_OFF + " de l'album " + EN_ON + '{{album}}' + EN_OFF + ' de {{released}}.',
            PREVIOUSLY_PLAYING_TEXT: "Avant cela, vous avez entendu  {{song}} de {{artist}} de l'album {{album}} de {{released}}.",
            NEXT_PLAYING_MESSAGE: 'Ensuite, vous avez entendu ' + EN_ON + '{{song}}' + EN_OFF + ' de ' + EN_ON + '{{artist}}' + EN_OFF + " de l'album " + EN_ON + '{{album}}' + EN_OFF + ' de {{released}}.',
            NEXT_PLAYING_TEXT: "Ensuite, vous avez entendu {{song}} de {{artist}} de l'album {{album}} de {{released}}.",
            ADDITIONAL_INFO_MESSAGE: 'Note moyenne de vos autres auditeurs de Radio Paradise: {{avgRating}}, la durée est de {{length}}.',
            CANT_GET_PLAYLIST_MESSAGE: "Je suis désolé, Bill n'est pas là pour le moment.",
            END_OF_PLAYLIST: "Je suis désolé, mais c'était il y a trop longtemps.",
        },
    },
    it: {
        translation: {
            HELP_MESSAGE: 'Puoi dire „Apri Paradise Playlist“ e ti dirò cosa sta giocando ora su Radio Paradise.',
            STOP_MESSAGE: 'Ci vediamo!',
            NOT_UNDERSTOOD_MESSAGE: 'Scusa, non capisco. Per favore, ripetilo?',
            CURRENTLY_PLAYING_MESSAGE: 'Stai ascoltando ' + EN_ON + '{{song}}' + EN_OFF + ' di ' + EN_ON + '{{artist}}' + EN_OFF + " dall'album " + EN_ON + '{{album}}' + EN_OFF + ' del {{released}}.',
            CURRENTLY_PLAYING_TEXT: "Stai ascoltando {{song}} di {{artist}} dall'album {{album}} del {{released}}.",
            PREVIOUSLY_PLAYING_MESSAGE: 'Prima di questo, hai sentito ' + EN_ON + '{{song}}' + EN_OFF + ' di ' + EN_ON + '{{artist}}' + EN_OFF + " dall'album " + EN_ON + '{{album}}' + EN_OFF + ' del {{released}}.',
            PREVIOUSLY_PLAYING_TEXT: "Prima di questo, hai sentito {{song}} di {{artist}} dall'album {{album}} del {{released}}.",
            NEXT_PLAYING_MESSAGE: 'Poi hai sentito ' + EN_ON + '{{song}}' + EN_OFF + ' di ' + EN_ON + '{{artist}}' + EN_OFF + " dall'album " + EN_ON + '{{album}}' + EN_OFF + ' del {{released}}.',
            NEXT_PLAYING_TEXT: "Poi hai sentito {{song}} di {{artist}} dall'album {{album}} del {{released}}.",
            ADDITIONAL_INFO_MESSAGE: 'Il punteggio medio dei tuoi ascoltatori di Radio Paradise è {{avgRating}}, la lunghezza è {{length}}.',
            CANT_GET_PLAYLIST_MESSAGE: 'Mi dispiace, Bill non è lì adesso.',
            END_OF_PLAYLIST: 'Mi dispiace, ma era troppo tempo fa.',
        },
    },
};

// returns true if the skill is running on a device with a display (show|spot)
function supportsDisplay(handlerInput) {
    const { context } = handlerInput.requestEnvelope;
    return context
        && context.System
        && context.System.device
        && context.System.device.supportedInterfaces
        && context.System.device.supportedInterfaces.Display;
}

function getResponseForSong(handlerInput, song, msg, txt) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

    const date = new Date(null);
    date.setSeconds(song.duration / 1000);
    const speechOutput = requestAttributes.t(msg,
        {
            artist: song.artist, song: song.title, album: song.album,
            released: song.year,
        });
    const additionalInfo = requestAttributes.t('ADDITIONAL_INFO_MESSAGE',
        { avgRating: song.rating, length: date.toISOString().substr(14, 5) });
    const cardContent = requestAttributes.t(txt,
        {
            artist: song.artist, song: song.title, album: song.album,
            released: song.year,
            interpolation: { escapeValue: false },
        })
        + ' ' + additionalInfo;
    logger.info(cardContent);
    const smallImageUrl = RP_IMAGE_URL + song.cover.replace('\/l\/', '/s/');
    const largeImageUrl = RP_IMAGE_URL + song.cover;
    if (supportsDisplay(handlerInput)) {
        const primaryText = requestAttributes.t(txt, {
            artist: song.artist, song: song.title, album: song.album,
            released: song.year,
        });
        const coverImage = new Alexa.ImageHelper()
            .withDescription('album cover')
            .addImageInstance(smallImageUrl, 'X_SMALL', 160, 160)
            .addImageInstance(largeImageUrl, 'SMALL', 500, 500)
            .getImage();
        const textContent = new Alexa.RichTextContentHelper()
            .withPrimaryText(primaryText)
            .withSecondaryText('<font size="2">' + additionalInfo + '</font>')
            .getTextContent();
        handlerInput.responseBuilder
            .addRenderTemplateDirective({
                type: 'BodyTemplate2',
                backButton: 'HIDDEN',
                image: coverImage,
                title: TITLE,
                textContent: textContent,
            });
    }
    return handlerInput.responseBuilder
        .speak(speechOutput)
        .withStandardCard(TITLE, cardContent, smallImageUrl, largeImageUrl)
        .getResponse();
}

const RadioParadiseIntentHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        if ((request.type === 'LaunchRequest')
            || (request.type === 'IntentRequest' && request.intent.name === 'RadioParadiseIntent')) {

            return true;
        }

        // For NextIntent, if we're already at beginning of playlist stored in session, just get current playlist from RP
        if (request.type === 'IntentRequest' && request.intent.name === 'AMAZON.NextIntent') {
            const attributes = handlerInput.attributesManager.getSessionAttributes();
            if (attributes.index === 0) {
                return true;
            }
        }

        return false;
    },
    async handle(handlerInput) {
        const { request } = handlerInput.requestEnvelope;
        logger.debug('request', request);

        var response;
        await radioParadise.getNowPlaying()
            .then((songs) => {
                logger.debug('songs', songs);
                response = getResponseForSong(handlerInput, songs.song[0], 'CURRENTLY_PLAYING_MESSAGE', 'CURRENTLY_PLAYING_TEXT');
                handlerInput.attributesManager.setSessionAttributes({ index: 0, song: songs.song });
            })
            .catch((err) => {
                logger.error(err.stack || err.toString());
                const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
                const speechOutput = requestAttributes.t('CANT_GET_PLAYLIST_MESSAGE');
                response = handlerInput.responseBuilder
                    .speak(speechOutput)
                    .getResponse();
            });

        return response;
    },
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        const { request } = handlerInput.requestEnvelope;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const { request } = handlerInput.requestEnvelope;
        logger.debug('request', request);

        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        return handlerInput.responseBuilder
            .speak(requestAttributes.t('HELP_MESSAGE'))
            .getResponse();
    },
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        const { request } = handlerInput.requestEnvelope;
        return request.type === 'IntentRequest'
            && (request.intent.name === 'AMAZON.CancelIntent' || request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const { request } = handlerInput.requestEnvelope;
        logger.debug('request', request);

        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speechOutput = requestAttributes.t('STOP_MESSAGE');
        return handlerInput.responseBuilder
            .speak(speechOutput)
            .getResponse();
    },
};

const PreviousIntentHandler = {
    canHandle(handlerInput) {
        const { request } = handlerInput.requestEnvelope;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.PreviousIntent';
    },
    handle(handlerInput) {
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
            return handlerInput.responseBuilder
                .speak(requestAttributes.t('END_OF_PLAYLIST'))
                .getResponse();
        }
    },
};

const NextIntentHandler = {
    canHandle(handlerInput) {
        const { request } = handlerInput.requestEnvelope;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.NextIntent';
    },
    handle(handlerInput) {
        const { request } = handlerInput.requestEnvelope;
        logger.debug('request', request);

        const attributes = handlerInput.attributesManager.getSessionAttributes();
        logger.debug('attributes', attributes);

        // No need to check for `index > 0`, for `index = 0` RadioParadiseIntentHandler already handled it.
        attributes.index -= 1;

        // No need to set session attributes, we've just modified the object directly :)
        return getResponseForSong(handlerInput, attributes.song[attributes.index], 'NEXT_PLAYING_MESSAGE', 'NEXT_PLAYING_TEXT');
    },
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        const { request } = handlerInput.requestEnvelope;
        try {
            if (request.reason === 'ERROR') {
                logger.error(request.error.type + ': ' + request.error.message);
            }
        } catch (err) {
            logger.error(err.stack || err.toString(), request);
        }

        logger.debug('session ended', request);
        return handlerInput.responseBuilder.getResponse();
    },
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        logger.error(error.stack || error.toString(), handlerInput.requestEnvelope.request);
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speechOutput = requestAttributes.t('NOT_UNDERSTOOD_MESSAGE');
        return handlerInput.responseBuilder
            .speak(speechOutput)
            .reprompt(speechOutput)
            .getResponse();
    },
};

const LocalizationInterceptor = {
    process(handlerInput) {
        i18next.use(sprintf).init({
            lng: handlerInput.requestEnvelope.request.locale,
            overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
            resources: languageStrings,
            returnObjects: true,
        });

        const attributes = handlerInput.attributesManager.getRequestAttributes();
        attributes.t = (...args) => {
            return i18next.t(...args);
        };
    },
};

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        RadioParadiseIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        PreviousIntentHandler,
        NextIntentHandler,
        SessionEndedRequestHandler)
    .addRequestInterceptors(LocalizationInterceptor)
    .addErrorHandlers(ErrorHandler)
    .withApiClient(new Alexa.DefaultApiClient())
    .withSkillId(SKILL_ID)
    .lambda();
if (dashbot) exports.handler = dashbot.handler(exports.handler);
