import { expect } from 'chai';

import * as radioParadise from '../../radio-paradise.js';

describe('Radio Paradise API contract', () => {
    it('returns the Main Mix playlist', async () => {
        const result = await radioParadise.getNowPlaying(radioParadise.mix.main);

        expect(result.song).to.exist;
        expect(result.song[0].chan).to.equal(radioParadise.mix.main);
        expect(result.song[0].artist).to.be.a('string');
        expect(result.song[0].title).to.be.a('string');
    });
});
