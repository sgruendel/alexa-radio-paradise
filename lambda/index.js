import Alexa from 'ask-sdk-core';
import i18next from 'i18next';
import sprintf from 'i18next-sprintf-postprocessor';
import winston from 'winston';
import * as handlers from './handlers.js';

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    transports: [
        new winston.transports.Console({
            format: winston.format.simple(),
        }),
    ],
    exitOnError: false,
});

const SKILL_ID = 'amzn1.ask.skill.9a6c0ff8-b416-407c-be53-1c67a58fe526';

const languageStrings = {
    en: {
        translation: {
            HELP_MESSAGE:
                "You can say 'Open Paradise Playlist' and I will tell you what's playing now on Radio Paradise Main Mix. Or you can ask for a channel, e.g. 'Open Paradise Playlist for Rock Mix'.",
            STOP_MESSAGE: 'See you soon!',
            NOT_UNDERSTOOD_MESSAGE: "Sorry, I don't understand. Please say again?",
            ASK_BILL_MESSAGE: 'Let me ask Bill ...',
            CURRENTLY_PLAYING_MESSAGE:
                "In {{channel}}, you're listening to {{song}} by {{artist}} from the {{released}} album {{album}}.",
            CURRENTLY_PLAYING_TEXT: "You're listening to {{song}} by {{artist}} from the {{released}} album {{album}}.",
            PREVIOUSLY_PLAYING_MESSAGE:
                'Previously, you were listening to {{song}} by {{artist}} from the {{released}} album {{album}}.',
            PREVIOUSLY_PLAYING_TEXT:
                'Previously, you were listening to {{song}} by {{artist}} from the {{released}} album {{album}}.',
            NEXT_PLAYING_MESSAGE:
                'Next, you were listening to {{song}} by {{artist}} from the {{released}} album {{album}}.',
            NEXT_PLAYING_TEXT:
                'Next, you were listening to {{song}} by {{artist}} from the {{released}} album {{album}}.',
            ADDITIONAL_INFO_MESSAGE:
                'Average rating by your fellow Radio Paradise listeners is {{avgRating}}, the length is {{length}}.',
            CANT_GET_PLAYLIST_MESSAGE: "I'm sorry, Bill's not there right now.",
            END_OF_PLAYLIST: "I'm sorry, but that's too long ago.",
            UNKNOWN_CHANNEL_MESSAGE: "I'm sorry, but I don't know that channel.",
        },
    },
    'en-US': {
        translation: {
            CANT_GET_PLAYLIST_MESSAGE:
                '<say-as interpret-as="interjection">bummer</say-as>, Bill\'s not there right now.',
        },
    },
    'en-CA': {
        translation: {
            CANT_GET_PLAYLIST_MESSAGE:
                '<say-as interpret-as="interjection">bummer</say-as>, Bill\'s not there right now.',
        },
    },
    'en-GB': {
        translation: {
            CANT_GET_PLAYLIST_MESSAGE:
                '<say-as interpret-as="interjection">blimey</say-as>, Bill\'s not there right now.',
        },
    },
    'en-AU': {
        translation: {
            CANT_GET_PLAYLIST_MESSAGE:
                '<say-as interpret-as="interjection">blimey</say-as>, Bill\'s not there right now.',
        },
    },
    'en-IN': {
        translation: {
            CANT_GET_PLAYLIST_MESSAGE:
                '<say-as interpret-as="interjection">blimey</say-as>, Bill\'s not there right now.',
        },
    },
    de: {
        translation: {
            HELP_MESSAGE:
                'Du kannst sagen „Öffne Paradise Playlist“ und ich sage dir was gerade im Radio Paradise Main Mix läuft. Oder du fragst nach einem Sender, z.B. „Öffne Paradise Playlist für Rock Mix“.',
            STOP_MESSAGE: '<say-as interpret-as="interjection">bis dann</say-as>.',
            NOT_UNDERSTOOD_MESSAGE: 'Entschuldigung, das verstehe ich nicht. Bitte wiederhole das?',
            CURRENTLY_PLAYING_MESSAGE:
                'Im {{channel}} hörst du gerade {{song}} von {{artist}} aus dem Album {{album}} von {{released}}.',
            CURRENTLY_PLAYING_TEXT: 'Du hörst gerade {{song}} von {{artist}} aus dem Album {{album}} von {{released}}.',
            PREVIOUSLY_PLAYING_MESSAGE:
                'Davor hörtest du {{song}} von {{artist}} aus dem Album {{album}} von {{released}}.',
            PREVIOUSLY_PLAYING_TEXT:
                'Davor hörtest du {{song}} von {{artist}} aus dem Album {{album}} von {{released}}.',
            NEXT_PLAYING_MESSAGE: 'Danach hörtest du {{song}} von {{artist}} aus dem Album {{album}} von {{released}}.',
            NEXT_PLAYING_TEXT: 'Danach hörtest du {{song}} von {{artist}} aus dem Album {{album}} von {{released}}.',
            ADDITIONAL_INFO_MESSAGE:
                'Die durchschnittliche Bewertung aller Radio Paradise-Hörer ist {{avgRating}}, die Länge beträgt {{length}}.',
            CANT_GET_PLAYLIST_MESSAGE: '<say-as interpret-as="interjection">schade</say-as>, Bill ist gerade nicht da.',
            END_OF_PLAYLIST: 'Tut mir leid, aber das ist zu lange her.',
            UNKNOWN_CHANNEL_MESSAGE: 'Ich kenne diesen Kanal leider nicht.',
        },
    },
    es: {
        translation: {
            HELP_MESSAGE:
                'Puedes decir „Abre Paradise Playlist“ y te diré qué se está reproduciendo ahora en Radio Paradise.',
            STOP_MESSAGE: '¡Adiós!',
            NOT_UNDERSTOOD_MESSAGE: 'Lo siento, no entiendo. Por favor repita eso?',
            CURRENTLY_PLAYING_MESSAGE:
                'En {{channel}} estás escuchando {{song}} por {{artist}} del álbum {{album}} de {{released}}.',
            CURRENTLY_PLAYING_TEXT: 'Estás escuchando {{song}} por {{artist}} del álbum {{album}} de {{released}}.',
            PREVIOUSLY_PLAYING_MESSAGE:
                'Antes de eso, escuchaste {{song}} por {{artist}} del álbum {{album}} de {{released}}.',
            PREVIOUSLY_PLAYING_TEXT:
                'Antes de eso, escuchaste {{song}} por {{artist}} del álbum {{album}} de {{released}}.',
            NEXT_PLAYING_MESSAGE: 'Entonces oíste {{song}} por {{artist}} del álbum {{album}} de {{released}}.',
            NEXT_PLAYING_TEXT: 'Entonces oíste {{song}} por {{artist}} del álbum {{album}} de {{released}}.',
            ADDITIONAL_INFO_MESSAGE:
                'La calificación promedio de sus compañeros oyentes de Radio Paradise es {{avgRating}}, la duración es {{length}}.',
            CANT_GET_PLAYLIST_MESSAGE: 'Lo siento, Bill no está ahí ahora.',
            END_OF_PLAYLIST: 'Lo siento, pero eso fue hace mucho tiempo.',
            UNKNOWN_CHANNEL_MESSAGE: 'Lo siento, pero no conozco ese canal.',
        },
    },
    fr: {
        translation: {
            HELP_MESSAGE:
                'Vous pouvez dire «Ouvre Paradise Playlist» et je vous dirai ce qui se passe actuellement sur Radio Paradise.',
            STOP_MESSAGE: 'Au revoir!',
            NOT_UNDERSTOOD_MESSAGE: 'Désolé, je ne comprends pas. Veuillez répéter ça?',
            CURRENTLY_PLAYING_MESSAGE:
                "Sur {{channel}} vous écoutez {{song}} de {{artist}} de l'album {{album}} de {{released}}.",
            CURRENTLY_PLAYING_TEXT: "Vous écoutez {{song}} de {{artist}} de l'album {{album}} de {{released}}.",
            PREVIOUSLY_PLAYING_MESSAGE:
                "Avant cela, vous avez entendu {{song}} de {{artist}} de l'album {{album}} de {{released}}.",
            PREVIOUSLY_PLAYING_TEXT:
                "Avant cela, vous avez entendu  {{song}} de {{artist}} de l'album {{album}} de {{released}}.",
            NEXT_PLAYING_MESSAGE:
                "Ensuite, vous avez entendu {{song}} de {{artist}} de l'album {{album}} de {{released}}.",
            NEXT_PLAYING_TEXT:
                "Ensuite, vous avez entendu {{song}} de {{artist}} de l'album {{album}} de {{released}}.",
            ADDITIONAL_INFO_MESSAGE:
                'Note moyenne de vos autres auditeurs de Radio Paradise: {{avgRating}}, la durée est de {{length}}.',
            CANT_GET_PLAYLIST_MESSAGE: "Je suis désolé, Bill n'est pas là pour le moment.",
            END_OF_PLAYLIST: "Je suis désolé, mais c'était il y a trop longtemps.",
            UNKNOWN_CHANNEL_MESSAGE: 'Je suis désolé, mais je ne connais pas cette chaîne.',
        },
    },
    it: {
        translation: {
            HELP_MESSAGE: 'Puoi dire „Apri Paradise Playlist“ e ti dirò cosa sta giocando ora su Radio Paradise.',
            STOP_MESSAGE: 'Ci vediamo!',
            NOT_UNDERSTOOD_MESSAGE: 'Scusa, non capisco. Per favore, ripetilo?',
            CURRENTLY_PLAYING_MESSAGE:
                "Sul {{channel}} stai ascoltando {{song}} di {{artist}} dall'album {{album}} del {{released}}.",
            CURRENTLY_PLAYING_TEXT: "Stai ascoltando {{song}} di {{artist}} dall'album {{album}} del {{released}}.",
            PREVIOUSLY_PLAYING_MESSAGE:
                "Prima di questo, hai sentito {{song}} di {{artist}} dall'album {{album}} del {{released}}.",
            PREVIOUSLY_PLAYING_TEXT:
                "Prima di questo, hai sentito {{song}} di {{artist}} dall'album {{album}} del {{released}}.",
            NEXT_PLAYING_MESSAGE: "Poi hai sentito {{song}} di {{artist}} dall'album {{album}} del {{released}}.",
            NEXT_PLAYING_TEXT: "Poi hai sentito {{song}} di {{artist}} dall'album {{album}} del {{released}}.",
            ADDITIONAL_INFO_MESSAGE:
                'Il punteggio medio dei tuoi ascoltatori di Radio Paradise è {{avgRating}}, la lunghezza è {{length}}.',
            CANT_GET_PLAYLIST_MESSAGE: 'Mi dispiace, Bill non è lì adesso.',
            END_OF_PLAYLIST: 'Mi dispiace, ma era troppo tempo fa.',
            UNKNOWN_CHANNEL_MESSAGE: 'Mi dispiace, ma non conosco quel canale.',
        },
    },
};
import('./utils.js').then((utils) => {
    languageStrings.de.translation.CURRENTLY_PLAYING_MESSAGE =
        'Im ' +
        utils.speakAs(utils.EN_US, '{{channel}}') +
        ' hörst du gerade {{song}} von {{artist}} aus dem Album {{album}} von {{released}}.';
    languageStrings.es.translation.CURRENTLY_PLAYING_MESSAGE =
        'En ' +
        utils.speakAs(utils.EN_US, '{{channel}}') +
        ' estás escuchando {{song}} por {{artist}} del álbum {{album}} de {{released}}.';
    languageStrings.fr.translation.CURRENTLY_PLAYING_MESSAGE =
        'Sur ' +
        utils.speakAs(utils.EN_US, '{{channel}}') +
        " vous écoutez {{song}} de {{artist}} de l'album {{album}} de {{released}}.";
    languageStrings.it.translation.CURRENTLY_PLAYING_MESSAGE =
        'Sul ' +
        utils.speakAs(utils.EN_US, '{{channel}}') +
        " stai ascoltando {{song}} di {{artist}} dall'album {{album}} del {{released}}.";
});

