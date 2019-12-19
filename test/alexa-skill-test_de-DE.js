'use strict';

// include the testing framework
const alexaTest = require('alexa-skill-test-framework');

// custom slot types
const LIST_OF_CHANNELS = 'LIST_OF_CHANNELS';

// initialize the testing framework
alexaTest.initialize(
    require('../src/index'),
    'amzn1.ask.skill.9a6c0ff8-b416-407c-be53-1c67a58fe526',
    'amzn1.ask.account.VOID');
alexaTest.setLocale('de-DE');

describe('Paradise Playlist Skill (de-DE)', () => {

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
                says: 'Du kannst sagen „Öffne Paradise Playlist“ und ich sage dir was gerade im Radio Paradise Main Mix läuft. Oder du fragst nach einem Sender, z.B. „Öffne Paradise Playlist für Rock Mix“.',
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
                saysLike: 'Im <lang xml:lang="en-US">RP Main Mix</lang> hörst du gerade ',
                hasCardTitle: 'RP Main Mix',
                hasCardTextLike: 'Du hörst gerade ',
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
                saysLike: 'Im <lang xml:lang="en-US">RP Main Mix</lang> hörst du gerade ',
                hasCardTitle: 'RP Main Mix',
                hasCardTextLike: 'Du hörst gerade ',
                hasSmallImageUrlLike: 'https://img.radioparadise.com/covers/s/',
                hasLargeImageUrlLike: 'https://img.radioparadise.com/covers/l/',
                repromptsNothing: true, shouldEndSession: true,
                hasAttributes: {
                    index: 0,
                    song: song => { return song && song[0] && song[0].title.length > 0 && song[0].channel.chan === '0'; },
                },
            },
            {
                request: alexaTest.addEntityResolutionToRequest(
                    alexaTest.getIntentRequest('RadioParadiseIntent', { channel: 'mellow mix' }),
                    'channel', LIST_OF_CHANNELS, 'Mellow', '1'),
                saysLike: 'Im <lang xml:lang="en-US">RP Mellow Mix</lang> hörst du gerade ',
                hasCardTitle: 'RP Mellow Mix',
                hasCardTextLike: 'Du hörst gerade ',
                hasSmallImageUrlLike: 'https://img.radioparadise.com/covers/s/',
                hasLargeImageUrlLike: 'https://img.radioparadise.com/covers/l/',
                repromptsNothing: true, shouldEndSession: true,
                hasAttributes: {
                    index: 0,
                    song: song => { return song && song[0] && song[0].title.length > 0 && song[0].channel.chan === '1'; },
                },
            },
            {
                request: alexaTest.addEntityResolutionToRequest(
                    alexaTest.getIntentRequest('RadioParadiseIntent', { channel: 'rock mix' }),
                    'channel', LIST_OF_CHANNELS, 'Rock', '2'),
                saysLike: 'Im <lang xml:lang="en-US">RP Rock Mix</lang> hörst du gerade ',
                hasCardTitle: 'RP Rock Mix',
                hasCardTextLike: 'Du hörst gerade ',
                hasSmallImageUrlLike: 'https://img.radioparadise.com/covers/s/',
                hasLargeImageUrlLike: 'https://img.radioparadise.com/covers/l/',
                repromptsNothing: true, shouldEndSession: true,
                hasAttributes: {
                    index: 0,
                    song: song => { return song && song[0] && song[0].title.length > 0 && song[0].channel.chan === '2'; },
                },
            },
            {
                request: alexaTest.addEntityResolutionNoMatchToRequest(
                    alexaTest.getIntentRequest('RadioParadiseIntent'),
                    'channel', LIST_OF_CHANNELS, 'hauptmix'),
                saysLike: 'Ich kenne diesen Kanal leider nicht.',
                repromptsNothing: true, shouldEndSession: true,
            },
        ]);
    });

    describe('PreviousIntent', () => {
        alexaTest.test([
            {
                request: alexaTest.getIntentRequest('AMAZON.PreviousIntent'),
                says: 'Davor hörtest du <lang xml:lang="en-US">Sunset Grill</lang> von <lang xml:lang="en-US">Don Henley</lang> aus dem Album <lang xml:lang="en-US">Building the Perfect Beast</lang> von 1984.',
                hasCardTitle: 'RP Main Mix',
                hasCardText: 'Davor hörtest du Sunset Grill von Don Henley aus dem Album Building the Perfect Beast von 1984. Die durchschnittliche Bewertung aller Radio Paradise-Hörer ist 6.14, die Länge beträgt 06:16.',
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
                            channel: {
                                title: 'RP Main Mix',
                            },
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
                says: 'Tut mir leid, aber das ist zu lange her.',
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
                says: 'Danach hörtest du <lang xml:lang="en-US">Sunset Grill</lang> von <lang xml:lang="en-US">Don Henley</lang> aus dem Album <lang xml:lang="en-US">Building the Perfect Beast</lang> von 1984.',
                hasCardTitle: 'RP Main Mix',
                hasCardText: 'Danach hörtest du Sunset Grill von Don Henley aus dem Album Building the Perfect Beast von 1984. Die durchschnittliche Bewertung aller Radio Paradise-Hörer ist 6.14, die Länge beträgt 06:16.',
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
                            channel: {
                                title: 'RP Main Mix',
                            },
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
                saysLike: 'Im <lang xml:lang="en-US">RP Main Mix</lang> hörst du gerade ',
                hasCardTitle: 'RP Main Mix',
                hasCardTextLike: 'Du hörst gerade ',
                hasSmallImageUrlLike: 'https://img.radioparadise.com/covers/s/',
                hasLargeImageUrlLike: 'https://img.radioparadise.com/covers/l/',
                repromptsNothing: true, shouldEndSession: true,
                withSessionAttributes: {
                    index: 0,
                    song: {
                        0: {
                            channel: {
                                chan: '0',
                            },
                        },
                    },
                },
                hasAttributes: {
                    index: 0,
                    song: song => { return song && song[0] && song[0].title.length > 0; },
                },
            },
        ]);
    });
});
