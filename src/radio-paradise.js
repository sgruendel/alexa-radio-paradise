'use strict';

const request = require('request-promise-native');

const rpRequest = request.defaults({
    baseUrl: 'https://api.radioparadise.com/api',
    gzip: true,
    json: true,
});

var exports = module.exports = {};

exports.getNowPlaying = async function() {
    // https://api.radioparadise.com/api/nowplaying_list?event=0&elapsed=0.001&chan=0
    const options = {
        uri: 'nowplaying_list',
    };
    return rpRequest(options);
};
