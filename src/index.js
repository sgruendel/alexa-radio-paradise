'use strict';

const Alexa = require('ask-sdk-core');
const i18n = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');
const dashbot = process.env.DASHBOT_API_KEY ? require('dashbot')(process.env.DASHBOT_API_KEY).alexa : undefined;

const radioParadise = require('./radio-paradise');

const SKILL_ID = 'amzn1.ask.skill.9a6c0ff8-b416-407c-be53-1c67a58fe526';
const TITLE = 'Radio Paradise Playlist'; // Used for card and display title

const languageStrings = {
    en: {
        translation: {
            HELP_MESSAGE: 'You can say „Ask Paradise Playlist for current song“, or you can say „Exit“. What can I help you with?',
            HELP_REPROMPT: 'What can I help you with?',
            STOP_MESSAGE: 'See you soon!',
            ASK_BILL_MESSAGE: 'Let me ask Bill ...',
            CURRENTLY_PLAYING_MESSAGE: "You're listening to {{song}} by {{artist}} from the {{released}} album {{album}}.",
            ADDITIONAL_INFO_MESSAGE: 'Average rating by your fellow Radio Paradise listeners is {{avgRating}}, the length is {{length}} and it was played {{plays}} times in the last 30 days.',
            CANT_GET_PLAYLIST_MESSAGE: "I'm sorry, Bill's not there right now.",
        },
    },
    de: {
        translation: {
            HELP_MESSAGE: 'Du kannst sagen „Frage Paradise Playlist nach dem aktuellen Lied“, oder du kannst „Beenden“ sagen. Wie kann ich dir helfen?',
            HELP_REPROMPT: 'Wie kann ich dir helfen?',
            STOP_MESSAGE: '<say-as interpret-as="interjection">bis dann</say-as>.',
            ASK_BILL_MESSAGE: 'Ich frage mal Bill ...',
            CURRENTLY_PLAYING_MESSAGE: 'Du hörst gerade {{song}} von {{artist}} aus dem Album {{album}} von {{released}}.',
            ADDITIONAL_INFO_MESSAGE: 'Die durchschnittliche Bewertung aller Radio Paradise-Hörer ist {{avgRating}}, die Länge beträgt {{length}} und es wurde in den letzten 30 Tagen {{plays}} Mal gespielt.',
            CANT_GET_PLAYLIST_MESSAGE: '<say-as interpret-as="interjection">schade</say-as>, Bill ist gerade nicht da.',
        },
    },
    es: {
        translation: {
            HELP_MESSAGE: 'Puede decir „Preguntar a Paradise Playlist después de la canción actual“, o puede decir „Salir“. ¿Cómo puedo ayudarte?',
            HELP_REPROMPT: '¿Cómo puedo ayudarte?',
            STOP_MESSAGE: '¡Adiós!',
            ASK_BILL_MESSAGE: 'Dejame preguntarle a Bill ...',
            CURRENTLY_PLAYING_MESSAGE: 'Estás escuchando {{song}} por {{artist}} del álbum {{album}} de {{released}}.',
            ADDITIONAL_INFO_MESSAGE: 'La calificación promedio de sus compañeros oyentes de Radio Paradise es {{avgRating}}, la duración es {{length}} y se jugó {{plays}} veces en los últimos 30 días.',
            CANT_GET_PLAYLIST_MESSAGE: 'Lo siento, Bill no está ahí ahora.',
        },
    },
    fr: {
        translation: {
            HELP_MESSAGE: 'Vous pouvez dire „Frage Paradise Playlist nach dem aktuellen Lied“, ou vous pouvez dire „Quitter“. Comment puis-je vous aider?',
            HELP_REPROMPT: 'Comment puis-je vous aider?',
            STOP_MESSAGE: 'Au revoir!',
            ASK_BILL_MESSAGE: 'Je vais demander à Bill ...',
            CURRENTLY_PLAYING_MESSAGE: "Vous écoutez {{song}} di {{artist}} de l'album {{album}} del {{released}}.",
            ADDITIONAL_INFO_MESSAGE: 'Note moyenne de vos autres auditeurs de Radio Paradise: {{avgRating}}, la durée est de {{length}} et il a été joué {{plays}} fois au cours des 30 derniers jours.',
            CANT_GET_PLAYLIST_MESSAGE: "Je suis désolé, Bill n'est pas là pour le moment.",
        },
    },
    it: {
        translation: {
            HELP_MESSAGE: 'Puoi dire „Chiedi a Paradise Playlist dopo la canzone corrente“, o puoi dire „Esci“. Come posso aiutarti?',
            HELP_REPROMPT: 'Come posso aiutarti?',
            STOP_MESSAGE: 'Ci vediamo!',
            ASK_BILL_MESSAGE: 'Chiederò a Bill ...',
            CURRENTLY_PLAYING_MESSAGE: "Stai ascoltando {{song}} di {{artist}} dall'album {{album}} del {{released}}.",
            ADDITIONAL_INFO_MESSAGE: 'Il punteggio medio dei tuoi ascoltatori di Radio Paradise è {{avgRating}}, la lunghezza è {{length}} ed è stata giocata {{plays}} volte negli ultimi 30 giorni.',
            CANT_GET_PLAYLIST_MESSAGE: 'Mi dispiace, Bill non è lì adesso.',
        },
    },
};

// sends a progressive response, see https://forums.developer.amazon.com/questions/170300/progressive-response-in-nodejs-sdk-v2.html
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

// returns true if the skill is running on a device with a display (show|spot)
function supportsDisplay(handlerInput) {
    const { context } = handlerInput.requestEnvelope;
    return context
        && context.System
        && context.System.device
        && context.System.device.supportedInterfaces
        && context.System.device.supportedInterfaces.Display;
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
                const additionalInfo = requestAttributes.t('ADDITIONAL_INFO_MESSAGE',
                    { avgRating: songInfo.avgRating, length: songInfo.length, plays: songInfo.plays });
                const cardContent = requestAttributes.t('CURRENTLY_PLAYING_MESSAGE',
                    {
                        artist: songInfo.artist, song: songInfo.song, album: songInfo.album,
                        released: songInfo.released,
                        interpolation: { escapeValue: false },
                    })
                    + ' ' + additionalInfo;
                console.log(cardContent);
                const smallImageUrl = songInfo.cover.replace('\/m\/', '/s/');
                const largeImageUrl = songInfo.cover.replace('\/m\/', '/l/');

                if (supportsDisplay(handlerInput)) {
                    const coverImage = new Alexa.ImageHelper()
                        .withDescription('album cover')
                        .addImageInstance(songInfo.cover, 'X_SMALL', 160, 160)
                        .addImageInstance(largeImageUrl, 'SMALL', 500, 500)
                        .getImage();
                    const textContent = new Alexa.RichTextContentHelper()
                        .withPrimaryText(speechOutput)
                        .withSecondaryText('<font size="2">' + additionalInfo + '</font>')
                        // .withTertiaryText('<font size="2">' + songInfo.lyrics + '</font>')
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
                response = handlerInput.responseBuilder
                    .speak(speechOutput)
                    .withStandardCard(TITLE, cardContent, smallImageUrl, largeImageUrl)
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
                console.error('error sending progressive response', err);
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
        console.error('Error handled:', error);
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
if (dashbot) exports.handler = dashbot.handler(exports.handler);
