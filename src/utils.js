'use strict';

function countryOf(locale) {
    return locale.substr(0, 2);
}

const entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
};

function escape(str) {
    return str.replace(/[&<>"'\/]/g, (s) => {
        return entityMap[s];
    });
}

const DE_DE = 'de-DE';
const ES_ES = 'es-ES';
const EN_US = 'en-US';
const FR_FR = 'fr-FR';
const IT_IT = 'it-IT';

var exports = module.exports = {
    EN_US,
    DE_DE,
};

exports.fixSong = function(song) {
    if (song.artist === 'Hans-Erik Phillip') {
        song.artist = 'Hans-Erik Philip';
    } else if (song.artist === 'Paco de Lucia') {
        song.artist = 'Paco de Lucía';
    }

    if (song.title === 'Cancion Triste') {
        song.title = 'Canción Triste';
    } else if (song.title === 'Corazon Espinado (feat Mana)') {
        song.title = 'Corazon Espinado (feat. Mana)';
    } else if (song.title === 'Gnossienne No1') {
        song.title = 'Gnossienne No. 1';
    } else if (song.title === 'Shock den Affen') {
        song.title = 'Schock den Affen';
    } else {
        song.title = song.title
            .replace(/\(w\/ */, '(with ')
            .replace(/\ w\/ */, ' with ');
    }

    if (song.album === '20 Jahre: Nena Ft Nena') {
        song.album = '20 Jahre: Nena feat. Nena';
    } else if (song.album === 'Rodrigo Y Gabriela') {
        song.album = 'Rodrigo y Gabriela';
    } else {
        song.album = song.album
            .replace(/\(w\/ */, '(with ')
            .replace(/\ w\/ */, ' with ');
    }

    return song;
};

exports.speakAs = function(locale, str) {
    return '<lang xml:lang="' + locale + '">' + str + '</lang>';
};

exports.speakArtist = function(artist, locale) {
    let artistLocale = EN_US;
    switch (artist) {
    case '2raumwohnung':
    case 'Andreas Vollenweider':
    case 'Beethoven':
    case 'Bohren & Der Club Of Gore':
    case 'Hans-Erik Philip': // TODO: he's actually Danish, but German pronounciation should be close enough :)
    case 'Johann Sebastian Bach':
    case 'Kruder & Dorfmeister':
    case 'Mozart':
    case 'Nena':
    case 'Peter Schilling':
    case 'Sophie Hunger':
        artistLocale = DE_DE;
        break;
    case 'Chicha Libre':
    case 'José González':
    case 'José Larralde':
    case 'Juanes':
    case 'Los Bravos':
    case 'Los Fabulosos Cadillacs':
    case 'Los Incas':
    case 'Los Lobos':
    case 'Los Lobos & Antonio Banderas':
    case 'Paco de Lucía':
    case 'Rodrigo y Gabriela':
    case 'Rubén González':
    case 'Santana':
        artistLocale = ES_ES;
        break;
    case 'Alexandra Stréliski':
    case 'Amadou & Mariam':
    case 'Angélique Kidjo':
    case 'Claude Debussy':
    case 'Erik Satie':
    case 'Francis Cabrel':
    case 'Jean-Luc Ponty':
    case 'Jean-Michel Jarre':
    case 'Maurice Ravel':
    case 'Noir Désir':
    case 'Vieux Farka Touré':
        artistLocale = FR_FR;
        break;
    case 'Antonio Vivaldi':
    case 'Luca Stricagnoli':
    case 'Paolo Conte':
    case 'Zucchero':
        artistLocale = IT_IT;
        break;
    }
    artist = escape(artist);
    return locale.startsWith(countryOf(artistLocale)) ? artist : exports.speakAs(artistLocale, artist);
};

exports.speakTitle = function(title, locale) {
    let titleLocale = EN_US;
    switch (title) {
    case '2 von Millionen von Sternen':
    case '99 Luftballons':
    case 'Am Fenster':
    case 'Bei Mir Bist du Schön':
    case 'Bei Mir Bist Du Schön':
    case 'Busenfreund':
    case 'Da Sind Wir':
    case 'Eine Kleine Nachtmusik - Allegro':
    case 'Fiskerne': // TODO: it's actually Danish, but German pronounciation should be close enough :)
    case 'Für Elise':
    case 'Ich Weiß Warum':
    case 'Lautlos':
    case 'Major Tom (Völlig Losgelöst)':
    case 'Schock den Affen':
        titleLocale = DE_DE;
        break;
    case 'A Pesar De Todo':
    case 'Africa Bamba':
    case 'Alma, Corazon Y Vida':
    case 'Aye Aye Aye':
    case 'Buana Buana King Kong':
    case 'Canción Del Mariachi':
    case 'Canción Triste':
    case 'Concierto de Aranjuez':
    case 'Corazon Espinado (feat. Mana)':
    case 'Cumbanchero':
    case 'Diablo Rojo':
    case 'El Capitalismo Foraneo':
    case 'El Condor Pasa':
    case 'El Farol':
    case 'El Fuego':
    case 'El Genio Del Dub':
    case 'Epoca':
    case 'Entre Dos Aguas':
    case 'Guajira':
    case 'La Camisa Negra':
    case 'La Flor De La Canela':
    case 'La Vigüela':
    case 'Lunático':
    case 'Luz Amor Y Vida':
    case 'Luz De Mi Vida':
    case 'Mandinga':
    case 'Matador':
    case 'Migra':
    case 'Oye Como Va':
    case 'Poquito Para Aqui':
    case 'Queremos Paz':
    case 'Quimey Neuquen (Chancha Via Circuito remix)':
    case 'Samba Pa Ti':
    case 'Santa María (del Buen Ayre)':
    case 'Se A Cabo':
    case 'Siboney':
    case 'Tomo Y Obligo':
    case 'Una Música Brutal':
    case 'Virgen De Amor':
        titleLocale = ES_ES;
        break;
    case 'Camions Sauvages':
    case "Ce N'est Pas Bon":
    case 'Compagnon De La Vie':
    case 'Coulibaly':
    case 'Gnossienne No. 1':
    case 'Gymnopedie No. 1':
    case "Jardin d'hiver":
    case 'Jardins sous la pluie':
    case "L' Enfant Roi":
    case 'La Corrida':
    case 'La Femme Accident':
    case "La Femme D'Argent":
    case 'Le Vent Nous Portera':
    case 'Le Voyage De Penelope':
    case "M'Bifé Balafon":
    case 'Masiteladi':
    case 'Mer Du Japon':
    case 'Plus tôt':
    case 'Prelude':
    case "Toussaint L'Overture": // as spelled by Santana :)
    case 'Viens Avec Moi':
        titleLocale = FR_FR;
        break;
    case 'Concerto Op 4 No 1: III Allegro':
    case 'Via Con Me':
        titleLocale = IT_IT;
        break;
    }
    title = escape(title);
    return locale.startsWith(countryOf(titleLocale)) ? title : exports.speakAs(titleLocale, title);
};

exports.speakAlbum = function(album, locale) {
    let albumLocale = EN_US;
    switch (album) {
    case '20 Jahre: Nena feat. Nena':
    case '99 Luftballons':
    case 'Alles Prima Und Viele Andere Hits':
    case 'Am Fenster':
    case 'Eine Kleine Nachtmusik':
    case 'In Wirklich':
    case 'Kommt zusammen':
        albumLocale = DE_DE;
        break;
    case 'Anthogia':
    case 'Chicha Libre ¡Sonido amazónico!':
    case 'Concierto de Aranjuez (Joaquin Rodrigo, 1939)':
    case 'Dos Guitarras Flamencas En America Latina':
    case 'La Revancha Del Tango':
    case 'Lunático':
    case 'Mi Sangre':
    case 'Obras Cumbres':
    case 'Pa Saber De Flamenco 2':
    case 'Rodrigo y Gabriela':
        albumLocale = ES_ES;
        break;
    case 'Des Visages des Figures':
    case 'Dimanche à Bamako':
    case 'Hélène Grimaud - Bach':
    case 'La biographie de Luka Philipsen':
    case 'Samedi Soir Sur La Terre':
        albumLocale = FR_FR;
        break;
    case 'Luca Stricagnoli':
        albumLocale = IT_IT;
        break;
    }
    album = escape(album);
    return locale.startsWith(countryOf(albumLocale)) ? album : exports.speakAs(albumLocale, album);
};
