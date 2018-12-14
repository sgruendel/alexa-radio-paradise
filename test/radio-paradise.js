'use strict';

const expect = require('chai').expect;
const radioParadise = require('../src/radio-paradise');

describe('Radio Paradise helpers', () => {
    describe('#getNowPlaying()', () => {
        it('should give songs playing', async function() {
            const result = await radioParadise.getNowPlaying();
            expect(result.song).to.exist;
            expect(result.song[0].duration).to.be.a('string');
            expect(result.song[0].artist).to.be.a('string');
            expect(result.song[0].title).to.be.a('string');
            expect(result.song[0].album).to.be.a('string');
            expect(result.song[0].year).to.be.a('string');
            expect(result.song[0].rating).to.be.a('string');
            expect(result.song[0].cover).to.be.a('string');
        });
    });
});
