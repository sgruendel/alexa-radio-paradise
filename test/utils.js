'use strict';

const expect = require('chai').expect;
const utils = require('../src/utils');

const locales = [ 'de-DE', 'en-AU', 'en-CA', 'en-GB', 'en-IN', 'en-US', 'es-ES', 'es-MX', 'fr-CA', 'fr-FR', 'it-IT' ];

describe('utils', () => {
    describe('#fixSong()', () => {
        it('should work for Miles Davis', () => {
            locales.forEach(locale => {
                const song = { artist: 'Miles Davis', title: 'Blue In Green', album: 'Kind Of Blue' };
                const fixedSong = utils.fixSong(song);
                expect(fixedSong.artist, 'artist').to.equal(song.artist);
                expect(fixedSong.title, 'title').to.equal(song.title);
                expect(fixedSong.album, 'album').to.equal(song.album);
            });
        });

        it('should work for Gnossienne No1', () => {
            locales.forEach(locale => {
                const song = { artist: 'Erik Satie', title: 'Gnossienne No1', album: '' };
                const fixedSong = utils.fixSong(song);
                expect(fixedSong.title).to.equal('Gnossienne No. 1');
            });
        });

        it('should work for Shock den Affen', () => {
            locales.forEach(locale => {
                const song = { artist: 'Peter Gabriel', title: 'Shock den Affen', album: '' };
                const fixedSong = utils.fixSong(song);
                expect(fixedSong.title).to.equal('Schock den Affen');
            });
        });

        it('should work for 20 Jahre: Nena Ft Nena', () => {
            locales.forEach(locale => {
                const song = { artist: 'Nena', title: 'Anyplace, Anywhere, Anytime (w/ Kim Wilde)', album: '20 Jahre: Nena Ft Nena' };
                const fixedSong = utils.fixSong(song);
                expect(fixedSong.album).to.equal('20 Jahre: Nena feat. Nena');
            });
        });
    });

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

        it('should work for Alexandra Stréliski', () => {
            locales.forEach(locale => {
                const artist = utils.speakArtist('Alexandra Stréliski', locale);
                const expected = locale.startsWith('fr') ? 'Alexandra Stréliski' : '<lang xml:lang="fr-CA">Alexandra Stréliski</lang>';
                expect(artist, locale).to.equal(expected);
            });
        });

        it('should work for Beethoven', () => {
            locales.forEach(locale => {
                const artist = utils.speakArtist('Beethoven', locale);
                const expected = locale.startsWith('de') ? 'Beethoven' : '<lang xml:lang="de-DE">Beethoven</lang>';
                expect(artist, locale).to.equal(expected);
            });
        });

        it('should work for Claude Debussy', () => {
            locales.forEach(locale => {
                const artist = utils.speakArtist('Claude Debussy', locale);
                const expected = locale.startsWith('fr') ? 'Claude Debussy' : '<lang xml:lang="fr-FR">Claude Debussy</lang>';
                expect(artist, locale).to.equal(expected);
            });
        });

        it('should work for Erik Satie', () => {
            locales.forEach(locale => {
                const artist = utils.speakArtist('Erik Satie', locale);
                const expected = locale.startsWith('fr') ? 'Erik Satie' : '<lang xml:lang="fr-FR">Erik Satie</lang>';
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

        it('should work for Maurice Ravel', () => {
            locales.forEach(locale => {
                const artist = utils.speakArtist('Maurice Ravel', locale);
                const expected = locale.startsWith('fr') ? 'Maurice Ravel' : '<lang xml:lang="fr-FR">Maurice Ravel</lang>';
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

    describe('#speakTitle()', () => {
        it('should work for Blue In Green', () => {
            locales.forEach(locale => {
                const title = utils.speakTitle('Blue In Green', locale);
                const expected = locale.startsWith('en') ? 'Blue In Green' : '<lang xml:lang="en-US">Blue In Green</lang>';
                expect(title, locale).to.equal(expected);
            });
        });

        it('should work for 2 von Millionen von Sternen', () => {
            locales.forEach(locale => {
                const title = utils.speakTitle('2 von Millionen von Sternen', locale);
                const expected = locale.startsWith('de') ? '2 von Millionen von Sternen' : '<lang xml:lang="de-DE">2 von Millionen von Sternen</lang>';
                expect(title, locale).to.equal(expected);
            });
        });

        it('should work for Busenfreund', () => {
            locales.forEach(locale => {
                const title = utils.speakTitle('Busenfreund', locale);
                const expected = locale.startsWith('de') ? 'Busenfreund' : '<lang xml:lang="de-DE">Busenfreund</lang>';
                expect(title, locale).to.equal(expected);
            });
        });

        it('should work for Da Sind Wir', () => {
            locales.forEach(locale => {
                const title = utils.speakTitle('Da Sind Wir', locale);
                const expected = locale.startsWith('de') ? 'Da Sind Wir' : '<lang xml:lang="de-DE">Da Sind Wir</lang>';
                expect(title, locale).to.equal(expected);
            });
        });

        it('should work for Eine Kleine Nachtmusik - Allegro', () => {
            locales.forEach(locale => {
                const title = utils.speakTitle('Eine Kleine Nachtmusik - Allegro', locale);
                const expected = locale.startsWith('de') ? 'Eine Kleine Nachtmusik - Allegro' : '<lang xml:lang="de-DE">Eine Kleine Nachtmusik - Allegro</lang>';
                expect(title, locale).to.equal(expected);
            });
        });

        it('should work for Für Elise', () => {
            locales.forEach(locale => {
                const title = utils.speakTitle('Für Elise', locale);
                const expected = locale.startsWith('de') ? 'Für Elise' : '<lang xml:lang="de-DE">Für Elise</lang>';
                expect(title, locale).to.equal(expected);
            });
        });

        it('should work for Gnossienne No. 1', () => {
            locales.forEach(locale => {
                const title = utils.speakTitle('Gnossienne No. 1', locale);
                const expected = locale.startsWith('fr') ? 'Gnossienne No. 1' : '<lang xml:lang="fr-FR">Gnossienne No. 1</lang>';
                expect(title, locale).to.equal(expected);
            });
        });

        it('should work for Gymnopedie No. 1', () => {
            locales.forEach(locale => {
                const title = utils.speakTitle('Gymnopedie No. 1', locale);
                const expected = locale.startsWith('fr') ? 'Gymnopedie No. 1' : '<lang xml:lang="fr-FR">Gymnopedie No. 1</lang>';
                expect(title, locale).to.equal(expected);
            });
        });

        it('should work for Ich Weiß Warum', () => {
            locales.forEach(locale => {
                const title = utils.speakTitle('Ich Weiß Warum', locale);
                const expected = locale.startsWith('de') ? 'Ich Weiß Warum' : '<lang xml:lang="de-DE">Ich Weiß Warum</lang>';
                expect(title, locale).to.equal(expected);
            });
        });

        it('should work for Jardins sous la pluie', () => {
            locales.forEach(locale => {
                const title = utils.speakTitle('Jardins sous la pluie', locale);
                const expected = locale.startsWith('fr') ? 'Jardins sous la pluie' : '<lang xml:lang="fr-FR">Jardins sous la pluie</lang>';
                expect(title, locale).to.equal(expected);
            });
        });

        it('should work for Plus tôt', () => {
            locales.forEach(locale => {
                const title = utils.speakTitle('Plus tôt', locale);
                const expected = locale.startsWith('fr') ? 'Plus tôt' : '<lang xml:lang="fr-FR">Plus tôt</lang>';
                expect(title, locale).to.equal(expected);
            });
        });

        it('should work for Prelude', () => {
            locales.forEach(locale => {
                const title = utils.speakTitle('Prelude', locale);
                const expected = locale.startsWith('fr') ? 'Prelude' : '<lang xml:lang="fr-FR">Prelude</lang>';
                expect(title, locale).to.equal(expected);
            });
        });
    });

    describe('#speakAlbum()', () => {
        it('should work for Kind Of Blue', () => {
            locales.forEach(locale => {
                const album = utils.speakAlbum('Kind Of Blue', locale);
                const expected = locale.startsWith('en') ? 'Kind Of Blue' : '<lang xml:lang="en-US">Kind Of Blue</lang>';
                expect(album, locale).to.equal(expected);
            });
        });

        it('should work for 20 Jahre: Nena feat. Nena', () => {
            locales.forEach(locale => {
                const album = utils.speakAlbum('20 Jahre: Nena feat. Nena', locale);
                const expected = locale.startsWith('de') ? '20 Jahre: Nena feat. Nena' : '<lang xml:lang="de-DE">20 Jahre: Nena feat. Nena</lang>';
                expect(album, locale).to.equal(expected);
            });
        });

        it('should work for 99 Luftballons', () => {
            locales.forEach(locale => {
                const album = utils.speakAlbum('99 Luftballons', locale);
                const expected = locale.startsWith('de') ? '99 Luftballons' : '<lang xml:lang="de-DE">99 Luftballons</lang>';
                expect(album, locale).to.equal(expected);
            });
        });

        it('should work for Alles Prima Und Viele Andere Hits', () => {
            locales.forEach(locale => {
                const album = utils.speakAlbum('Alles Prima Und Viele Andere Hits', locale);
                const expected = locale.startsWith('de') ? 'Alles Prima Und Viele Andere Hits' : '<lang xml:lang="de-DE">Alles Prima Und Viele Andere Hits</lang>';
                expect(album, locale).to.equal(expected);
            });
        });

        it('should work for Hélène Grimaud - Bach', () => {
            locales.forEach(locale => {
                const album = utils.speakAlbum('Hélène Grimaud - Bach', locale);
                const expected = locale.startsWith('fr') ? 'Hélène Grimaud - Bach' : '<lang xml:lang="fr-FR">Hélène Grimaud - Bach</lang>';
                expect(album, locale).to.equal(expected);
            });
        });


        it('should work for Eine Kleine Nachtmusik', () => {
            locales.forEach(locale => {
                const album = utils.speakAlbum('Eine Kleine Nachtmusik', locale);
                const expected = locale.startsWith('de') ? 'Eine Kleine Nachtmusik' : '<lang xml:lang="de-DE">Eine Kleine Nachtmusik</lang>';
                expect(album, locale).to.equal(expected);
            });
        });

        it('should work for In Wirklich', () => {
            locales.forEach(locale => {
                const album = utils.speakAlbum('In Wirklich', locale);
                const expected = locale.startsWith('de') ? 'In Wirklich' : '<lang xml:lang="de-DE">In Wirklich</lang>';
                expect(album, locale).to.equal(expected);
            });
        });

        it('should work for Kommt zusammen', () => {
            locales.forEach(locale => {
                const album = utils.speakAlbum('Kommt zusammen', locale);
                const expected = locale.startsWith('de') ? 'Kommt zusammen' : '<lang xml:lang="de-DE">Kommt zusammen</lang>';
                expect(album, locale).to.equal(expected);
            });
        });
    });
});
