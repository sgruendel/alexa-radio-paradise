import { expect } from 'chai';
import nock from 'nock';

import * as radioParadise from '../../radio-paradise.js';
import { BASE_URL, nowPlaying } from '../fixtures/radio-paradise.js';
import { mockNowPlaying } from '../helpers/radio-paradise.js';

describe('Radio Paradise helpers', () => {
    describe('#getNowPlaying()', () => {
        for (const channel of Object.values(radioParadise.mix)) {
            it(`returns the playlist for channel ${channel}`, async () => {
                const expected = nowPlaying(channel);
                mockNowPlaying(channel, 200, expected);

                const result = await radioParadise.getNowPlaying(channel);

                expect(result).to.deep.equal(expected);
            });
        }

        it('exposes HTTP status errors', async () => {
            mockNowPlaying(radioParadise.mix.main, 503, { message: 'Radio Paradise unavailable' });

            let error;
            try {
                await radioParadise.getNowPlaying(radioParadise.mix.main);
            } catch (caught) {
                error = caught;
            }

            expect(error).to.be.instanceOf(radioParadise.HttpError);
            expect(error.name).to.equal('HttpError');
            expect(error.statusCode).to.equal(503);
        });

        it('aborts while waiting for a response body', async () => {
            nock(BASE_URL)
                .get('/api/nowplaying_list_v2022')
                .query({ chan: String(radioParadise.mix.main) })
                .delayBody(200)
                .reply(200, nowPlaying(radioParadise.mix.main));

            let error;
            try {
                await radioParadise.getNowPlaying(radioParadise.mix.main, { signal: AbortSignal.timeout(30) });
            } catch (caught) {
                error = caught;
            }

            expect(error.name).to.equal('AbortError');
        });

        it('rejects malformed JSON', async () => {
            mockNowPlaying(radioParadise.mix.main, 200, '{');

            let error;
            try {
                await radioParadise.getNowPlaying(radioParadise.mix.main);
            } catch (caught) {
                error = caught;
            }

            expect(error).to.be.instanceOf(SyntaxError);
        });
    });
});
