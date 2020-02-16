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

const EN_US = 'en-US';
const DE_DE = 'de-DE';
const FR_CA = 'fr-CA';
const FR_FR = 'fr-FR';

var exports = module.exports = {
    EN_US,
    DE_DE,
};

exports.fixSong = function(song) {
    if (song.title === 'Gnossienne No1') {
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
    case 'Beethoven':
    case 'Kruder & Dorfmeister':
    case 'Nena':
    case 'Sophie Hunger':
    case 'Tom Schilling':
        artistLocale = DE_DE;
        break;
    case 'Alexandra Stréliski':
        artistLocale = FR_CA;
        break;
    case 'Claude Debussy':
    case 'Erik Satie':
    case 'Maurice Ravel':
        artistLocale = FR_FR;
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
    case 'Busenfreund':
    case 'Da Sind Wir':
    case 'Eine Kleine Nachtmusik - Allegro':
    case 'Für Elise':
    case 'Ich Weiß Warum':
    case 'Major Tom (Völlig Losgelöst)':
    case 'Schock den Affen':
        titleLocale = DE_DE;
        break;
    case 'Gnossienne No. 1':
    case 'Gymnopedie No. 1':
    case 'Jardins sous la pluie':
    case 'Plus tôt':
    case 'Prelude':
        titleLocale = FR_FR;
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
    case 'Hélène Grimaud - Bach':
        albumLocale = FR_FR;
        break;
    }
    album = escape(album);
    return locale.startsWith(countryOf(albumLocale)) ? album : exports.speakAs(albumLocale, album);
};
