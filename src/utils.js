'use strict';

function countryOf(locale) {
    return locale.substr(0, 2);
}

const entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
};

function escape(str) {
    return str.replace(/[&<>"'\/]/g, (s) => {
        return entityMap[s];
    });
}

const DE_DE = 'de-DE';
const ES_ES = 'es-ES';
const EN_US = 'en-US';
const FR_FR = 'fr-FR';
const IT_IT = 'it-IT';

var exports = module.exports = {
    EN_US,
    DE_DE,
};

exports.fixSong = function(song) {
    if (song.artist === 'Hans-Erik Phillip') {
        song.artist = 'Hans-Erik Philip';
    } else if (song.artist === 'Paco de Lucia') {
        song.artist = 'Paco de Lucía';
    }

    if (song.title === 'Cancion Triste') {
        song.title = 'Canción Triste';
    } else if (song.title === 'Corazon Espinado (feat Mana)') {
        song.title = 'Corazon Espinado (feat. Mana)';
    } else if (song.title === 'Gnossienne No1') {
        song.title = 'Gnossienne No. 1';
    } else if (song.title === 'Shock den Affen') {
        song.title = 'Schock den Affen';
    }

    if (song.album === '20 Jahre: Nena Ft Nena') {
        song.album = '20 Jahre: Nena feat. Nena';
    }

    return song;
};

exports.speakAs = function(locale, str) {
    return '<lang xml:lang="' + locale + '">' + str + '</lang>';
};

exports.speakArtist = function(artist, locale) {
    let artistLocale = EN_US;
    switch (artist) {
    case '2raumwohnung':
    case 'Andreas Vollenweider':
    case 'Beethoven':
    case 'Bohren & Der Club Of Gore':
    case 'Hans-Erik Philip': // TODO: he's actually Danish, but German pronounciation should be close enough :)
    case 'Kruder & Dorfmeister':
    case 'Nena':
    case 'Sophie Hunger':
    case 'Tom Schilling':
        artistLocale = DE_DE;
        break;
    case 'Chicha Libre':
    case 'José González':
    case 'José Larralde':
    case 'Los Bravos':
    case 'Los Fabulosos Cadillacs':
    case 'Los Incas':
    case 'Los Lobos':
    case 'Los Lobos & Antonio Banderas':
    case 'Paco de Lucía':
    case 'Rubén González':
    case 'Santana':
        artistLocale = ES_ES;
        break;
    case 'Alexandra Stréliski':
    case 'Amadou & Mariam':
    case 'Claude Debussy':
    case 'Erik Satie':
    case 'Jean-Luc Ponty':
    case 'Jean-Michel Jarre':
    case 'Maurice Ravel':
    case 'Noir Désir':
    case 'Vieux Farka Touré':
        artistLocale = FR_FR;
        break;
    case 'Antonio Vivaldi':
    case 'Luca Stricagnoli':
    case 'Paolo Conte':
    case 'Zucchero':
        artistLocale = IT_IT;
        break;
    }
    artist = escape(artist);
    return locale.startsWith(countryOf(artistLocale)) ? artist : exports.speakAs(artistLocale, artist);
};

exports.speakTitle = function(title, locale) {
    let titleLocale = EN_US;
    switch (title) {
    case '2 von Millionen von Sternen':
    case '99 Luftballons':
    case 'Bei Mir Bist Du Schön':
    case 'Busenfreund':
    case 'Da Sind Wir':
    case 'Eine Kleine Nachtmusik - Allegro':
    case 'Fiskerne': // TODO: it's actually Danish, but German pronounciation should be close enough :)
    case 'Für Elise':
    case 'Ich Weiß Warum':
    case 'Lautlos':
    case 'Major Tom (Völlig Losgelöst)':
    case 'Schock den Affen':
        titleLocale = DE_DE;
        break;
    case 'A Pesar De Todo':
    case 'Africa Bamba':
    case 'Alma, Corazon Y Vida':
    case 'Aye Aye Aye':
    case 'Buana Buana King Kong':
    case 'Canción Del Mariachi':
    case 'Canción Triste':
    case 'Concierto de Aranjuez':
    case 'Corazon Espinado (feat. Mana)':
    case 'Cumbanchero':
    case 'El Condor Pasa':
    case 'El Farol':
    case 'El Fuego':
    case 'El Genio Del Dub':
    case 'Entre Dos Aguas':
    case 'Guajira':
    case 'La Flor De La Canela':
    case 'Luz Amor Y Vida':
    case 'Luz De Mi Vida':
    case 'Mandinga':
    case 'Matador':
    case 'Migra':
    case 'Oye Como Va':
    case 'Poquito Para Aqui':
    case 'Quimey Neuquen (Chancha Via Circuito remix)':
    case 'Samba Pa Ti':
    case 'Se A Cabo':
    case 'Siboney':
    case 'Tomo Y Obligo':
    case 'Virgen De Amor':
        titleLocale = ES_ES;
        break;
    case "Ce N'est Pas Bon":
    case 'Gnossienne No. 1':
    case 'Gymnopedie No. 1':
    case "Jardin d'hiver":
    case 'Jardins sous la pluie':
    case "L' Enfant Roi":
    case 'La Femme Accident':
    case "La Femme D'Argent":
    case 'Le Vent Nous Portera':
    case 'Le Voyage De Penelope':
    case 'Mer Du Japon':
    case 'Plus tôt':
    case 'Prelude':
    case "Toussaint L'Overture": // as spelled by Santana :)
    case 'Viens Avec Moi':
        titleLocale = FR_FR;
        break;
    case 'Concerto Op 4 No 1: III Allegro':
    case 'Via Con Me':
        titleLocale = IT_IT;
        break;
    }
    title = escape(title);
    return locale.startsWith(countryOf(titleLocale)) ? title : exports.speakAs(titleLocale, title);
};

exports.speakAlbum = function(album, locale) {
    let albumLocale = EN_US;
    switch (album) {
    case '20 Jahre: Nena feat. Nena':
    case '99 Luftballons':
    case 'Alles Prima Und Viele Andere Hits':
    case 'Eine Kleine Nachtmusik':
    case 'In Wirklich':
    case 'Kommt zusammen':
        albumLocale = DE_DE;
        break;
    case 'Anthogia':
    case 'Chicha Libre ¡Sonido amazónico!':
    case 'Concierto de Aranjuez (Joaquin Rodrigo, 1939)':
    case 'Dos Guitarras Flamencas En America Latina':
    case 'Obras Cumbres':
    case 'Pa Saber De Flamenco 2':
        albumLocale = ES_ES;
        break;
    case 'Des Visages des Figures':
    case 'Hélène Grimaud - Bach':
    case 'La biographie de Luka Philipsen':
        albumLocale = FR_FR;
        break;
    }
    album = escape(album);
    return locale.startsWith(countryOf(albumLocale)) ? album : exports.speakAs(albumLocale, album);
};
