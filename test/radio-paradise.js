'use strict';

const expect = require('chai').expect;
const fs = require('fs');
const radioParadise = require('../src/radio-paradise');

describe('Radio Paradise helpers', function() {
    describe('#parsePlaylistBody()', function() {
        it('should parse Pink Floyd - The Dark Side Of The Moon (Immersion Box Set)', function() {
            const body = fs.readFileSync('test/Pink_Floyd-The_Dark_Side_Of_The_Moon.html');
            const entries = radioParadise.parsePlaylistBody(body);
            const pinkFloydTDSOTM = entries[1];
            expect(pinkFloydTDSOTM.artist).to.equal('Pink Floyd');
            expect(pinkFloydTDSOTM.song).to.equal('Speak To Me -&gt; ...In The Sky (live)');
            expect(pinkFloydTDSOTM.album).to.equal('The Dark Side Of The Moon (Immersion Box Set)');
            expect(pinkFloydTDSOTM.year).to.equal('1974');
        });
    });

    describe('#getPlaylist()', function() {
        it('should give songs playing', function(done) {
            radioParadise.getPlaylist(function(err, result) {
                expect(err).to.be.null;
                expect(result).to.have.length.above(3);
                expect(result[0].artist).to.be.a('string');
                done();
            });
        });
    });
});
