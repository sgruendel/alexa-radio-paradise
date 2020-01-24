'use strict';

const expect = require('chai').expect;
const utils = require('../src/utils');

const locales = [ 'de-DE', 'en-AU', 'en-CA', 'en-GB', 'en-IN', 'en-US', 'es-ES', 'es-MX', 'fr-CA', 'fr-FR', 'it-IT' ];

describe('utils', () => {
    describe('#speakArtist()', () => {
        it('should work for Miles Davis', () => {
            locales.forEach(locale => {
                const artist = utils.speakArtist('Miles Davis', locale);
                const expected = locale.startsWith('en') ? 'Miles Davis' : '<lang xml:lang="en-US">Miles Davis</lang>';
                expect(artist, locale).to.equal(expected);
            });
        });

        it('should work for 2raumwohnung', () => {
            locales.forEach(locale => {
                const artist = utils.speakArtist('2raumwohnung', locale);
                const expected = locale.startsWith('de') ? '2raumwohnung' : '<lang xml:lang="de-DE">2raumwohnung</lang>';
                expect(artist, locale).to.equal(expected);
            });
        });

        it('should work for Kruder & Dorfmeister', () => {
            locales.forEach(locale => {
                const artist = utils.speakArtist('Kruder & Dorfmeister', locale);
                const expected = locale.startsWith('de') ? 'Kruder &amp; Dorfmeister' : '<lang xml:lang="de-DE">Kruder &amp; Dorfmeister</lang>';
                expect(artist, locale).to.equal(expected);
            });
        });

        it('should work for Nena', () => {
            locales.forEach(locale => {
                const artist = utils.speakArtist('Nena', locale);
                const expected = locale.startsWith('de') ? 'Nena' : '<lang xml:lang="de-DE">Nena</lang>';
                expect(artist, locale).to.equal(expected);
            });
        });

        it('should work for Sophie Hunger', () => {
            locales.forEach(locale => {
                const artist = utils.speakArtist('Sophie Hunger', locale);
                const expected = locale.startsWith('de') ? 'Sophie Hunger' : '<lang xml:lang="de-DE">Sophie Hunger</lang>';
                expect(artist, locale).to.equal(expected);
            });
        });

        it('should work for Tom Schilling', () => {
            locales.forEach(locale => {
                const artist = utils.speakArtist('Tom Schilling', locale);
                const expected = locale.startsWith('de') ? 'Tom Schilling' : '<lang xml:lang="de-DE">Tom Schilling</lang>';
                expect(artist, locale).to.equal(expected);
            });
        });

        it('should escape Simon & Garfunkel', () => {
            const artist = utils.speakArtist('Simon & Garfunkel', 'en-US');
            expect(artist).to.equal('Simon &amp; Garfunkel');
        });
    });

    describe('#speakSong()', () => {
        it('should work for Blue In Green', () => {
            locales.forEach(locale => {
                const artist = utils.speakSong('Blue In Green', locale);
                const expected = locale.startsWith('en') ? 'Blue In Green' : '<lang xml:lang="en-US">Blue In Green</lang>';
                expect(artist, locale).to.equal(expected);
            });
        });

        it('should work for 2 von Millionen von Sternen', () => {
            locales.forEach(locale => {
                const artist = utils.speakSong('2 von Millionen von Sternen', locale);
                const expected = locale.startsWith('de') ? '2 von Millionen von Sternen' : '<lang xml:lang="de-DE">2 von Millionen von Sternen</lang>';
                expect(artist, locale).to.equal(expected);
            });
        });

        it('should work for Da Sind Wir', () => {
            locales.forEach(locale => {
                const artist = utils.speakSong('Da Sind Wir', locale);
                const expected = locale.startsWith('de') ? 'Da Sind Wir' : '<lang xml:lang="de-DE">Da Sind Wir</lang>';
                expect(artist, locale).to.equal(expected);
            });
        });

        it('should work for Ich Weiß Warum', () => {
            locales.forEach(locale => {
                const artist = utils.speakSong('Ich Weiß Warum', locale);
                const expected = locale.startsWith('de') ? 'Ich Weiß Warum' : '<lang xml:lang="de-DE">Ich Weiß Warum</lang>';
                expect(artist, locale).to.equal(expected);
            });
        });
    });

    describe('#speakAlbum()', () => {
        it('should work for Kind Of Blue', () => {
            locales.forEach(locale => {
                const artist = utils.speakAlbum('Kind Of Blue', locale);
                const expected = locale.startsWith('en') ? 'Kind Of Blue' : '<lang xml:lang="en-US">Kind Of Blue</lang>';
                expect(artist, locale).to.equal(expected);
            });
        });

        it('should work for 20 Jahre: Nena Ft Nena', () => {
            locales.forEach(locale => {
                const artist = utils.speakAlbum('20 Jahre: Nena Ft Nena', locale);
                const expected = locale.startsWith('de') ? '20 Jahre: Nena Ft Nena' : '<lang xml:lang="de-DE">20 Jahre: Nena Ft Nena</lang>';
                expect(artist, locale).to.equal(expected);
            });
        });

        it('should work for 99 Luftballons', () => {
            locales.forEach(locale => {
                const artist = utils.speakAlbum('99 Luftballons', locale);
                const expected = locale.startsWith('de') ? '99 Luftballons' : '<lang xml:lang="de-DE">99 Luftballons</lang>';
                expect(artist, locale).to.equal(expected);
            });
        });

        it('should work for Alles Prima Und Viele Andere Hits', () => {
            locales.forEach(locale => {
                const artist = utils.speakAlbum('Alles Prima Und Viele Andere Hits', locale);
                const expected = locale.startsWith('de') ? 'Alles Prima Und Viele Andere Hits' : '<lang xml:lang="de-DE">Alles Prima Und Viele Andere Hits</lang>';
                expect(artist, locale).to.equal(expected);
            });
        });

        it('should work for In Wirklich', () => {
            locales.forEach(locale => {
                const artist = utils.speakAlbum('In Wirklich', locale);
                const expected = locale.startsWith('de') ? 'In Wirklich' : '<lang xml:lang="de-DE">In Wirklich</lang>';
                expect(artist, locale).to.equal(expected);
            });
        });

        it('should work for Kommt zusammen', () => {
            locales.forEach(locale => {
                const artist = utils.speakAlbum('Kommt zusammen', locale);
                const expected = locale.startsWith('de') ? 'Kommt zusammen' : '<lang xml:lang="de-DE">Kommt zusammen</lang>';
                expect(artist, locale).to.equal(expected);
            });
        });
    });
});