i18next.use(sprintf).init({
    overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
    resources: languageStrings,
    returnObjects: true,
});

const CFIRRadioParadiseIntentHandler = {
    canHandle(handlerInput) {
        const { request } = handlerInput.requestEnvelope;
        return request.type === 'CanFulfillIntentRequest' && request.intent.name === 'RadioParadiseIntent';
    },
    handle(handlerInput) {
        const { request } = handlerInput.requestEnvelope;
        logger.debug('request', request);

        const slots = request.intent && request.intent.slots;
        let canFulfillIntent = {
            canFulfill: 'NO',
            slots: {},
        };
        let canFulfillCountYes = 0;
        let canFulfillCountNo = 0;
        Object.keys(slots).forEach((slot) => {
            const name = slots[slot].name;
            const value = slots[slot].value;
            if (
                name === 'channel' &&
                (value === 'Main' ||
                    value === 'Main Mix' ||
                    value === 'Mellow' ||
                    value === 'Mellow Mix' ||
                    value === 'Rock' ||
                    value === 'Rock Mix' ||
                    value === 'Global' ||
                    value === 'Global Mix')
            ) {
                canFulfillIntent.slots[name] = {
                    canUnderstand: 'YES',
                    canFulfill: 'YES',
                };
                canFulfillCountYes++;
            } else {
                canFulfillIntent.slots[name] = {
                    canUnderstand: 'NO',
                    canFulfill: 'NO',
                };
                canFulfillCountNo++;
            }
        });
        if (canFulfillCountYes === 1 && canFulfillCountNo === 0) {
            canFulfillIntent.canFulfill = 'YES';
        }

        return handlerInput.responseBuilder.withCanFulfillIntent(canFulfillIntent).getResponse();
    },
};

