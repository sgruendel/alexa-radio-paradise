import { expect } from 'chai';

import { handler } from '../../index.js';
import { nowPlaying, song } from '../fixtures/radio-paradise.js';
import { intentRequest, launchRequest, resolvedSlot, sessionEndedRequest } from '../helpers/alexa.js';
import { mockNowPlaying } from '../helpers/radio-paradise.js';

function speech(responseEnvelope) {
    return responseEnvelope.response.outputSpeech.ssml;
}

const locales = [
    {
        locale: 'en-US',
        help: "You can say 'Open Paradise Playlist'",
        stop: 'See you soon!',
        error: "Sorry, I don't understand. Please say again?",
        current: "In The Main Mix, you're listening to",
        unknownChannel: "I'm sorry, but I don't know that channel.",
        previous: 'Previously, you were listening to',
        next: 'Next, you were listening to',
        endOfPlaylist: "I'm sorry, but that's too long ago.",
        unavailable: "Bill's not there right now.",
    },
    {
        locale: 'de-DE',
        help: 'Du kannst sagen „Öffne Paradise Playlist“',
        stop: 'bis dann',
        error: 'Entschuldigung, das verstehe ich nicht. Bitte wiederhole das?',
        current: 'Im <lang xml:lang="en-US">The Main Mix</lang> hörst du gerade',
        unknownChannel: 'Ich kenne diesen Kanal leider nicht.',
        previous: 'Davor hörtest du',
        next: 'Danach hörtest du',
        endOfPlaylist: 'Tut mir leid, aber das ist zu lange her.',
        unavailable: 'Bill ist gerade nicht da.',
    },
];

describe('Paradise Playlist skill workflow', () => {
    for (const expected of locales) {
        describe(expected.locale, () => {
            const options = { locale: expected.locale };

            it('handles a launch request', async () => {
                mockNowPlaying(0);

                const result = await handler(launchRequest(options), {});

                expect(speech(result)).to.contain(expected.current);
                expect(result.response.card).to.include({ type: 'Standard', title: 'The Main Mix' });
                expect(result.response.card.image.smallImageUrl).to.equal(
                    'https://img.radioparadise.com/covers/s/B000000Y6H.jpg',
                );
                expect(result.sessionAttributes.index).to.equal(0);
                expect(result.sessionAttributes.song[0].title).to.equal('Blue In Green');
            });

            for (const intent of ['AMAZON.CancelIntent', 'AMAZON.StopIntent']) {
                it(`handles ${intent}`, async () => {
                    const result = await handler(intentRequest(intent, {}, options), {});

                    expect(speech(result)).to.contain(expected.stop);
                    expect(result.response).to.not.have.property('reprompt');
                    expect(result.response.shouldEndSession).to.equal(true);
                });
            }

            it('handles the help intent', async () => {
                const result = await handler(intentRequest('AMAZON.HelpIntent', {}, options), {});

                expect(speech(result)).to.contain(expected.help);
                expect(result.response).to.not.have.property('reprompt');
            });

            it('uses the error handler for unsupported intents', async () => {
                const result = await handler(intentRequest('UnsupportedIntent', {}, options), {});

                expect(speech(result)).to.contain(expected.error);
                expect(result.response.reprompt.outputSpeech.ssml).to.contain(expected.error);
                expect(result.response.shouldEndSession).to.equal(false);
            });

            it('reports an unknown channel', async () => {
                const channel = resolvedSlot('channel', 'unknown', [], 'ER_SUCCESS_NO_MATCH');

                const result = await handler(intentRequest('RadioParadiseIntent', { channel }, options), {});

                expect(speech(result)).to.contain(expected.unknownChannel);
            });

            it('returns the previous playlist item', async () => {
                const sessionAttributes = { index: 0, song: nowPlaying(0).song };

                const result = await handler(
                    intentRequest('AMAZON.PreviousIntent', {}, { ...options, sessionNew: false, sessionAttributes }),
                    {},
                );

                expect(speech(result)).to.contain(expected.previous);
                expect(speech(result)).to.contain('Sunset Grill');
                expect(result.response.card.title).to.equal('The Main Mix');
                expect(result.sessionAttributes.index).to.equal(1);
            });

            it('reports the end of the stored playlist', async () => {
                const sessionAttributes = { index: 0, song: { 0: song(0) } };

                const result = await handler(
                    intentRequest('AMAZON.PreviousIntent', {}, { ...options, sessionNew: false, sessionAttributes }),
                    {},
                );

                expect(speech(result)).to.contain(expected.endOfPlaylist);
                expect(result.sessionAttributes.index).to.equal(0);
            });

            it('returns the next stored playlist item', async () => {
                const playlist = nowPlaying(0).song;
                playlist[2] = song(0, { artist: 'Tori Amos', title: 'Silent All These Years' });
                const sessionAttributes = { index: 2, song: playlist };

                const result = await handler(
                    intentRequest('AMAZON.NextIntent', {}, { ...options, sessionNew: false, sessionAttributes }),
                    {},
                );

                expect(speech(result)).to.contain(expected.next);
                expect(speech(result)).to.contain('Sunset Grill');
                expect(result.sessionAttributes.index).to.equal(1);
            });

            it('returns a friendly message when Radio Paradise is unavailable', async () => {
                mockNowPlaying(0, 503, { message: 'Radio Paradise unavailable' });

                const result = await handler(launchRequest(options), {});

                expect(speech(result)).to.contain(expected.unavailable);
            });
        });
    }

    it('handles a session-ended request', async () => {
        const result = await handler(sessionEndedRequest(), {});

        expect(result.response).to.not.have.property('outputSpeech');
        expect(result.response).to.not.have.property('reprompt');
        expect(result.response.shouldEndSession).to.equal(true);
    });

    for (const [channel, name, title] of [
        [0, 'Main', 'The Main Mix'],
        [1, 'Mellow', 'Mellow Mix'],
        [2, 'Rock', 'RockIt!'],
        [3, 'Global', 'The Globe'],
        [5, 'Beyond', 'Beyond...'],
        [42, 'Serenity', 'Serenity'],
        [945, 'KFAT', 'KFAT'],
    ]) {
        it(`uses the resolved ${name} channel`, async () => {
            mockNowPlaying(channel);
            const channelSlot = resolvedSlot('channel', name, [{ name, id: String(channel) }]);

            const result = await handler(intentRequest('RadioParadiseIntent', { channel: channelSlot }), {});

            expect(result.response.card.title).to.equal(title);
            expect(result.sessionAttributes.song[0].channel.chan).to.equal(String(channel));
        });
    }

    it('refreshes the playlist when next is requested at the current item', async () => {
        mockNowPlaying(2);
        const sessionAttributes = { index: 0, song: { 0: song(2) } };

        const result = await handler(
            intentRequest('AMAZON.NextIntent', {}, { sessionNew: false, sessionAttributes }),
            {},
        );

        expect(result.response.card.title).to.equal('RockIt!');
        expect(result.sessionAttributes.index).to.equal(0);
        expect(result.sessionAttributes.song[0].channel.chan).to.equal('2');
    });
});
