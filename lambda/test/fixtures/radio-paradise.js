export const BASE_URL = 'https://api.radioparadise.com';

const CHANNEL_TITLES = {
    0: 'The Main Mix',
    1: 'Mellow Mix',
    2: 'RockIt!',
    3: 'The Globe',
    5: 'Beyond...',
    42: 'Serenity',
    945: 'KFAT',
};

export function song(
    channel = 0,
    {
        artist = 'Miles Davis',
        title = 'Blue In Green',
        album = 'Kind Of Blue',
        year = '1959',
        duration = '329000',
        listenerRating = 8.4,
        cover = 'covers/l/B000000Y6H.jpg',
    } = {},
) {
    const channelId = Number(channel);
    const channelKey = String(channelId);
    return {
        event: '123456',
        song_id: '654321',
        play_time: 120,
        cover,
        cover_med: cover.replace('/l/', '/m/'),
        cover_small: cover.replace('/l/', '/s/'),
        channel: {
            chan: channelKey,
            title: CHANNEL_TITLES[channelId] || `Channel ${channelId}`,
            stream_name: CHANNEL_TITLES[channelId] || `Channel ${channelId}`,
            isER: false,
        },
        chan: channelId,
        album,
        artist,
        asin: '',
        duration,
        ratings_num: '100',
        ratings_dist: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        listener_rating: listenerRating,
        slideshow: '',
        title,
        year,
    };
}

export function nowPlaying(channel = 0) {
    return {
        user_id: '0',
        player_id: '0',
        hist_num: '2',
        song: {
            0: song(channel),
            1: song(channel, {
                artist: 'Don Henley',
                title: 'Sunset Grill',
                album: 'Building the Perfect Beast',
                year: '1984',
                duration: '376000',
                listenerRating: 6.14,
                cover: 'covers/l/B000000OPC.jpg',
            }),
        },
        refresh: 30,
        cover_base_url: 'https://img.radioparadise.com/',
    };
}
