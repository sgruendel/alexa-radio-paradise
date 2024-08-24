import fetch from 'node-fetch';
import https from 'https';

const BASE_URL = 'https://api.radioparadise.com/api/';

const httpsAgent = new https.Agent({
    keepAlive: true,
});
const options = {
    agent: (_parsedURL) => {
        return httpsAgent;
    },
};

/** @typedef {Object.<string, number>} Mix */
export const mix = {
    main: 0,
    mellow: 1,
    rock: 2,
    global: 3,
};

/**
 * @typedef {Object} NowPlaying
 * @property {string} user_id - User ID.
 * @property {string} player_id - Player ID.
 * @property {string} hist_num - History number.
 * @property {Object.<string, Song>} song - Object containing songs indexed by number.
 * @property {number} refresh - Refresh number.
 * @property {string} cover_base_url - Base URL for cover images.
 */

/**
 * @typedef {Object} Song
 * @property {string} event - Event ID.
 * @property {string} sched_time - Scheduled time.
 * @property {string} song_id - Song ID.
 * @property {string} chan - Channel ID.
 * @property {string} duration - Duration of the song.
 * @property {string} artist - Artist name.
 * @property {string} title - Title of the song.
 * @property {string} album - Album name.
 * @property {string} year - Year of release.
 * @property {string} asin - Amazon Standard Identification Number (ASIN).
 * @property {string} rating - Song rating.
 * @property {string} slideshow - Slideshow images.
 * @property {string} cover - URL of the large cover image.
 * @property {string} cover_med - URL of the medium cover image.
 * @property {string} cover_small - URL of the small cover image.
 * @property {Channel} channel - Channel information.
 */

/**
 * @typedef {Object} Channel
 * @property {string} chan - Channel ID.
 * @property {string} title - Channel title.
 * @property {string} stream_name - Stream name.
 * @property {boolean} isER - Indicates if it's an emergency room (ER) channel.
 */

/**
 * Makes an asynchronous request to the Radio Paradise API to retrieve the currently playing song for a given mix.
 * @param {string} mix channel or mix for which to retrieve the currently playing songs.
 * @returns a promise that resolves to the JSON response from the API.
 */
export async function getNowPlaying(mix) {
    // https://api.radioparadise.com/api/nowplaying_list?&chan=0
    const response = await fetch(BASE_URL + 'nowplaying_list_v2022?chan=' + mix, options);

    /** @type {NowPlaying} */
    // @ts-ignore
    const songs = response.json();
    return songs;
}
