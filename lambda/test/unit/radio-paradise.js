import { expect } from 'chai';
import nock from 'nock';

import * as radioParadise from '../../radio-paradise.js';
import { nowPlaying } from '../fixtures/radio-paradise.js';
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
    });

    describe('live API', function () {
        this.timeout(20000);

        before(() => {
            nock.enableNetConnect(/api\.radioparadise\.com/);
        });

        after(() => {
            nock.disableNetConnect();
        });

        it('returns the Main Mix playlist', async () => {
            const result = await radioParadise.getNowPlaying(radioParadise.mix.main);

            expect(result.song).to.exist;
            expect(result.song[0].chan).to.equal(radioParadise.mix.main);
            expect(result.song[0].artist).to.be.a('string');
            expect(result.song[0].title).to.be.a('string');
        });
    });
});
