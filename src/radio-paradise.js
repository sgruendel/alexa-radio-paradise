'use strict';

const request = require('request-promise-native');
const cheerio = require('cheerio');

const rpRequest = request.defaults({
    baseUrl: 'https://www.radioparadise.com',
    gzip: true,
});

const regexReleased = /Released: (.+)<br>/;
const regexLength = /Length: (.+)<br>/;
const regexPlays = /Plays.*: (.+)<br>/;

var exports = module.exports = {};

exports.parseSongInfoBody = (body) => {
    const $ = cheerio.load(body);

    const divTopicHead1 = $('div#content div.topic_head').slice(0, 1);
    const artistSong = divTopicHead1.text();
    const artist = $('a', divTopicHead1).slice(0, 1).text();
    const song = artistSong.slice(artist.length + 4);

    const divInfo = $('div#div_info');
    const cover = $('a', divInfo).slice(0, 1).find('img').attr('src');
    const album = $('a', divInfo).slice(1, 2).text();
    const avgRating = $('div.rating-div', divInfo).slice(0, 1).text();

    const releasedLengthPlays = $('span', divInfo).slice(1, 2);
    const released = regexReleased.exec(releasedLengthPlays)[1];
    const length = regexLength.exec(releasedLengthPlays)[1];
    const plays = regexPlays.exec(releasedLengthPlays)[1];

    const lyrics = $('div#content div#div_lyrics').text().trim();

    return {
        artist: artist, song: song,
        cover: cover, album: album, avgRating: avgRating,
        released: released, length: length, plays: plays, lyrics: lyrics,
    };
};

exports.getNowPlaying = async function() {
    const options = {
        uri: 'rp3.php',
        qs: {
            n: 'Music',
            f: 'songinfo',
        },
    };
    return exports.parseSongInfoBody(await rpRequest(options));
};
