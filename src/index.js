'use strict';

const Alexa = require('ask-sdk-core');
const i18n = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');

const radioParadise = require('./radio-paradise');

const SKILL_ID = 'amzn1.ask.skill.9a6c0ff8-b416-407c-be53-1c67a58fe526';
const languageStrings = {
    en: {
        translation: {
            HELP_MESSAGE: 'You can say „Ask Paradise Playlist for current song“, or you can say „Exit“. What can I help you with?',
            HELP_REPROMPT: 'What can I help you with?',
            STOP_MESSAGE: 'Goodbye!',
            ASK_BILL_MESSAGE: 'Let me ask Bill ...',
            CURRENTLY_PLAYING_MESSAGE: "You're listening to {{song}} by {{artist}} from the {{released}} album {{album}}.",
            ADDITIONAL_INFO_MESSAGE: 'Average rating by your fellow Radio Paradise listeners is {{avgRating}}, the length is {{length}} and it was played {{plays}} times in the last 30 days.',
            CANT_GET_PLAYLIST_MESSAGE: "I'm sorry, I can't get that information currently.",
        },
    },

    de: {
        translation: {
            HELP_MESSAGE: 'Du kannst sagen „Frage Paradise Playlist nach dem aktuellen Lied“, oder du kannst „Beenden“ sagen. Wie kann ich dir helfen?',
            HELP_REPROMPT: 'Wie kann ich dir helfen?',
            STOP_MESSAGE: 'Auf Wiedersehen!',
            ASK_BILL_MESSAGE: 'Ich frage mal Bill ...',
            CURRENTLY_PLAYING_MESSAGE: 'Du hörst gerade {{song}} von {{artist}} aus dem Album {{album}} von {{released}}.',
            ADDITIONAL_INFO_MESSAGE: 'Die durchschnittliche Bewertung aller Radio Paradise-Hörer ist {{avgRating}}, die Länge beträgt {{length}} und es wurde in den letzten 30 Tagen {{plays}} Mal gespielt.',
            CANT_GET_PLAYLIST_MESSAGE: 'Es tut mir leid, das kann ich gerade nicht herausfinden.',
        },
    },
};

function callDirectiveService(handlerInput, speech) {
    const { apiEndpoint, apiAccessToken } = handlerInput.requestEnvelope.context.System;
    return handlerInput.serviceClientFactory.getDirectiveServiceClient().enqueue(
        {
            header: {
                requestId: handlerInput.requestEnvelope.request.requestId,
            },
            directive: {
                type: 'VoicePlayer.Speak',
                speech: speech,
            },
        },
        apiEndpoint, apiAccessToken);
}

const RadioParadiseIntentHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return (request.type === 'LaunchRequest')
            || (request.type === 'IntentRequest' && request.intent.name === 'RadioParadiseIntent');
    },
    async handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

        const progressiveResponse = callDirectiveService(handlerInput, requestAttributes.t('ASK_BILL_MESSAGE'));

        var response;
        await radioParadise.getNowPlaying()
            .then((songInfo) => {
                const speechOutput = requestAttributes.t('CURRENTLY_PLAYING_MESSAGE',
                    {
                        artist: songInfo.artist, song: songInfo.song, album: songInfo.album,
                        released: songInfo.released,
                    });
                const cardContent = requestAttributes.t('CURRENTLY_PLAYING_MESSAGE',
                    {
                        artist: songInfo.artist, song: songInfo.song, album: songInfo.album,
                        released: songInfo.released,
                        interpolation: { escapeValue: false },
                    })
                    + ' ' + requestAttributes.t('ADDITIONAL_INFO_MESSAGE',
                    { avgRating: songInfo.avgRating, length: songInfo.length, plays: songInfo.plays });
                console.log(cardContent);
                const smallImageUrl = songInfo.cover.replace('\/m\/', '/s/');
                const largeImageUrl = songInfo.cover.replace('\/m\/', '/l/');

                response = handlerInput.responseBuilder
                    .speak(speechOutput)
                    .withStandardCard('Radio Paradise Playlist', cardContent, smallImageUrl, largeImageUrl)
                    .getResponse();
            })
            .catch((err) => {
                console.error('Error getting playlist', err);
                const speechOutput = requestAttributes.t('CANT_GET_PLAYLIST_MESSAGE');
                response = handlerInput.responseBuilder
                    .speak(speechOutput)
                    .getResponse();
            });

        // For the best customer experience, your skill should wait until the progressive
        // response call completes before you send the full response object.
        await progressiveResponse
            .catch((err) => {
                console.log('error sending progressive response', err);
            });
        return response;
    },
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speechOutput = requestAttributes.t('HELP_MESSAGE');
        const repromptSpeechOutput = requestAttributes.t('HELP_REPROMPT');
        return handlerInput.responseBuilder
            .speak(speechOutput)
            .reprompt(repromptSpeechOutput)
            .getResponse();
    },
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
            && (request.intent.name === 'AMAZON.CancelIntent' || request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speechOutput = requestAttributes.t('STOP_MESSAGE');
        return handlerInput.responseBuilder
            .speak(speechOutput)
            .getResponse();
    },
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log('Session ended with reason:', handlerInput.requestEnvelope.request.reason);
        return handlerInput.responseBuilder.getResponse();
    },
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);

        return handlerInput.responseBuilder
            .speak('Sorry, I can\'t understand the command. Please say again?')
            .reprompt('Sorry, I can\'t understand the command. Please say again?')
            .getResponse();
    },
};

const LocalizationInterceptor = {
    process(handlerInput) {
        const localizationClient = i18n.use(sprintf).init({
            lng: handlerInput.requestEnvelope.request.locale,
            overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
            resources: languageStrings,
            returnObjects: true,
        });

        const attributes = handlerInput.attributesManager.getRequestAttributes();
        attributes.t = (...args) => {
            return localizationClient.t(...args);
        };
    },
};

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        RadioParadiseIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler)
    .addRequestInterceptors(LocalizationInterceptor)
    .addErrorHandlers(ErrorHandler)
    .withApiClient(new Alexa.DefaultApiClient())
    .withSkillId(SKILL_ID)
    .lambda();
