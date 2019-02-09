'use strict';

// include the testing framework
const alexaTest = require('alexa-skill-test-framework');

// initialize the testing framework
alexaTest.initialize(
    require('../src/index'),
    'amzn1.ask.skill.9a6c0ff8-b416-407c-be53-1c67a58fe526',
    'amzn1.ask.account.VOID');
alexaTest.setLocale('en-US');

describe('Paradise Playlist Skill', () => {

    describe('ErrorHandler', () => {
        alexaTest.test([
            {
                request: alexaTest.getIntentRequest(''),
                says: "Sorry, I don't understand. Please say again?",
                reprompts: "Sorry, I don't understand. Please say again?",
                shouldEndSession: false,
            },
        ]);
    });

    describe('HelpIntent', () => {
        alexaTest.test([
            {
                request: alexaTest.getIntentRequest('AMAZON.HelpIntent'),
                says: "You can say 'Open Paradise Playlist' and I will tell you what's playing now on Radio Paradise.",
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
                says: 'See you soon!',
                repromptsNothing: true, shouldEndSession: true,
            },
        ]);
    });

    describe('StopIntent', () => {
        alexaTest.test([
            {
                request: alexaTest.getIntentRequest('AMAZON.StopIntent'),
                says: 'See you soon!',
                repromptsNothing: true, shouldEndSession: true,
            },
        ]);
    });

    describe('LaunchRequest', () => {
        alexaTest.test([
            {
                request: alexaTest.getLaunchRequest(),
                saysLike: "You're listening to ",
                hasCardTitle: 'Radio Paradise Playlist',
                hasCardTextLike: "You're listening to ",
                hasSmallImageUrlLike: 'https://img.radioparadise.com/covers/s/',
                hasLargeImageUrlLike: 'https://img.radioparadise.com/covers/l/',
                repromptsNothing: true, shouldEndSession: true,
                hasAttributes: {
                    index: 0,
                    song: song => { return song && song[0] && song[0].title.length > 0; },
                },
            },
        ]);
    });

    describe('RadioParadiseIntent', () => {
        alexaTest.test([
            {
                request: alexaTest.getIntentRequest('RadioParadiseIntent'),
                saysLike: "You're listening to ",
                hasCardTitle: 'Radio Paradise Playlist',
                hasCardTextLike: "You're listening to ",
                hasSmallImageUrlLike: 'https://img.radioparadise.com/covers/s/',
                hasLargeImageUrlLike: 'https://img.radioparadise.com/covers/l/',
                repromptsNothing: true, shouldEndSession: true,
                hasAttributes: {
                    index: 0,
                    song: song => { return song && song[0] && song[0].title.length > 0; },
                },
            },
        ]);
    });

    describe('PreviousIntent', () => {
        alexaTest.test([
            {
                request: alexaTest.getIntentRequest('AMAZON.PreviousIntent'),
                says: 'Previously, you were listening to Sunset Grill by Don Henley from the 1984 album Building the Perfect Beast.',
                hasCardTitle: 'Radio Paradise Playlist',
                hasCardText: 'Previously, you were listening to Sunset Grill by Don Henley from the 1984 album Building the Perfect Beast. Average rating by your fellow Radio Paradise listeners is 6.14, the length is 06:16.',
                hasSmallImageUrlLike: 'https://img.radioparadise.com/covers/s/B000000OPC.jpg',
                hasLargeImageUrlLike: 'https://img.radioparadise.com/covers/l/B000000OPC.jpg',
                repromptsNothing: true, shouldEndSession: true,
                withSessionAttributes: {
                    index: 0,
                    song: {
                        1: {
                            duration: 376000,
                            artist: 'Don Henley',
                            title: 'Sunset Grill',
                            album: 'Building the Perfect Beast',
                            year: 1984,
                            rating: 6.14,
                            cover: 'covers/l/B000000OPC.jpg',
                        },
                    },
                },
                hasAttributes: {
                    index: 1,
                    song: song => { return song && song[1] && song[1].year === 1984; },
                },
            },
        ]);
    });

    describe('PreviousIntent, last item', () => {
        alexaTest.test([
            {
                request: alexaTest.getIntentRequest('AMAZON.PreviousIntent'),
                says: "I'm sorry, but that's too long ago.",
                repromptsNothing: true, shouldEndSession: true,
                withSessionAttributes: {
                    index: 0,
                    song: {
                        0: {
                            artist: 'Don Henley',
                        },
                    },
                },
                hasAttributes: {
                    index: 0,
                },
            },
        ]);
    });

    describe('NextIntent', () => {
        alexaTest.test([
            {
                request: alexaTest.getIntentRequest('AMAZON.NextIntent'),
                says: 'Next, you were listening to Sunset Grill by Don Henley from the 1984 album Building the Perfect Beast.',
                hasCardTitle: 'Radio Paradise Playlist',
                hasCardText: 'Next, you were listening to Sunset Grill by Don Henley from the 1984 album Building the Perfect Beast. Average rating by your fellow Radio Paradise listeners is 6.14, the length is 06:16.',
                hasSmallImageUrlLike: 'https://img.radioparadise.com/covers/s/B000000OPC.jpg',
                hasLargeImageUrlLike: 'https://img.radioparadise.com/covers/l/B000000OPC.jpg',
                repromptsNothing: true, shouldEndSession: true,
                withSessionAttributes: {
                    index: 2,
                    song: {
                        1: {
                            duration: 376000,
                            artist: 'Don Henley',
                            title: 'Sunset Grill',
                            album: 'Building the Perfect Beast',
                            year: 1984,
                            rating: 6.14,
                            cover: 'covers/l/B000000OPC.jpg',
                        },
                    },
                },
                hasAttributes: {
                    index: 1,
                    song: song => { return song && song[1] && song[1].year === 1984; },
                },
            },
        ]);
    });

    describe('NextIntent, first item', () => {
        alexaTest.test([
            {
                request: alexaTest.getIntentRequest('AMAZON.NextIntent'),
                saysLike: "You're listening to ",
                hasCardTitle: 'Radio Paradise Playlist',
                hasCardTextLike: "You're listening to ",
                hasSmallImageUrlLike: 'https://img.radioparadise.com/covers/s/',
                hasLargeImageUrlLike: 'https://img.radioparadise.com/covers/l/',
                repromptsNothing: true, shouldEndSession: true,
                withSessionAttributes: {
                    index: 0,
                },
                hasAttributes: {
                    index: 0,
                    song: song => { return song && song[0] && song[0].title.length > 0; },
                },
            },
        ]);
    });
});
