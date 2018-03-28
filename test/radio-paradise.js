'use strict';

const expect = require('chai').expect;
const fs = require('fs');
const radioParadise = require('../src/radio-paradise');

describe('Radio Paradise helpers', function() {
    describe('#parsePlaylistBody()', function() {
        it('should parse Pink Floyd - The Dark Side Of The Moon (Immersion Box Set)', function() {
            const body = fs.readFileSync('test/Pink_Floyd-The_Dark_Side_Of_The_Moon.html');
            const entries = radioParadise.parsePlaylistBody(body);
            const tdsotm = entries[1];
            expect(tdsotm.artist).to.equal('Pink Floyd');
            expect(tdsotm.song).to.equal('Speak To Me -> ...In The Sky (live)');
            expect(tdsotm.cover).to.equal('http://www.radioparadise.com/graphics/covers/s/B004ZNARH4.jpg');
            expect(tdsotm.album).to.equal('The Dark Side Of The Moon (Immersion Box Set)');
            expect(tdsotm.year).to.equal('1974');
        });

        it("should parse Kan'Nal - Gypsy", function() {
            const body = fs.readFileSync('test/Kan_Nal_Gypsy.html');
            const entries = radioParadise.parsePlaylistBody(body);
            const gypsy = entries[1];
            expect(gypsy.artist).to.equal("Kan'Nal");
            expect(gypsy.song).to.equal('Gypsy');
            expect(gypsy.cover).to.equal('https://www.radioparadise.com/graphics/covers/s/B000AQKXRE.jpg');
            expect(gypsy.album).to.equal('Dreamwalker');
            expect(gypsy.year).to.equal('2005');
        });

        it('should parse Jeff Beck - The Pump', function() {
            const body = fs.readFileSync('test/amp.html');
            const entries = radioParadise.parsePlaylistBody(body);
            const pump = entries[0];
            expect(pump.artist).to.equal('Jeff Beck');
            expect(pump.song).to.equal('The Pump');
            expect(pump.cover).to.equal('https://www.radioparadise.com/graphics/covers/s/B0012GMXQK.jpg');
            expect(pump.album).to.equal('There & Back');
            expect(pump.year).to.equal('1980');
        });

        it('should parse Tom Petty & The Heartbreakers - American Girl', function() {
            const body = fs.readFileSync('test/amp.html');
            const entries = radioParadise.parsePlaylistBody(body);
            const pump = entries[1];
            expect(pump.artist).to.equal('Tom Petty & The Heartbreakers');
            expect(pump.song).to.equal('American Girl');
            expect(pump.cover).to.equal('https://www.radioparadise.com/graphics/covers/s/B000065AI3.jpg');
            expect(pump.album).to.equal('Tom Petty and the Heartbreakers');
            expect(pump.year).to.equal('1976');
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
