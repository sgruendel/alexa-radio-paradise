'use strict';

const expect = require('chai').expect;
const fs = require('fs');
const radioParadise = require('../src/radio-paradise');

describe('Radio Paradise helpers', () => {
    describe('#parseSongInfoBody()', () => {
        it('should parse Pink Floyd - The Dark Side Of The Moon (Immersion Box Set)', () => {
            const body = fs.readFileSync('test/Pink_Floyd-The_Dark_Side_Of_The_Moon.html');
            const tdsotm = radioParadise.parseSongInfoBody(body);
            expect(tdsotm.artist).to.equal('Pink Floyd');
            expect(tdsotm.song).to.equal('Speak To Me -> ...In The Sky (live)');
            expect(tdsotm.cover).to.equal('https://img.radioparadise.com/covers/m/B004ZNARH4.jpg');
            expect(tdsotm.album).to.equal('The Dark Side Of The Moon (Immersion Box Set)');
            expect(tdsotm.avgRating).to.equal('8.7');
            expect(tdsotm.released).to.equal('1974');
            expect(tdsotm.length).to.equal('24:05');
            expect(tdsotm.plays).to.equal('0');
            expect(tdsotm.lyrics).to.include('No one told you when to run, you missed the starting gun');
        });

        it("should parse Kan'Nal - Gypsy", () => {
            const body = fs.readFileSync('test/Kan_Nal-Gypsy.html');
            const gypsy = radioParadise.parseSongInfoBody(body);
            expect(gypsy.artist).to.equal("Kan'Nal");
            expect(gypsy.song).to.equal('Gypsy');
            expect(gypsy.cover).to.equal('https://img.radioparadise.com/covers/m/B000AQKXRE.jpg');
            expect(gypsy.album).to.equal('Dreamwalker');
            expect(gypsy.avgRating).to.equal('6.4');
            expect(gypsy.released).to.equal('2005');
            expect(gypsy.length).to.equal('5:58');
            expect(gypsy.plays).to.equal('1');
            expect(gypsy.lyrics).to.include('(no lyrics available)');
        });

        it('should parse Jeff Beck - The Pump', () => {
            const body = fs.readFileSync('test/Jeff_Beck-The_Pump.html');
            const pump = radioParadise.parseSongInfoBody(body);
            expect(pump.artist).to.equal('Jeff Beck');
            expect(pump.song).to.equal('The Pump');
            expect(pump.cover).to.equal('https://img.radioparadise.com/covers/m/B0012GMXQK.jpg');
            expect(pump.album).to.equal('There & Back');
            expect(pump.avgRating).to.equal('6.9');
            expect(pump.released).to.equal('1980');
            expect(pump.length).to.equal('5:20');
            expect(pump.plays).to.equal('1');
            expect(pump.lyrics).to.equal('(instrumental)');
        });

        it('should parse Tom Petty & The Heartbreakers - American Girl', () => {
            const body = fs.readFileSync('test/Tom_Petty_The_Heartbreakers-American_Girl.html');
            const ag = radioParadise.parseSongInfoBody(body);
            expect(ag.artist).to.equal('Tom Petty & The Heartbreakers');
            expect(ag.song).to.equal('American Girl');
            expect(ag.cover).to.equal('https://img.radioparadise.com/covers/m/B000065AI3.jpg');
            expect(ag.album).to.equal('Tom Petty and the Heartbreakers');
            expect(ag.avgRating).to.equal('7.7');
            expect(ag.released).to.equal('1976');
            expect(ag.length).to.equal('3:22');
            expect(ag.plays).to.equal('2');
            expect(ag.lyrics).to.include('She was an American girl');
        });
    });

    describe('#getNowPlaying()', () => {
        it('should give songs playing', async function() {
            const result = await radioParadise.getNowPlaying();
            expect(result.artist).to.be.a('string');
            expect(result.song).to.be.a('string');
            expect(result.cover).to.be.a('string');
            expect(result.album).to.be.a('string');
            expect(result.avgRating).to.be.a('string');
            expect(result.released).to.be.a('string');
            expect(result.length).to.be.a('string');
            expect(result.plays).to.be.a('string');
            expect(result.lyrics).to.be.a('string');
        });
    });
});
