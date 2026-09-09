import nock from 'nock';

import { BASE_URL, nowPlaying } from '../fixtures/radio-paradise.js';

export function mockNowPlaying(channel, status = 200, response = nowPlaying(channel)) {
    return nock(BASE_URL)
        .get('/api/nowplaying_list_v2022')
        .query({ chan: String(channel) })
        .reply(status, response);
}