const RadioParadiseIntentHandler = {
    canHandle(handlerInput) {
        const { request } = handlerInput.requestEnvelope;
        return (
            request.type === 'LaunchRequest' ||
            (request.type === 'IntentRequest' && request.intent.name === 'RadioParadiseIntent')
        );
    },
    async handle(handlerInput) {
        return handlers.handleRadioParadiseIntent(handlerInput);
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
        return handlerInput.responseBuilder.speak(requestAttributes.t('HELP_MESSAGE')).getResponse();
    },
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        const { request } = handlerInput.requestEnvelope;
        return (
            request.type === 'IntentRequest' &&
            (request.intent.name === 'AMAZON.CancelIntent' || request.intent.name === 'AMAZON.StopIntent')
        );
    },
    handle(handlerInput) {
        const { request } = handlerInput.requestEnvelope;
        logger.debug('request', request);

        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speechOutput = requestAttributes.t('STOP_MESSAGE');
        return handlerInput.responseBuilder.speak(speechOutput).getResponse();
    },
};

const PreviousIntentHandler = {
    canHandle(handlerInput) {
        const { request } = handlerInput.requestEnvelope;
        if (request.type === 'IntentRequest' && request.intent.name === 'AMAZON.PreviousIntent') {
            const attributes = handlerInput.attributesManager.getSessionAttributes();
            return attributes && Number.isInteger(attributes.index);
        }
        return false;
    },
    async handle(handlerInput) {
        return handlers.handlePreviousIntent(handlerInput);
    },
};

