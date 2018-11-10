'use strict';

// include the testing framework
const alexaTest = require('alexa-skill-test-framework');

// initialize the testing framework
alexaTest.initialize(
    require('../src/index'),
    'amzn1.ask.skill.9a6c0ff8-b416-407c-be53-1c67a58fe526',
    'amzn1.ask.account.VOID');
alexaTest.setLocale('de-DE');

describe('Paradise Playlist Skill', () => {

    describe('ErrorHandler', () => {
        alexaTest.test([
            {
                request: alexaTest.getIntentRequest(''),
                says: 'Entschuldigung, das verstehe ich nicht. Bitte wiederhole das?',
                reprompts: 'Entschuldigung, das verstehe ich nicht. Bitte wiederhole das?',
                shouldEndSession: false,
            },
        ]);
    });

    describe('HelpIntent', () => {
        alexaTest.test([
            {
                request: alexaTest.getIntentRequest('AMAZON.HelpIntent'),
                says: 'Du kannst sagen „Öffne Paradise Playlist“ und ich sage dir was gerade auf Radio Paradise läuft.',
                repromptsNothing: true, shouldEndSession: true,
            },
        ]);
    });

    describe('SessionEndedRequest', () => {
        alexaTest.test([
            {
                request: alexaTest.getSessionEndedRequest(),
                saysNothing: true, repromptsNothing: true, shouldEndSession: true,
            },
        ]);
    });

    describe('CancelIntent', () => {
        alexaTest.test([
            {
                request: alexaTest.getIntentRequest('AMAZON.CancelIntent'),
                says: '<say-as interpret-as="interjection">bis dann</say-as>.',
                repromptsNothing: true, shouldEndSession: true,
            },
        ]);
    });

    describe('StopIntent', () => {
        alexaTest.test([
            {
                request: alexaTest.getIntentRequest('AMAZON.StopIntent'),
                says: '<say-as interpret-as="interjection">bis dann</say-as>.',
                repromptsNothing: true, shouldEndSession: true,
            },
        ]);
    });

    describe('LaunchRequest', () => {
        alexaTest.test([
            {
                request: alexaTest.getLaunchRequest(),
                saysLike: 'Du hörst gerade ',
                hasCardTitle: 'Radio Paradise Playlist',
                hasCardTextLike: 'Du hörst gerade ',
                hasSmallImageUrlLike: 'https://img.radioparadise.com/covers/s/',
                hasLargeImageUrlLike: 'https://img.radioparadise.com/covers/l/',
                repromptsNothing: true, shouldEndSession: true,
            },
        ]);
    });

    describe('RadioParadiseIntent', () => {
        alexaTest.test([
            {
                request: alexaTest.getIntentRequest('RadioParadiseIntent'),
                saysLike: 'Du hörst gerade ',
                hasCardTitle: 'Radio Paradise Playlist',
                hasCardTextLike: 'Du hörst gerade ',
                hasSmallImageUrlLike: 'https://img.radioparadise.com/covers/s/',
                hasLargeImageUrlLike: 'https://img.radioparadise.com/covers/l/',
                repromptsNothing: true, shouldEndSession: true,
            },
        ]);
    });
});
