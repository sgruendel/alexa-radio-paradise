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

var exports = module.exports = {
    EN_US,
    DE_DE,
};

exports.fixSong = function(song) {
    if (song.title === 'Shock den Affen') {
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
    case 'Kruder & Dorfmeister':
    case 'Nena':
    case 'Sophie Hunger':
    case 'Tom Schilling':
        artistLocale = DE_DE;
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
    case 'Da Sind Wir':
    case 'Ich Weiß Warum':
    case 'Major Tom (Völlig Losgelöst)':
    case 'Schock den Affen':
        titleLocale = DE_DE;
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
    case 'In Wirklich':
    case 'Kommt zusammen':
        albumLocale = DE_DE;
        break;
    }
    album = escape(album);
    return locale.startsWith(countryOf(albumLocale)) ? album : exports.speakAs(albumLocale, album);
};
