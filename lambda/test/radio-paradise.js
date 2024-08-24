import { expect } from 'chai';

import * as radioParadise from '../radio-paradise.js';

function verifyResult(result, channel, mix) {
    expect(result.song, channel).to.exist;
    expect(result.song[0].chan, 'chan').to.equal(mix);
    expect(result.song[0].duration, 'duration').to.be.a('string');
    expect(result.song[0].artist, 'artist').to.be.a('string');
    expect(result.song[0].title, 'title').to.be.a('string');
    expect(result.song[0].album, 'album').to.be.a('string');
    expect(result.song[0].year, 'year').to.be.a('string');
    expect(result.song[0].listener_rating, 'listener_rating').to.be.a('number');
    expect(result.song[0].cover, 'cover').to.be.a('string');
    expect(result.song[0].channel.title, 'channel.title').to.equal(channel);
}

describe('Radio Paradise helpers', () => {
    describe('#getNowPlaying()', () => {
        it('should give songs playing on Main Mix', async () => {
            const result = await radioParadise.getNowPlaying(radioParadise.mix.main);
            verifyResult(result, 'The Main Mix', radioParadise.mix.main);
        });

        it('should give songs playing on Mellow Mix', async () => {
            const result = await radioParadise.getNowPlaying(radioParadise.mix.mellow);
            verifyResult(result, 'The Mellow Mix', radioParadise.mix.mellow);
        });

        it('should give songs playing on Rock Mix', async () => {
            const result = await radioParadise.getNowPlaying(radioParadise.mix.rock);
            verifyResult(result, 'RP Rock Mix', radioParadise.mix.rock);
        });

        it('should give songs playing on Global Mix', async () => {
            const result = await radioParadise.getNowPlaying(radioParadise.mix.global);
            verifyResult(result, 'RP Global Mix', radioParadise.mix.global);
        });

        it('should find nothing for non-existing channel', async () => {
            const result = await radioParadise.getNowPlaying(99);
            expect(result.song).to.be.empty;
        });
    });
});
