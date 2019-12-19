'use strict';

const request = require('request-promise-native');

const rpRequest = request.defaults({
    baseUrl: 'https://api.radioparadise.com/api',
    gzip: true,
    json: true,
});

var exports = module.exports = {};

exports.mix = {
    main: 0,
    mellow: 1,
    rock: 2,
    eclectic: 3,
};

exports.getNowPlaying = async function(mix) {
    // https://api.radioparadise.com/api/nowplaying_list?&chan=0
    const options = {
        uri: 'nowplaying_list',
        qs: {
            chan: mix,
        },
    };
    return rpRequest(options);
};
