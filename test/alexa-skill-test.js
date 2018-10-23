'use strict';

// include the testing framework
const alexaTest = require('alexa-skill-test-framework');

// initialize the testing framework
alexaTest.initialize(
    require('../src/index'),
    'amzn1.ask.skill.9a6c0ff8-b416-407c-be53-1c67a58fe526',
    'amzn1.ask.account.VOID');

describe('Paradise Playlist Skill', () => {
    describe('LaunchRequest', () => {
        alexaTest.test([
            {
                request: alexaTest.getLaunchRequest(),
                saysLike: "You're listening to",
                hasCardTitle: 'Radio Paradise Playlist',
                hasCardTextLike: "You're listening to",
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
                saysLike: "You're listening to",
                hasCardTitle: 'Radio Paradise Playlist',
                hasCardTextLike: "You're listening to",
                hasSmallImageUrlLike: 'https://img.radioparadise.com/covers/s/',
                hasLargeImageUrlLike: 'https://img.radioparadise.com/covers/l/',
                repromptsNothing: true, shouldEndSession: true,
            },
        ]);
    });

    describe('HelpIntent', () => {
        alexaTest.test([
            {
                request: alexaTest.getIntentRequest('AMAZON.HelpIntent'),
                says: 'You can say „Ask Paradise Playlist for current song“, or you can say „Exit“. What can I help you with?',
                reprompts: 'What can I help you with?',
                shouldEndSession: false,
            },
        ]);
    });

    describe('CancelIntent', () => {
        alexaTest.test([
            {
                request: alexaTest.getIntentRequest('AMAZON.CancelIntent'),
                says: 'Goodbye!',
                repromptsNothing: true, shouldEndSession: true,
            },
        ]);
    });

    describe('StopIntent', () => {
        alexaTest.test([
            {
                request: alexaTest.getIntentRequest('AMAZON.StopIntent'),
                says: 'Goodbye!',
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

    describe('ErrorHandler', () => {
        alexaTest.test([
            {
                request: alexaTest.getIntentRequest(''),
                says: "Sorry, I can't understand the command. Please say again?",
                reprompts: "Sorry, I can't understand the command. Please say again?",
                shouldEndSession: false,
            },
        ]);
    });
});