// For NextIntent, if we're already at beginning of playlist stored in session, just get current playlist from RP
const NextIntentOverflowHandler = {
    canHandle(handlerInput) {
        const { request } = handlerInput.requestEnvelope;
        if (request.type === 'IntentRequest' && request.intent.name === 'AMAZON.NextIntent') {
            const attributes = handlerInput.attributesManager.getSessionAttributes();
            return attributes && attributes.index === 0;
        }
        return false;
    },
    async handle(handlerInput) {
        return handlers.handleNextIntentOverflow(handlerInput);
    },
};

const NextIntentHandler = {
    canHandle(handlerInput) {
        const { request } = handlerInput.requestEnvelope;
        if (request.type === 'IntentRequest' && request.intent.name === 'AMAZON.NextIntent') {
            const attributes = handlerInput.attributesManager.getSessionAttributes();
            return attributes && Number.isInteger(attributes.index);
        }
        return false;
    },
    async handle(handlerInput) {
        return handlers.handleNextIntent(handlerInput);
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

const CFIRErrorHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'CanFulfillIntentRequest';
    },
    handle(handlerInput, error) {
        logger.error(error.stack || error.toString(), handlerInput.requestEnvelope.request);

        return handlerInput.responseBuilder
            .withCanFulfillIntent({
                canFulfill: 'NO',
                slots: {
                    channel: {
                        canUnderstand: 'NO',
                        canFulfill: 'NO',
                    },
                },
            })
            .getResponse();
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
        return handlerInput.responseBuilder.speak(speechOutput).reprompt(speechOutput).getResponse();
    },
};

const LocalizationInterceptor = {
    process(handlerInput) {
        i18next.changeLanguage(Alexa.getLocale(handlerInput.requestEnvelope));

        const attributes = handlerInput.attributesManager.getRequestAttributes();
        attributes.t = (...args) => {
            // @ts-ignore
            return i18next.t(...args);
        };
    },
};

let skill;

export const handler = async function (event, context) {
    if (!skill) {
        skill = Alexa.SkillBuilders.custom()
            .addRequestHandlers(
                CFIRRadioParadiseIntentHandler,
                RadioParadiseIntentHandler,
                HelpIntentHandler,
                CancelAndStopIntentHandler,
                PreviousIntentHandler,
                NextIntentOverflowHandler,
                NextIntentHandler,
                SessionEndedRequestHandler,
            )
            .addRequestInterceptors(LocalizationInterceptor)
            .addErrorHandlers(CFIRErrorHandler, ErrorHandler)
            .withApiClient(new Alexa.DefaultApiClient())
            .withSkillId(SKILL_ID)
            .create();
    }

    return skill.invoke(event, context);
};
