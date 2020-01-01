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

exports.speakAs = function(locale, str) {
    return '<lang xml:lang="' + locale + '">' + str + '</lang>';
};

exports.speakArtist = function(artist, locale) {
    let artistLocale = EN_US;
    switch (artist) {
    case '2raumwohnung':
        artistLocale = DE_DE;
        break;
    }
    artist = escape(artist);
    return locale.startsWith(countryOf(artistLocale)) ? artist : exports.speakAs(artistLocale, artist);
};

exports.speakSong = function(song, locale) {
    let songLocale = EN_US;
    switch (song) {
    case '2 von Millionen von Sternen':
    case 'Da Sind Wir':
    case 'Ich Weiß Warum':
        songLocale = DE_DE;
        break;
    }
    song = escape(song);
    return locale.startsWith(countryOf(songLocale)) ? song : exports.speakAs(songLocale, song);
};

exports.speakAlbum = function(album, locale) {
    let albumLocale = EN_US;
    switch (album) {
    case 'In Wirklich':
    case 'Kommt zusammen':
        albumLocale = DE_DE;
        break;
    }
    album = escape(album);
    return locale.startsWith(countryOf(albumLocale)) ? album : exports.speakAs(albumLocale, album);
};
