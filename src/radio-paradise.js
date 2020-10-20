'use strict';

const fetch = require('node-fetch');

const BASE_URL = 'https://api.radioparadise.com/api/';

var exports = module.exports = {};

exports.mix = {
    main: 0,
    mellow: 1,
    rock: 2,
    eclectic: 3,
};

exports.getNowPlaying = async mix => {
    // https://api.radioparadise.com/api/nowplaying_list?&chan=0
    const response = await fetch(
        BASE_URL + 'nowplaying_list?chan=' + mix,
        { compress: true });
    return response.json();
};
