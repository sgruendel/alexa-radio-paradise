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
    if (song.artist === 'Al Jawala') {
        song.artist = 'Äl Jawala';
    } else if (song.artist === 'Hans-Erik Phillip') {
        song.artist = 'Hans-Erik Philip';
    } else if (song.artist === 'Les Negresses Vertes') {
        song.artist = 'Les Négresses Vertes';
    } else if (song.artist === 'Paco De Lucia') {
        song.artist = 'Paco de Lucía';
    }

    if (song.title === 'Ca Plane Pour Moi') {
        song.title = 'Ça Plane Pour Moi';
    } else if (song.title === 'Cancion Triste') {
        song.title = 'Canción Triste';
    } else if (song.title === 'Concerto Op 4 No 1: III Allegro') {
        song.title = 'Concerto Op. 4 No. 1: III Allegro';
    } else if (song.title === 'Corazon Espinado (feat Mana)') {
        song.title = 'Corazon Espinado (feat. Mana)';
    } else if (song.title === 'Face a la mer (Massive Attack remix)') {
        song.title = 'Face à la mer (Massive Attack remix)';
    } else if (song.title === 'Fior Di Nha Esperanca') {
        song.title = 'Flôr Di Nha Esperança';
    } else if (song.title === 'Gnossienne No1') {
        song.title = 'Gnossienne No. 1';
    } else if (song.title === "J'ai Tue Le Commissaire") {
        song.title = "J'ai tué le commissaire";
    } else if (song.title === "L' Enfant Roi") {
        song.title = "L'enfant roi";
    } else if (song.title === 'LIke It') {
        song.title = 'Like It';
    } else if (song.title === 'Que Vendra') {
        song.title = 'Qué vendrá';
    } else if (song.title === 'Shock den Affen') {
        song.title = 'Schock den Affen';
    } else if (song.title === "Si Jamais J'oublie") {
        song.title = "Si jamais j'oublie";
    } else {
        song.title = song.title
            .replace(/\(w\/ */, '(with ')
            .replace(/\ w\/ */, ' with ');
    }

    if (song.album === '20 Jahre: Nena Ft Nena') {
        song.album = '20 Jahre: Nena feat. Nena';
    } else if (song.album === 'Deguello') {
        song.album = 'Degüello';
    } else if (song.album === 'El Rayo X') {
        song.album = 'El Rayo-X';
    } else if (song.album === 'In A time lapse') {
        song.album = 'In a Time Lapse';
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

exports.speakArtist = function(artist, locale, logger = null) {
    let artistLocale = EN_US;
    switch (artist) {
    case '2raumwohnung':
    case 'Andreas Vollenweider':
    case 'Beethoven':
    case 'Bohren & Der Club Of Gore':
    case 'DJ Schmolli':
    case 'Edvard Grieg': // TODO: he's actually Norwegian, but German pronounciation should be close enough :)
    case 'Hans-Erik Philip': // TODO: he's actually Danish, but German pronounciation should be close enough :)
    case 'Johann Sebastian Bach':
    case 'Kruder & Dorfmeister':
    case 'Mozart':
    case 'Nena':
    case 'Peter Schilling':
    case 'Schiller':
    case 'Sophie Hunger':
    case 'Wolfsheim':
        artistLocale = DE_DE;
        break;
    case 'Cesária Évora':
    case 'Chicha Libre':
    case 'José González':
    case 'José Larralde':
    case 'Juanes':
    case 'Los Bravos':
    case 'Los Fabulosos Cadillacs':
    case 'Los Incas':
    case 'Los Lobos':
    case 'Los Lobos & Antonio Banderas':
    case 'Manu Chao':
    case 'Paco de Lucía':
    case 'Rodrigo y Gabriela':
    case 'Rubén González':
    case 'Santana':
    case 'Ten Fé':
        artistLocale = ES_ES;
        break;
    case 'Alexandra Stréliski':
    case 'Ali Farka Touré':
    case 'Amadou & Mariam':
    case 'Amina':
    case 'Angélique Kidjo':
    case 'Bizet':
    case 'Claude Debussy':
    case 'Cœur de Pirate':
    case 'Erik Satie':
    case 'Francis Cabrel':
    case 'Gabin':
    case 'Jean-Luc Ponty':
    case 'Jean-Michel Jarre':
    case 'Les Négresses Vertes':
    case 'Madeleine Peyroux':
    case 'Matmatah':
    case 'Maurice Ravel':
    case 'Mory Kanté':
    case 'Noir Désir':
    case 'Paul Mauriat':
    case 'Vieux Farka Touré':
    case 'Yann Tiersen':
    case 'Zaz':
        artistLocale = FR_FR;
        break;
    case 'Antonio Vivaldi':
    case 'Ennio Morricone':
    case 'Luca Stricagnoli':
    case 'Ludovico Einaudi':
    case 'Paolo Conte':
    case 'Zucchero':
        artistLocale = IT_IT;
        break;
    }

    if (logger && artistLocale !== EN_US) {
        logger.info('Using locale ' + artistLocale + ' for artist ' + artist);
    }
    artist = escape(artist);
    return locale.startsWith(countryOf(artistLocale)) ? artist : exports.speakAs(artistLocale, artist);
};

exports.speakTitle = function(title, locale, logger = null) {
    // Test for mixed locales
    let title1, title2, title1Locale, title2Locale;
    if (title === 'Danza di Cala Luna (with John Williams & Paco Pena)') {
        title1 = 'Danza di Cala Luna';
        title1Locale = IT_IT;
        title2 = ' (with John Williams & Paco Pena)';
        title2Locale = EN_US;
    } else if (title === "L'Amour est blue (Love is blue)") {
        title1 = escape("L'Amour est blue");
        title1Locale = FR_FR;
        title2 = ' (Love is blue)';
        title2Locale = EN_US;
    }


    if (title1 && title2) {
        if (logger) {
            logger.info('Using locales ' + title1Locale + '/' + title2Locale + ' for title ' + title);
        }

        return (locale.startsWith(countryOf(title1Locale)) ? title1 : exports.speakAs(title1Locale, title1))
            + (locale.startsWith(countryOf(title2Locale)) ? title2 : exports.speakAs(title2Locale, title2));
    }

    let titleLocale = EN_US;
    switch (title) {
    case '2 von Millionen von Sternen':
    case '99 Luftballons':
    case 'Also Sprach Zarathustra':
    case 'Am Fenster':
    case 'Bei Mir Bist du Schön':
    case 'Bei Mir Bist Du Schön':
    case 'Busenfreund':
    case 'Da Sind Wir':
    case 'Eine Kleine Nachtmusik - Allegro':
    case 'Fiskerne': // TODO: it's actually Danish, but German pronounciation should be close enough :)
    case 'Für Elise':
    case 'Ich liebe Didge':
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
    case 'Candela':
    case 'Chan Chan':
    case 'Concierto de Aranjuez':
    case 'Corazon Espinado (feat. Mana)':
    case 'Cumbanchero':
    case 'De Camino a La Vereda':
    case 'Desaparecido':
    case 'Diablo Rojo':
    case 'El Capitalismo Foraneo':
    case 'El Carretero':
    case 'El Condor Pasa':
    case 'El Cuarto de Tula':
    case 'El Farol':
    case 'El Fuego':
    case 'El Genio Del Dub':
    case 'Epoca':
    case 'Entre Dos Aguas':
    case 'Flôr Di Nha Esperança': // TODO: it's actually Portuguese, but Spanish pronounciation should be close enough :)
    case 'Futuro':
    case 'Guajira':
    case 'La Camisa Negra':
    case 'La Flor De La Canela':
    case 'La Vida Tombola':
    case 'La Vigüela':
    case 'Los Laureles':
    case 'Lunático':
    case 'Luz Amor Y Vida':
    case 'Luz De Mi Vida':
    case 'Malagueña Salerosa':
    case 'Mandinga':
    case 'Mariposa (en Havana)':
    case 'Matador':
    case 'Me Gustas Tu':
    case 'Me Llaman Calle':
    case 'Migra':
    case 'Miss Perfumado': // TODO: it's actually Portuguese, but Spanish pronounciation should be close enough :)
    case 'Oye Como Va':
    case 'Planta De Los Pies':
    case 'Plegaria del Árbol Negro':
    case 'Poquito Para Aqui':
    case 'Que Te Parece, Cholita':
    case 'Queremos Paz':
    case 'Quimey Neuquen (Chancha Via Circuito remix)':
    case 'Rumba De Barcelona':
    case 'Samba Pa Ti':
    case 'Sangue de Beirona': // TODO: it's actually Portuguese, but Spanish pronounciation should be close enough :)
    case 'Santa María (del Buen Ayre)':
    case 'Se A Cabo':
    case 'Siboney':
    case 'Sodade': // TODO: it's actually Portuguese, but Spanish pronounciation should be close enough :)
    case 'Sodade (live)': // TODO: it's actually Portuguese, but Spanish pronounciation should be close enough :)
    case 'Tomo Y Obligo':
    case 'Una Música Brutal':
    case 'Virgen De Amor':
        titleLocale = ES_ES;
        break;
    case "200 Ans d'Hypocrosie":
    case 'Boulevard De La Mort':
    case 'Ça Plane Pour Moi':
    case 'Camions Sauvages':
    case "Ce N'est Pas Bon":
    case 'Compagnon De La Vie':
    case 'Comptine d`un autre ete - l`apres-midi':
    case 'Coulibaly':
    case 'Dictature':
    case 'Dis Moi Pourquoi':
    case 'Face à la mer (Massive Attack remix)':
    case 'Gnossienne No. 1':
    case 'Gymnopedie No. 1':
    case 'Hou! Mamma Mia (Kwanzaa Posse Remix)':
    case "J'ai tué le commissaire":
    case "Jardin d'hiver":
    case 'Jardins sous la pluie':
    case "L'enfant roi":
    case 'La Cerise':
    case 'La Corrida':
    case 'La Femme Accident':
    case "La Femme D'Argent":
    case 'Le Vent Nous Portera':
    case 'Le Voyage De Penelope':
    case 'Les La Boulange':
    case 'Les Martyrs':
    case "M'Bifé Balafon":
    case 'Masiteladi':
    case 'Mer Du Japon':
    case 'Mon Amour (with Vieux Farka Touré)':
    case 'Plus tôt':
    case 'Prelude':
    case 'Qué vendrá':
    case "Si jamais j'oublie":
    case "Toussaint L'Overture": // as spelled by Santana :)
    case "Travailler C'est Trop Dur":
    case 'Viens Avec Moi':
        titleLocale = FR_FR;
        break;
    case 'Andare':
    case 'Concerto Op. 4 No. 1: III Allegro':
    case 'Divenire':
    case 'Primavera':
    case 'Via Con Me':
        titleLocale = IT_IT;
        break;
    }

    if (logger && titleLocale !== EN_US) {
        logger.info('Using locale ' + titleLocale + ' for title ' + title);
    }
    title = escape(title);
    return locale.startsWith(countryOf(titleLocale)) ? title : exports.speakAs(titleLocale, title);
};

exports.speakAlbum = function(album, locale, logger = null) {
    let albumLocale = EN_US;
    switch (album) {
    case '20 Jahre: Nena feat. Nena':
    case '99 Luftballons':
    case 'Alles Prima Und Viele Andere Hits':
    case 'Am Fenster':
    case 'Eine Kleine Nachtmusik':
    case 'In Wirklich':
    case 'Kommt zusammen':
    case 'Tag und Nacht':
        albumLocale = DE_DE;
        break;
    case 'Anthogia':
    case 'Cabo Verde':
    case 'Canciones De Mi Padre':
    case 'Chicha Libre ¡Sonido amazónico!':
    case 'Clandestino':
    case 'Concierto de Aranjuez (Joaquin Rodrigo, 1939)':
    case 'Degüello':
    case 'Dos Guitarras Flamencas En America Latina':
    case 'El Rayo-X':
    case 'Esperanza':
    case 'Futuro':
    case 'La Radiolina':
    case 'La Revancha Del Tango':
    case 'Lunático':
    case 'Mi Sangre':
    case 'Miss Perfumado':
    case 'Obras Cumbres':
    case 'Pa Saber De Flamenco 2':
    case 'Plegaria del Árbol Negro':
    case 'Proxima Estacion':
    case 'Rodrigo y Gabriela':
    case 'Tres Hombres':
        albumLocale = ES_ES;
        break;
    case 'Amélie':
    case "Cours d'histoire":
    case 'Des Visages des Figures':
    case 'Dimanche à Bamako':
    case 'Effet Miroir':
    case 'Hélène Grimaud - Bach':
    case 'La biographie de Luka Philipsen':
    case 'La Cerise':
    case 'Les Retrouvailles':
    case 'Samedi Soir Sur La Terre':
    case 'Sur la Route':
        albumLocale = FR_FR;
        break;
    case 'Divenire':
    case 'La Stravaganza':
    case 'Luca Stricagnoli':
    case 'Una Mattina':
        albumLocale = IT_IT;
        break;
    }

    if (logger && albumLocale !== EN_US) {
        logger.info('Using locale ' + albumLocale + ' for album ' + album);
    }
    album = escape(album);
    return locale.startsWith(countryOf(albumLocale)) ? album : exports.speakAs(albumLocale, album);
};
