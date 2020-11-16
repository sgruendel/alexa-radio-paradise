'use strict';

const expect = require('chai').expect;
const { DE_DE, EN_US } = require('../src/utils');
const utils = require('../src/utils');

const locales = [ 'de-DE', 'en-AU', 'en-CA', 'en-GB', 'en-IN', 'en-US', 'es-ES', 'es-MX', 'fr-CA', 'fr-FR', 'it-IT' ];

const mockLogger = {};
mockLogger.info = (str) => str;

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

        // fix artist
        it('should work for Al Jawala', () => {
            locales.forEach(locale => {
                const song = { artist: 'Al Jawala', title: 'LIke It', album: 'Like It' };
                const fixedSong = utils.fixSong(song);
                expect(fixedSong.artist).to.equal('Äl Jawala');
            });
        });

        it('should work for Hans-Erik Phillip', () => {
            locales.forEach(locale => {
                const song = { artist: 'Hans-Erik Phillip', title: 'Fiskerne', album: 'Original Soundtrack from Fiskerne' };
                const fixedSong = utils.fixSong(song);
                expect(fixedSong.artist).to.equal('Hans-Erik Philip');
            });
        });

        it('should work for Nikkfurie / La Caution', () => {
            locales.forEach(locale => {
                const song = { artist: 'Nikkfurie', title: 'Thé à la Menthe', album: 'La Caution' };
                const fixedSong = utils.fixSong(song);
                expect(fixedSong.artist, 'artist').to.equal('La Caution');
                expect(fixedSong.album, 'album').to.equal('Peines de Maures / Arc-en-ciel pour daltoniens');
            });
        });

        it('should work for Les Negresses Vertes', () => {
            locales.forEach(locale => {
                const song = { artist: 'Les Negresses Vertes', title: "200 Ans d'Hypocrosie", album: '10 Remixes 87-93' };
                const fixedSong = utils.fixSong(song);
                expect(fixedSong.artist).to.equal('Les Négresses Vertes');
            });
        });

        it('should work for Paco De Lucia', () => {
            locales.forEach(locale => {
                const song = { artist: 'Paco De Lucia', title: 'Concierto de Aranjuez', album: '' };
                const fixedSong = utils.fixSong(song);
                expect(fixedSong.artist).to.equal('Paco de Lucía');
            });
        });

        // fix title
        it('should work for Ca Plane Pour Moi', () => {
            locales.forEach(locale => {
                const song = { artist: 'Plastic Bertrand', title: 'Ca Plane Pour Moi', album: 'King Of The Divan' };
                const fixedSong = utils.fixSong(song);
                expect(fixedSong.title).to.equal('Ça Plane Pour Moi');
            });
        });

        it('should work for Cancion Triste', () => {
            locales.forEach(locale => {
                const song = { artist: 'J', title: 'Cancion Triste', album: 'Supernatural' };
                const fixedSong = utils.fixSong(song);
                expect(fixedSong.title).to.equal('Canción Triste');
            });
        });

        it('should work for Concerto Op 4 No 1: III Allegro in English', () => {
            locales.forEach(locale => {
                const song = { artist: 'Antonio Vivaldi', title: 'Concerto Op 4 No 1: III Allegro', album: 'Vivaldi Masterworks' };
                const fixedSong = utils.fixSong(song, EN_US);
                expect(fixedSong.title).to.equal('Concerto Op. 4 No. 1: III Allegro');
            });
        });

        it('should work for Concerto Op 4 No 1: III Allegro in German', () => {
            locales.forEach(locale => {
                const song = { artist: 'Antonio Vivaldi', title: 'Concerto Op 4 No 1: III Allegro', album: 'Vivaldi Masterworks' };
                const fixedSong = utils.fixSong(song, DE_DE);
                expect(fixedSong.title).to.equal('Concerto Op. 4 Nr. 1: III Allegro');
            });
        });

        it('should work for Corazon Espinado (feat Mana)', () => {
            locales.forEach(locale => {
                const song = { artist: 'Santana', title: 'Corazon Espinado (feat Mana)', album: 'Supernatural' };
                const fixedSong = utils.fixSong(song);
                expect(fixedSong.title).to.equal('Corazon Espinado (feat. Mana)');
            });
        });

        it('should work for Face à la mer (Massive Attack remix)', () => {
            locales.forEach(locale => {
                const song = { artist: 'Les Negresses Vertes', title: 'Face a la mer (Massive Attack remix)', album: '10 Remixes 87-93' };
                const fixedSong = utils.fixSong(song);
                expect(fixedSong.title).to.equal('Face à la mer (Massive Attack remix)');
            });
        });

        it('should work for Fior Di Nha Esperanca', () => {
            locales.forEach(locale => {
                const song = { artist: 'Cesária Évora', title: 'Fior Di Nha Esperanca', album: '' };
                const fixedSong = utils.fixSong(song);
                expect(fixedSong.title).to.equal('Flôr Di Nha Esperança');
            });
        });

        it('should work for Gnossienne No1', () => {
            locales.forEach(locale => {
                const song = { artist: 'Erik Satie', title: 'Gnossienne No1', album: '' };
                const fixedSong = utils.fixSong(song);
                expect(fixedSong.title).to.equal('Gnossienne No. 1');
            });
        });

        it("should work for J'ai Tue Le Commissaire", () => {
            locales.forEach(locale => {
                const song = { artist: 'Alpha Blondy', title: "J'ai Tue Le Commissaire", album: 'Mystic Power' };
                const fixedSong = utils.fixSong(song);
                expect(fixedSong.title).to.equal("J'ai tué le commissaire");
            });
        });

        it("should work for L' Enfant Roi", () => {
            locales.forEach(locale => {
                const song = { artist: 'Noir Désir', title: "L' Enfant Roi", album: 'Des Visages des Figures' };
                const fixedSong = utils.fixSong(song);
                expect(fixedSong.title).to.equal("L'enfant roi");
            });
        });

        it('should work for LIke It', () => {
            locales.forEach(locale => {
                const song = { artist: 'Al Jawala', title: 'LIke It', album: 'Like It' };
                const fixedSong = utils.fixSong(song);
                expect(fixedSong.title).to.equal('Like It');
            });
        });

        it('should work for Pleine Lune En Decembre', () => {
            locales.forEach(locale => {
                const song = { artist: 'Zachary Richard', title: 'Pleine Lune En Decembre', album: 'Cap Enragé' };
                const fixedSong = utils.fixSong(song);
                expect(fixedSong.title).to.equal('Pleine lune en décembre');
            });
        });

        it('should work for Que Vendra', () => {
            locales.forEach(locale => {
                const song = { artist: 'Zaz', title: 'Que Vendra', album: 'Effet Miroir' };
                const fixedSong = utils.fixSong(song);
                expect(fixedSong.title).to.equal('Qué vendrá');
            });
        });

        it('should work for Shock den Affen', () => {
            locales.forEach(locale => {
                const song = { artist: 'Peter Gabriel', title: 'Shock den Affen', album: '' };
                const fixedSong = utils.fixSong(song);
                expect(fixedSong.title).to.equal('Schock den Affen');
            });
        });

        it("should work for Si Jamais J'oublie", () => {
            locales.forEach(locale => {
                const song = { artist: 'Zaz', title: "Si Jamais J'oublie", album: 'Sur la Route' };
                const fixedSong = utils.fixSong(song);
                expect(fixedSong.title).to.equal("Si jamais j'oublie");
            });
        });

        it('should work for Braided Hair (w/ Neneh Cherry & Speech)', () => {
            locales.forEach(locale => {
                const song = { artist: '1 Giant Leap', title: 'Braided Hair (w/ Neneh Cherry & Speech)', album: '1 Giant Leap' };
                const fixedSong = utils.fixSong(song);
                expect(fixedSong.title).to.equal('Braided Hair (with Neneh Cherry & Speech)');
            });
        });

        it('should work for My Culture (w/Robbie Williams & Maxi Jazz)', () => {
            locales.forEach(locale => {
                const song = { artist: '1 Giant Leap', title: 'My Culture (w/Robbie Williams & Maxi Jazz)', album: '1 Giant Leap' };
                const fixedSong = utils.fixSong(song);
                expect(fixedSong.title).to.equal('My Culture (with Robbie Williams & Maxi Jazz)');
            });
        });

        it('should work for Silent All These Years (Live w/ Leonard Cohen)', () => {
            locales.forEach(locale => {
                const song = { artist: 'Tori Amos', title: 'Silent All These Years (Live w/ Leonard Cohen)', album: 'Rare On Air Vol 1' };
                const fixedSong = utils.fixSong(song);
                expect(fixedSong.title).to.equal('Silent All These Years (Live with Leonard Cohen)');
            });
        });

        // fix album
        it('should work for 20 Jahre: Nena Ft Nena', () => {
            locales.forEach(locale => {
                const song = { artist: 'Nena', title: 'Anyplace, Anywhere, Anytime (w/ Kim Wilde)', album: '20 Jahre: Nena Ft Nena' };
                const fixedSong = utils.fixSong(song);
                expect(fixedSong.album).to.equal('20 Jahre: Nena feat. Nena');
            });
        });

        it('should work for Deguello', () => {
            locales.forEach(locale => {
                const song = { artist: 'ZZ Top', title: 'Cheap Sunglasses', album: 'Deguello' };
                const fixedSong = utils.fixSong(song);
                expect(fixedSong.album).to.equal('Degüello');
            });
        });

        it('should work for El Rayo X', () => {
            locales.forEach(locale => {
                const song = { artist: 'David Lindley', title: 'Mercury Blues', album: 'El Rayo X' };
                const fixedSong = utils.fixSong(song);
                expect(fixedSong.album).to.equal('El Rayo-X');
            });
        });

        it('should work for In A time lapse', () => {
            locales.forEach(locale => {
                const song = {
                    artist: 'Ludovico Einaudi', title: 'Experience', album: 'In A time lapse' };
                const fixedSong = utils.fixSong(song);
                expect(fixedSong.album).to.equal('In a Time Lapse');
            });
        });

        it('should work for Rodrigo Y Gabriela', () => {
            locales.forEach(locale => {
                const song = { artist: 'Rodrigo y Gabriela', title: 'Diablo Rojo', album: 'Rodrigo Y Gabriela' };
                const fixedSong = utils.fixSong(song);
                expect(fixedSong.album).to.equal('Rodrigo y Gabriela');
            });
        });

        it('should work for Real Live Roadrunning (w/ Mark Knopfler)', () => {
            locales.forEach(locale => {
                const song = { artist: 'Emmylou Harris', title: 'Red Dirt Girl (w/ Mark Knopfler)', album: 'Real Live Roadrunning (w/ Mark Knopfler)' };
                const fixedSong = utils.fixSong(song);
                expect(fixedSong.title).to.equal('Red Dirt Girl (with Mark Knopfler)');
                expect(fixedSong.album).to.equal('Real Live Roadrunning (with Mark Knopfler)');
            });
        });

        it('should work for Jimmie Dale Gilmore w/ Mudhoney', () => {
            locales.forEach(locale => {
                const song = { artist: 'Jimmie Dale Gilmore', title: 'Buckskin Stallion Blues', album: 'Jimmie Dale Gilmore w/ Mudhoney' };
                const fixedSong = utils.fixSong(song);
                expect(fixedSong.album).to.equal('Jimmie Dale Gilmore with Mudhoney');
            });
        });

        it('should work for Yellow/Gold', () => {
            locales.forEach(locale => {
                const song = { artist: 'The Spring Standards', title: 'Watch the Moon Disappear', album: 'Yellow/Gold' };
                const fixedSong = utils.fixSong(song);
                expect(fixedSong.album).to.equal('Yellow/Gold');
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
                const artist = utils.speakArtist('2raumwohnung', locale, mockLogger);
                const expected = locale.startsWith('de') ? '2raumwohnung' : '<lang xml:lang="de-DE">2raumwohnung</lang>';
                expect(artist, locale).to.equal(expected);
            });
        });

        it('should work for Alexandra Stréliski', () => {
            locales.forEach(locale => {
                const artist = utils.speakArtist('Alexandra Stréliski', locale);
                const expected = locale.startsWith('fr') ? 'Alexandra Stréliski' : '<lang xml:lang="fr-FR">Alexandra Stréliski</lang>';
                expect(artist, locale).to.equal(expected);
            });
        });

        it('should work for Antonio Vivaldi', () => {
            locales.forEach(locale => {
                const artist = utils.speakArtist('Antonio Vivaldi', locale);
                const expected = locale.startsWith('it') ? 'Antonio Vivaldi' : '<lang xml:lang="it-IT">Antonio Vivaldi</lang>';
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

        it('should work for Carlos Núñez', () => {
            locales.forEach(locale => {
                const artist = utils.speakArtist('Carlos Núñez', locale);
                const expected = locale.startsWith('es') ? 'Carlos Núñez' : '<lang xml:lang="es-ES">Carlos Núñez</lang>';
                expect(artist, locale).to.equal(expected);
            });
        });

        it('should work for Chicha Libre', () => {
            locales.forEach(locale => {
                const artist = utils.speakArtist('Chicha Libre', locale);
                const expected = locale.startsWith('es') ? 'Chicha Libre' : '<lang xml:lang="es-ES">Chicha Libre</lang>';
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

        it('should work for José González', () => {
            locales.forEach(locale => {
                const artist = utils.speakArtist('José González', locale);
                const expected = locale.startsWith('es') ? 'José González' : '<lang xml:lang="es-ES">José González</lang>';
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

        it('should work for Paco de Lucía', () => {
            locales.forEach(locale => {
                const artist = utils.speakArtist('Paco de Lucía', locale);
                const expected = locale.startsWith('es') ? 'Paco de Lucía' : '<lang xml:lang="es-ES">Paco de Lucía</lang>';
                expect(artist, locale).to.equal(expected);
            });
        });

        it('should work for Paolo Conte', () => {
            locales.forEach(locale => {
                const artist = utils.speakArtist('Paolo Conte', locale);
                const expected = locale.startsWith('it') ? 'Paolo Conte' : '<lang xml:lang="it-IT">Paolo Conte</lang>';
                expect(artist, locale).to.equal(expected);
            });
        });

        it('should work for Rubén González', () => {
            locales.forEach(locale => {
                const artist = utils.speakArtist('Rubén González', locale);
                const expected = locale.startsWith('es') ? 'Rubén González' : '<lang xml:lang="es-ES">Rubén González</lang>';
                expect(artist, locale).to.equal(expected);
            });
        });

        it('should work for Wolfsheim', () => {
            locales.forEach(locale => {
                const artist = utils.speakArtist('Wolfsheim', locale);
                const expected = locale.startsWith('de') ? 'Wolfsheim' : '<lang xml:lang="de-DE">Wolfsheim</lang>';
                expect(artist, locale).to.equal(expected);
            });
        });

        it('should work for Peter Schilling', () => {
            locales.forEach(locale => {
                const artist = utils.speakArtist('Peter Schilling', locale);
                const expected = locale.startsWith('de') ? 'Peter Schilling' : '<lang xml:lang="de-DE">Peter Schilling</lang>';
                expect(artist, locale).to.equal(expected);
            });
        });

        it('should escape Simon & Garfunkel', () => {
            const artist = utils.speakArtist('Simon & Garfunkel', 'en-US');
            expect(artist).to.equal('Simon &amp; Garfunkel');
        });

        it('should work for Zucchero', () => {
            locales.forEach(locale => {
                const artist = utils.speakArtist('Zucchero', locale);
                const expected = locale.startsWith('it') ? 'Zucchero' : '<lang xml:lang="it-IT">Zucchero</lang>';
                expect(artist, locale).to.equal(expected);
            });
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
                const title = utils.speakTitle('2 von Millionen von Sternen', locale, mockLogger);
                const expected = locale.startsWith('de') ? '2 von Millionen von Sternen' : '<lang xml:lang="de-DE">2 von Millionen von Sternen</lang>';
                expect(title, locale).to.equal(expected);
            });
        });

        it("should work for 200 Ans d'Hypocrosie", () => {
            locales.forEach(locale => {
                const title = utils.speakTitle("200 Ans d'Hypocrosie", locale);
                const expected = locale.startsWith('fr') ? '200 Ans d&#39;Hypocrosie' : '<lang xml:lang="fr-FR">200 Ans d&#39;Hypocrosie</lang>';
                expect(title, locale).to.equal(expected);
            });
        });

        it('should work for A Pesar De Todo', () => {
            locales.forEach(locale => {
                const title = utils.speakTitle('A Pesar De Todo', locale);
                const expected = locale.startsWith('es') ? 'A Pesar De Todo' : '<lang xml:lang="es-ES">A Pesar De Todo</lang>';
                expect(title, locale).to.equal(expected);
            });
        });

        it('should work for Alma, Corazon Y Vida', () => {
            locales.forEach(locale => {
                const title = utils.speakTitle('Alma, Corazon Y Vida', locale);
                const expected = locale.startsWith('es') ? 'Alma, Corazon Y Vida' : '<lang xml:lang="es-ES">Alma, Corazon Y Vida</lang>';
                expect(title, locale).to.equal(expected);
            });
        });

        it('should work for Andare', () => {
            locales.forEach(locale => {
                const title = utils.speakTitle('Andare', locale);
                const expected = locale.startsWith('it') ? 'Andare' : '<lang xml:lang="it-IT">Andare</lang>';
                expect(title, locale).to.equal(expected);
            });
        });

        it('should work for Avant La Pluie (Part II)', () => {
            locales.forEach(locale => {
                const title = utils.speakTitle('Avant La Pluie (Part II)', locale);
                let expected = '<lang xml:lang="fr-FR">Avant La Pluie</lang><lang xml:lang="en-US"> (Part II)</lang>';
                if (locale.startsWith('fr')) {
                    expected = 'Avant La Pluie<lang xml:lang="en-US"> (Part II)</lang>';
                } else if (locale.startsWith('en')) {
                    expected = '<lang xml:lang="fr-FR">Avant La Pluie</lang> (Part II)';
                }
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

        it('should work for Camions Sauvages', () => {
            locales.forEach(locale => {
                const title = utils.speakTitle('Camions Sauvages', locale);
                const expected = locale.startsWith('fr') ? 'Camions Sauvages' : '<lang xml:lang="fr-FR">Camions Sauvages</lang>';
                expect(title, locale).to.equal(expected);
            });
        });

        it('should work for Canción Del Mariachi', () => {
            locales.forEach(locale => {
                const title = utils.speakTitle('Canción Del Mariachi', locale);
                const expected = locale.startsWith('es') ? 'Canción Del Mariachi' : '<lang xml:lang="es-ES">Canción Del Mariachi</lang>';
                expect(title, locale).to.equal(expected);
            });
        });

        it("should work for Ce N'est Pas Bon", () => {
            locales.forEach(locale => {
                const title = utils.speakTitle("Ce N'est Pas Bon", locale);
                const expected = locale.startsWith('fr') ? 'Ce N&#39;est Pas Bon' : '<lang xml:lang="fr-FR">Ce N&#39;est Pas Bon</lang>';
                expect(title, locale).to.equal(expected);
            });
        });

        it('should work for Concerto Op 4 No 1: III Allegro', () => {
            const song = { artist: 'Antonio Vivaldi', title: 'Concerto Op 4 No 1: III Allegro', album: 'Vivaldi Masterworks' };
            locales.forEach(locale => {
                const fixedSong = utils.fixSong(song, locale);
                const title = utils.speakTitle(fixedSong.title, locale);
                let expected = 'Concerto Op. 4 No. 1: III Allegro';
                if (locale.startsWith('de')) {
                    expected = 'Concerto Op. 4 Nr. 1: III Allegro';
                } else if (locale.startsWith('es')) {
                    expected = 'Concerto opus 4 núm. 1: III Allegro';
                } else if (locale.startsWith('it')) {
                    expected = 'Concerto op. 4 num. 1: III Allegro';
                }

                expect(title, locale).to.equal(expected);
            });
        });

        it('should work for Cumbanchero', () => {
            locales.forEach(locale => {
                const title = utils.speakTitle('Cumbanchero', locale);
                const expected = locale.startsWith('es') ? 'Cumbanchero' : '<lang xml:lang="es-ES">Cumbanchero</lang>';
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

        it('should work for Danza di Cala Luna (w/ John Williams & Paco Pena)', () => {
            locales.forEach(locale => {
                const title = utils.speakTitle('Danza di Cala Luna (with John Williams & Paco Pena)', locale);
                let expected = '<lang xml:lang="it-IT">Danza di Cala Luna</lang><lang xml:lang="en-US"> (with John Williams & Paco Pena)</lang>';
                if (locale.startsWith('it')) {
                    expected = 'Danza di Cala Luna<lang xml:lang="en-US"> (with John Williams & Paco Pena)</lang>';
                } else if (locale.startsWith('en')) {
                    expected = '<lang xml:lang="it-IT">Danza di Cala Luna</lang> (with John Williams & Paco Pena)';
                }
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

        it('should work for Fly Like A Bird (Acoustic Live)', () => {
            locales.forEach(locale => {
                const title = utils.speakTitle('Fly Like A Bird (Acoustic Live)', locale);
                const expected = locale.startsWith('en') ? 'Fly Like A Bird (Acoustic <w role="amazon:NN">Live</w>)' : '<lang xml:lang="en-US">Fly Like A Bird (Acoustic <w role="amazon:NN">Live</w>)</lang>';
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

        it("should work for L'Amour est blue (Love is blue)", () => {
            locales.forEach(locale => {
                const title = utils.speakTitle("L'Amour est blue (Love is blue)", locale, mockLogger);
                let expected = '<lang xml:lang="fr-FR">L&#39;Amour est blue</lang><lang xml:lang="en-US"> (Love is blue)</lang>';
                if (locale.startsWith('fr')) {
                    expected = 'L&#39;Amour est blue<lang xml:lang="en-US"> (Love is blue)</lang>';
                } else if (locale.startsWith('en')) {
                    expected = '<lang xml:lang="fr-FR">L&#39;Amour est blue</lang> (Love is blue)';
                }
                expect(title, locale).to.equal(expected);
            });
        });

        it('should work for La Femme Accident', () => {
            locales.forEach(locale => {
                const title = utils.speakTitle('La Femme Accident', locale);
                const expected = locale.startsWith('fr') ? 'La Femme Accident' : '<lang xml:lang="fr-FR">La Femme Accident</lang>';
                expect(title, locale).to.equal(expected);
            });
        });

        it("should work for La Femme D'Argent", () => {
            locales.forEach(locale => {
                const title = utils.speakTitle("La Femme D'Argent", locale);
                const expected = locale.startsWith('fr') ? 'La Femme D&#39;Argent' : '<lang xml:lang="fr-FR">La Femme D&#39;Argent</lang>';
                expect(title, locale).to.equal(expected);
            });
        });

        it('should work for Le Voyage De Penelope', () => {
            locales.forEach(locale => {
                const title = utils.speakTitle('Le Voyage De Penelope', locale);
                const expected = locale.startsWith('fr') ? 'Le Voyage De Penelope' : '<lang xml:lang="fr-FR">Le Voyage De Penelope</lang>';
                expect(title, locale).to.equal(expected);
            });
        });

        it('should work for Mandinga', () => {
            locales.forEach(locale => {
                const title = utils.speakTitle('Mandinga', locale);
                const expected = locale.startsWith('es') ? 'Mandinga' : '<lang xml:lang="es-ES">Mandinga</lang>';
                expect(title, locale).to.equal(expected);
            });
        });

        it('should work for Mer Du Japon', () => {
            locales.forEach(locale => {
                const title = utils.speakTitle('Mer Du Japon', locale);
                const expected = locale.startsWith('fr') ? 'Mer Du Japon' : '<lang xml:lang="fr-FR">Mer Du Japon</lang>';
                expect(title, locale).to.equal(expected);
            });
        });

        it('should work for On the Border (live)', () => {
            locales.forEach(locale => {
                const title = utils.speakTitle('On the Border (live)', locale);
                const expected = locale.startsWith('en') ? 'On the Border (<w role="amazon:NN">live</w>)' : '<lang xml:lang="en-US">On the Border (<w role="amazon:NN">live</w>)</lang>';
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

        it('should work for Via Con Me', () => {
            locales.forEach(locale => {
                const title = utils.speakTitle('Via Con Me', locale);
                const expected = locale.startsWith('it') ? 'Via Con Me' : '<lang xml:lang="it-IT">Via Con Me</lang>';
                expect(title, locale).to.equal(expected);
            });
        });

        it('should work for Vivaldi - Allegro, Concerto in G Major, Op 4 No 3', () => {
            const song = { artist: 'Rachel Podger', title: 'Vivaldi - Allegro, Concerto in G Major, Op 4 No 3', album: 'La Stravaganza' };
            locales.forEach(locale => {
                const fixedSong = utils.fixSong(song, locale);
                const title = utils.speakTitle(fixedSong.title, locale);
                let expected = 'Vivaldi - Allegro, Concerto in G Major, Op. 4 No. 3';
                if (locale.startsWith('de')) {
                    expected = 'Vivaldi - Allegro, Concerto in G Dur, Op. 4 Nr. 3';
                } else if (locale.startsWith('es')) {
                    expected = 'Vivaldi - Allegro, Concierto en sol mayor, opus 4 núm. 3';
                } else if (locale.startsWith('fr')) {
                    expected = 'Vivaldi - Allegro, Concerto en sol majeur, op. 4 no. 3';
                } else if (locale.startsWith('it')) {
                    expected = 'Vivaldi - Allegro, Concerto in sol maggiore, op. 4 num. 3';
                }

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
                const album = utils.speakAlbum('20 Jahre: Nena feat. Nena', locale, mockLogger);
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

        it('should work for Amélie', () => {
            locales.forEach(locale => {
                const album = utils.speakAlbum('Amélie', locale);
                const expected = locale.startsWith('fr') ? 'Amélie' : '<lang xml:lang="fr-FR">Amélie</lang>';
                expect(album, locale).to.equal(expected);
            });
        });

        it('should work for Anthogia', () => {
            locales.forEach(locale => {
                const album = utils.speakAlbum('Anthogia', locale);
                const expected = locale.startsWith('es') ? 'Anthogia' : '<lang xml:lang="es-ES">Anthogia</lang>';
                expect(album, locale).to.equal(expected);
            });
        });

        it('should work for Concierto de Aranjuez (Joaquin Rodrigo, 1939)', () => {
            locales.forEach(locale => {
                const album = utils.speakAlbum('Concierto de Aranjuez (Joaquin Rodrigo, 1939)', locale);
                const expected = locale.startsWith('es') ? 'Concierto de Aranjuez (Joaquin Rodrigo, 1939)' : '<lang xml:lang="es-ES">Concierto de Aranjuez (Joaquin Rodrigo, 1939)</lang>';
                expect(album, locale).to.equal(expected);
            });
        });

        it('should work for Des Visages des Figures', () => {
            locales.forEach(locale => {
                const album = utils.speakAlbum('Des Visages des Figures', locale);
                const expected = locale.startsWith('fr') ? 'Des Visages des Figures' : '<lang xml:lang="fr-FR">Des Visages des Figures</lang>';
                expect(album, locale).to.equal(expected);
            });
        });

        it('should work for Divenire', () => {
            locales.forEach(locale => {
                const album = utils.speakAlbum('Divenire', locale);
                const expected = locale.startsWith('it') ? 'Divenire' : '<lang xml:lang="it-IT">Divenire</lang>';
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

        it('should work for Hélène Grimaud - Bach', () => {
            locales.forEach(locale => {
                const album = utils.speakAlbum('Hélène Grimaud - Bach', locale);
                const expected = locale.startsWith('fr') ? 'Hélène Grimaud - Bach' : '<lang xml:lang="fr-FR">Hélène Grimaud - Bach</lang>';
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
