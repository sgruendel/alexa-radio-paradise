'use strict';

const expect = require('chai').expect;
const radioParadise = require('../src/radio-paradise');

function verifyResult(result, channel, mix) {
    expect(result.song, channel).to.exist;
    expect(parseInt(result.song[0].chan, 10), channel).to.equal(mix);
    expect(result.song[0].duration, 'duration').to.be.a('string');
    expect(result.song[0].artist, 'artist').to.be.a('string');
    expect(result.song[0].title, 'title').to.be.a('string');
    expect(result.song[0].album, 'album').to.be.a('string');
    expect(result.song[0].year, 'year').to.be.a('string');
    expect(result.song[0].rating, 'rating').to.be.a('string');
    expect(result.song[0].cover, 'cover').to.be.a('string');
}

describe('Radio Paradise helpers', () => {
    describe('#getNowPlaying()', () => {
        it('should give songs playing on Main Mix', async function() {
            const result = await radioParadise.getNowPlaying(radioParadise.mix.main);
            verifyResult(result, 'Main Mix', radioParadise.mix.main);
        });

        it('should give songs playing on Mellow Mix', async function() {
            const result = await radioParadise.getNowPlaying(radioParadise.mix.mellow);
            verifyResult(result, 'Mellow Mix', radioParadise.mix.mellow);
        });

        it('should give songs playing on Rock Mix', async function() {
            const result = await radioParadise.getNowPlaying(radioParadise.mix.rock);
            verifyResult(result, 'Rock Mix', radioParadise.mix.rock);
        });

        it('should give songs playing on Eclectic Mix', async function() {
            const result = await radioParadise.getNowPlaying(radioParadise.mix.eclectic);
            verifyResult(result, 'Eclectic Mix', radioParadise.mix.eclectic);
        });

        it('should find nothing for non-existing channel', async function() {
            const result = await radioParadise.getNowPlaying(4);
            expect(result.song).to.not.exist;
        });
    });
});
