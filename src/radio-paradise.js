'use strict';

// TODO introduce constants for strings

const https = require('https');
const cheerio = require('cheerio');

var exports = module.exports = {};

exports.parsePlaylistBody = function(body) {
    const $ = cheerio.load(body);
    const entries = $('div#content table').find('tr.shade,tr.noshade').map((i, tr) => {
        const cells = $('td', tr).map((j, td) => {
            // For Artist - Song, parse something like
            // <a href="rp2-content.php">Pink Floyd<br>Learning to Fly</a>
            if ($(td).find('br').length == 1) {
                const html = $(td).html();
                const artistStart = html.indexOf('">') + 2;
                const artistEnd = html.indexOf('<br>', artistStart);
                const songStart = artistEnd + 4;
                const songEnd = html.indexOf('</a>', songStart);
                const artist = html.substring(artistStart, artistEnd);
                const song = html.substring(songStart, songEnd);
                return [artist, song];
            }

            // For Album, parse something like
            // <a href="rp2-content.php"><img src="graphics/covers/s/B000002C1W.jpg" height="70" ...>Momentary Lapse of Reason</a> (1987)
            if ($(td).find('img').length == 1) {
                const html = $(td).html();
                const coverStart = html.indexOf('<img src="') + 10;
                const coverEnd = html.indexOf('"', coverStart);
                const albumStart = html.indexOf('">', coverEnd) + 2;
                const albumEnd = html.indexOf('</a>', albumStart);
                const yearStart = html.indexOf('(', albumEnd) + 1;
                const yearEnd = html.indexOf(')', yearStart);

                const cover = html.substring(coverStart, coverEnd);
                const album = html.substring(albumStart, albumEnd);
                const year = html.substring(yearStart, yearEnd);
                return [cover, album, year];
            }

            // default for PST and Rating
            return $(td).text();
        });
        var entry = [];
        entry["pst"] = cells[0];
        entry["artist"] = cells[1];
        entry["song"] = cells[2];
        entry["cover"] = cells[3];
        entry["album"] = cells[4];
        entry["year"] = cells[5];
        entry["rating"] = cells[6];
        return [entry];
    });
    return entries;
}

exports.getPlaylist = function(callback) {
    const request = https.get({ host: 'www.radioparadise.com',
                               port: 443,
                               path: '/rp2-content.php?name=Playlist',
                             });

    request.on('response', (response) => {
        if (response.statusCode < 200 || response.statusCode > 299) {
            callback(new Error(response.statusMessage));
        }
        response.on('error', err => {
            console.error('error in response for playlist', err);
            callback(err);
        });
        // explicitly treat incoming data as utf8
        response.setEncoding('utf8');

        // incrementally capture the incoming response body        
        var body = '';
        response.on('data', chunk => {
            body += chunk;
        });

        response.on('end', () => {
            // we have now received the raw return data in the returnData variable.
            // We can see it in the log output via:
            //console.log(JSON.stringify(body));
            // we may need to parse through it to extract the needed data

            try {
                const entries = exports.parsePlaylistBody(body);
                return callback(null, entries);
            } catch (err) {
                console.error('error parsing playlist', err);
                callback(err);
            }
        });
    });

    request.on('error', err => {
        console.error('error requesting playlist', err.message);
        callback(err);
    });
    
    request.end();
};
