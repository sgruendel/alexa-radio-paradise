'use strict';

const request = require('request-promise-native');
const cheerio = require('cheerio');

const baseRequest = request.defaults({
    baseUrl: 'https://www.radioparadise.com',
    gzip: true,
});

var exports = module.exports = {};

exports.parsePlaylistBody = function(body) {
    const $ = cheerio.load(body);
    const entries = $('div#content table').find('tr.shade,tr.noshade').map((i, tr) => {
        const cells = $('td', tr).map((j, td) => {
            if ($(td).find('br').length === 1) {
                // for Artist - Song, parse something like
                // <a href="rp2-content.php">Pink Floyd<br>Learning to Fly</a>
                const htmlArtist = $(td).html().replace(/\<br\>.*\<\/a\>/, '</a>');
                const htmlSong = $(td).html().replace(/\>.*\<br\>/, '>');
                const artist = cheerio.load(htmlArtist).text();
                const song = cheerio.load(htmlSong).text();
                return [artist, song];
            } else if ($(td).find('img').length === 1) {
                // for Album, parse something like
                // <a href="rp2-content.php"><img src="graphics/covers/s/B000002C1W.jpg" height="70" ...>Momentary Lapse of Reason</a> (1987)
                const albumAndYear = $(td).text();
                const yearStart = albumAndYear.lastIndexOf('(');
                const yearEnd = albumAndYear.indexOf(')', yearStart);

                const cover = $(td).find('img').attr('src');
                const album = albumAndYear.substring(0, yearStart).trimRight();
                const year = albumAndYear.substring(yearStart + 1, yearEnd);
                return [cover, album, year];
            }

            // default for PST and Rating
            return $(td).text();
        });
        var entry = [];
        entry['pst'] = cells[0];
        entry['artist'] = cells[1];
        entry['song'] = cells[2];
        entry['cover'] = cells[3];
        entry['album'] = cells[4];
        entry['year'] = cells[5];
        entry['rating'] = cells[6];
        return [entry];
    });
    return entries;
};

exports.getPlaylist = function(callback) {
    const options = {
        uri: 'rp2-content.php',
        qs: {
            name: 'Playlist',
        },
    };
    baseRequest(options)
        .then(result => {
            try {
                const entries = exports.parsePlaylistBody(result);
                return callback(null, entries);
            } catch (err) {
                console.error('error parsing playlist:', err);
                return callback(err);
            }
        })
        .catch(err => {
            console.error('error in response for playlist:', err);
            return callback(err);
        });
};
