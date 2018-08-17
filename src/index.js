'use strict';

const Alexa = require('alexa-sdk');
const radioParadise = require('./radio-paradise');

const APP_ID = 'amzn1.ask.skill.9a6c0ff8-b416-407c-be53-1c67a58fe526';
const languageStrings = {
    en: {
        translation: {
            HELP_MESSAGE: 'You can say „Ask Paradise Playlist for current song“, or you can say „Exit“. What can I help you with?',
            HELP_REPROMPT: 'What can I help you with?',
            STOP_MESSAGE: 'Goodbye!',
            CURRENTLY_PLAYING_MESSAGE: "You're listening to {{song}} by {{artist}} from the {{released}} album {{album}}.",
            ADDITIONAL_INFO_MESSAGE: 'Average rating by your fellow Radio Paradise listeners is {{avgRating}}, the length is {{length}} and it was played {{plays}} times in the last 30 days.',
            CANT_GET_PLAYLIST_MESSAGE: "I'm sorry, I can't get that information currently.",
        },
    },

    de: {
        translation: {
            HELP_MESSAGE: 'Du kannst sagen „Frage Paradise Playlist nach dem aktuellen Lied“, oder du kannst „Beenden“ sagen. Wie kann ich dir helfen?',
            HELP_REPROMPT: 'Wie kann ich dir helfen?',
            STOP_MESSAGE: 'Auf Wiedersehen!',
            CURRENTLY_PLAYING_MESSAGE: 'Du hörst gerade {{song}} von {{artist}} aus dem Album {{album}} von {{released}}.',
            ADDITIONAL_INFO_MESSAGE: 'Die durchschnittliche Bewertung aller Radio Paradise-Hörer ist {{avgRating}}, die Länge beträgt {{length}} und es wurde in den letzten 30 Tagen {{plays}} Mal gespielt.',
            CANT_GET_PLAYLIST_MESSAGE: 'Es tut mir leid, das kann ich gerade nicht herausfinden.',
        },
    },
};

const handlers = {
    LaunchRequest: function() {
        this.emit('RadioParadise');
    },
    RadioParadiseIntent: function() {
        this.emit('RadioParadise');
    },
    RadioParadise: function() {
        radioParadise.getNowPlaying((err, songInfo) => {
            if (songInfo) {
                const speechOutput = this.t('CURRENTLY_PLAYING_MESSAGE',
                    {
                        artist: songInfo.artist, song: songInfo.song, album: songInfo.album,
                        released: songInfo.released,
                    });
                const cardContent = this.t('CURRENTLY_PLAYING_MESSAGE',
                    {
                        artist: songInfo.artist, song: songInfo.song, album: songInfo.album,
                        released: songInfo.released,
                        interpolation: { escapeValue: false },
                    })
                    + ' ' + this.t('ADDITIONAL_INFO_MESSAGE',
                    { avgRating: songInfo.avgRating, length: songInfo.length, plays: songInfo.plays });
                const imageObj = {
                    smallImageUrl: songInfo.cover.replace('\/m\/', '/s/'),
                    largeImageUrl: songInfo.cover.replace('\/m\/', '/l/'),
                };
                console.log(cardContent);

                this.emit(':tellWithCard', speechOutput, 'Radio Paradise Playlist', cardContent, imageObj);
            } else {
                console.error('Error getting playlist', err);
                this.emit(':tell', this.t('CANT_GET_PLAYLIST_MESSAGE'));
            }
        });
    },
    'AMAZON.HelpIntent': function() {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_REPROMPT');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function() {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function() {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    SessionEndedRequest: function() {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

exports.handler = (event, context, callback) => {
    const alexa = Alexa.handler(event, context, callback);
    alexa.appId = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
