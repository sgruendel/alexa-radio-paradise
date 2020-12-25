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

exports.fixSong = function(song, locale) {
    let fixedSong = Object.assign({}, song);

    if (song.artist === 'Nikkfurie' && song.album === 'La Caution') {
        // It's the other way round, Bill :)
        fixedSong.artist = 'La Caution';
        fixedSong.album = 'Peines de Maures / Arc-en-ciel pour daltoniens';
    }

    if (song.artist === 'Al Jawala') {
        fixedSong.artist = 'Äl Jawala';
    } else if (song.artist === 'Hans-Erik Phillip') {
        fixedSong.artist = 'Hans-Erik Philip';
    } else if (song.artist === 'Les Negresses Vertes') {
        fixedSong.artist = 'Les Négresses Vertes';
    } else if (song.artist === 'Paco De Lucia') {
        fixedSong.artist = 'Paco de Lucía';
    }

    if (song.title === 'Brandenburg Concerto No. 5 In D') {
        if (locale && locale.startsWith('de')) {
            fixedSong.title = 'Brandenburgisches Konzert Nr. 5 D-Dur';
        } else if (locale && locale.startsWith('es')) {
            fixedSong.title = 'Brandenburg Concierto núm. 5 en re mayor';
        } else if (locale && locale.startsWith('fr')) {
            fixedSong.title = 'Brandenburg Concerto no. 5 en ré majeur';
        } else if (locale && locale.startsWith('it')) {
            fixedSong.title = 'Brandenburg Concerto num. 5 in re maggiore';
        } else {
            fixedSong.title = 'Brandenburg Concerto No. 5 in D major';
        }
    } else if (song.title === 'Ca Plane Pour Moi') {
        fixedSong.title = 'Ça Plane Pour Moi';
    } else if (song.title === 'Cancion Triste') {
        fixedSong.title = 'Canción Triste';
    } else if (song.title === 'Concerto Op 4 No 1: III Allegro') {
        if (locale && locale.startsWith('de')) {
            fixedSong.title = 'Concerto Op. 4, Nr. 1: III Allegro';
        } else if (locale && locale.startsWith('es')) {
            fixedSong.title = 'Concerto opus 4, núm. 1: III Allegro';
        } else if (locale && locale.startsWith('it')) {
            fixedSong.title = 'Concerto op. 4, num. 1: III Allegro';
        } else {
            // This also works for French which would only differ in lower case for "op. 4 no. 1"
            fixedSong.title = 'Concerto Op. 4, No. 1: III Allegro';
        }
    } else if (song.title === 'Corazon Espinado (feat Mana)') {
        fixedSong.title = 'Corazon Espinado (feat. Mana)';
    } else if (song.title === 'Face a la mer (Massive Attack remix)') {
        fixedSong.title = 'Face à la mer (Massive Attack remix)';
    } else if (song.title === 'Fior Di Nha Esperanca') {
        fixedSong.title = 'Flôr Di Nha Esperança';
    } else if (song.title === 'Gavotte In B Minor') {
        if (locale && locale.startsWith('de')) {
            fixedSong.title = 'Gavotte in h-Moll';
        } else if (locale && locale.startsWith('es')) {
            fixedSong.title = 'Gavotte en si menor';
        } else if (locale && locale.startsWith('fr')) {
            fixedSong.title = 'Gavotte en si mineur';
        } else if (locale && locale.startsWith('it')) {
            fixedSong.title = 'Gavotte in si minore';
        }
    } else if (song.title === 'Gnossienne No1') {
        fixedSong.title = 'Gnossienne No. 1';
    } else if (song.title === "J'ai Tue Le Commissaire") {
        fixedSong.title = "J'ai tué le commissaire";
    } else if (song.title === "L' Enfant Roi") {
        fixedSong.title = "L'enfant roi";
    } else if (song.title === 'LIke It') {
        fixedSong.title = 'Like It';
    } else if (song.title === 'Morning Mood (Allegretto pas') {
        fixedSong.title = 'Morning Mood (Allegretto pastorale)';
    } else if (song.title === 'Pleine Lune En Decembre') {
        fixedSong.title = 'Pleine lune en décembre';
    } else if (song.title === 'Prelude No. 1 In C Major') {
        if (locale && locale.startsWith('de')) {
            fixedSong.title = 'Präludium Nr. 1 C-Dur';
        } else if (locale && locale.startsWith('es')) {
            fixedSong.title = 'Preludio núm. 1 en Do mayor';
        } else if (locale && locale.startsWith('fr')) {
            fixedSong.title = 'Prélude no. 1 en ut majeur';
        } else if (locale && locale.startsWith('it')) {
            fixedSong.title = 'Preludio num. 1 in do maggiore';
        } else {
            // keep english
        }
    } else if (song.title === 'Que Vendra') {
        fixedSong.title = 'Qué vendrá';
    } else if (song.title === 'Shock den Affen') {
        fixedSong.title = 'Schock den Affen';
    } else if (song.title === "Si Jamais J'oublie") {
        fixedSong.title = "Si jamais j'oublie";
    } else if (song.title === 'Vivaldi - Allegro, Concerto in G Major, Op 4 No 3') {
        if (locale && locale.startsWith('de')) {
            fixedSong.title = 'Vivaldi - Allegro, Concerto in G-Dur Op. 4, Nr. 3';
        } else if (locale && locale.startsWith('es')) {
            fixedSong.title = 'Vivaldi - Allegro, Concierto en sol mayor opus 4, núm. 3';
        } else if (locale && locale.startsWith('fr')) {
            fixedSong.title = 'Vivaldi - Allegro, Concerto en sol majeur op. 4, no. 3';
        } else if (locale && locale.startsWith('it')) {
            fixedSong.title = 'Vivaldi - Allegro, Concerto in sol maggiore op. 4, num. 3';
        } else {
            fixedSong.title = 'Vivaldi - Allegro, Concerto in G Major Op. 4, No. 3';
        }
    } else {
        fixedSong.title = fixedSong.title
            .replace(/\(w\/ */, '(with ')
            .replace(/\ w\/ */, ' with ');
    }

    if (song.album === '20 Jahre: Nena Ft Nena') {
        fixedSong.album = '20 Jahre: Nena feat. Nena';
    } else if (song.album === 'Deguello') {
        fixedSong.album = 'Degüello';
    } else if (song.album === 'El Rayo X') {
        fixedSong.album = 'El Rayo-X';
    } else if (song.album === 'In A time lapse') {
        fixedSong.album = 'In a Time Lapse';
    } else if (song.album === 'Peer Gynt Suite No. 1 Op.46 (Karajan - BPO)') {
        if (locale && locale.startsWith('de')) {
            fixedSong.album = 'Peer Gynt Suite Nr. 1, Op. 46 (Karajan - B.P.O.)';
        } else if (locale && locale.startsWith('es')) {
            fixedSong.album = 'Peer Gynt Suite núm. 1, opus 46 (Karajan - B.P.O.)';
        } else if (locale && locale.startsWith('it')) {
            fixedSong.album = 'Peer Gynt Suite num. 1, op. 46 (Karajan - B.P.O.)';
        } else {
            // This also works for French which would only differ in lower case for "op. 4 no. 1"
            fixedSong.album = 'Peer Gynt Suite No. 1, Op. 46 (Karajan - B.P.O.)';
        }
    } else if (song.album === 'Rodrigo Y Gabriela') {
        fixedSong.album = 'Rodrigo y Gabriela';
    } else {
        fixedSong.album = fixedSong.album
            .replace(/\(w\/ */, '(with ')
            .replace(/\ w\/ */, ' with ');
    }

    return fixedSong;
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
    case 'Carlos Núñez':
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
    case 'Jacques Loussier Trio':
    case 'Jean-Luc Ponty':
    case 'Jean-Michel Jarre':
    case 'Les Négresses Vertes':
    case 'La Caution':
    case 'Madeleine Peyroux':
    case 'Marc Moulin':
    case 'Matmatah':
    case 'Maurice Ravel':
    case 'Mory Kanté':
    case 'Noir Désir':
    case 'Paul Mauriat':
    case 'René Aubry':
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
    if (title === 'Avant La Pluie (Part II)') {
        title1 = 'Avant La Pluie';
        title1Locale = FR_FR;
        title2 = ' (Part II)';
        title2Locale = EN_US;
    } else if (title === 'Danza di Cala Luna (with John Williams & Paco Pena)') {
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
    case 'Siempre Que':
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
    case "J'peux pas m'empêcher":
    case "Jardin d'hiver":
    case 'Jardins sous la pluie':
    case "L'enfant roi":
    case 'La Cerise':
    case 'La Corrida':
    case 'La Femme Accident':
    case "La Femme D'Argent":
    case 'La Grande Cascade':
    case 'Le Vent Nous Portera':
    case 'Le Voyage De Penelope':
    case 'Les La Boulange':
    case 'Les Martyrs':
    case "M'Bifé Balafon":
    case 'Madame Papillon':
    case 'Masiteladi':
    case 'Mer Du Japon':
    case 'Mon Amour (with Vieux Farka Touré)':
    case 'Plus tôt':
    case 'Prelude':
    case 'Qué vendrá':
    case "Si jamais j'oublie":
    case 'Thé à la Menthe':
    case "Toussaint L'Overture": // as spelled by Santana :)
    case "Travailler C'est Trop Dur":
    case 'Viens Avec Moi':
        titleLocale = FR_FR;
        break;
    case 'Andare':
    case 'Divenire':
    case 'Non Ti Amo Più':
    case 'Primavera':
    case 'Via Con Me':
        titleLocale = IT_IT;
        break;
    case 'Brandenburgisches Konzert Nr. 5 D-Dur':
    case 'Brandenburg Concierto núm. 5 en re mayor':
    case 'Brandenburg Concerto no. 5 en ré majeur':
    case 'Brandenburg Concerto num. 5 in re maggiore':
    case 'Concerto Op. 4, Nr. 1: III Allegro':
    case 'Concerto opus 4, núm. 1: III Allegro':
    case 'Concerto op. 4, num. 1: III Allegro':
    case 'Concerto Op. 4, No. 1: III Allegro':
    case 'Gavotte in h-Moll':
    case 'Gavotte en si menor':
    case 'Gavotte en si mineur':
    case 'Gavotte in si minore':
    case 'Präludium Nr. 1 C-Dur':
    case 'Preludio núm. 1 en Do mayor':
    case 'Prélude no. 1 en ut majeur':
    case 'Preludio num. 1 in do maggiore':
    case 'Vivaldi - Allegro, Concerto in G-Dur Op. 4, Nr. 3':
    case 'Vivaldi - Allegro, Concierto en sol mayor opus 4, núm. 3':
    case 'Vivaldi - Allegro, Concerto en sol majeur op. 4, no. 3':
    case 'Vivaldi - Allegro, Concerto in sol maggiore op. 4, num. 3':
        // use native locale
        titleLocale = locale;
        break;
    }

    if (logger && titleLocale !== EN_US) {
        logger.info('Using locale ' + titleLocale + ' for title ' + title);
    }

    // "... (Live Acoustic)" works, but "... (live)" or "... (Acoustic Live)" doesn't
    if (titleLocale === EN_US && (title.endsWith('live)') || title.endsWith('Live)'))) {
        title = escape(title.substr(0, title.length - 5))
            + '<w role="amazon:NN">' + title.substr(title.length - 5, 4) + '</w>)';
    } else {
        title = escape(title);
    }
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
    case 'Aprés La Pluie':
    case 'Cap Enragé':
    case "Cours d'histoire":
    case 'Des Visages des Figures':
    case 'Dimanche à Bamako':
    case 'Effet Miroir':
    case 'Hélène Grimaud - Bach':
    case 'La biographie de Luka Philipsen':
    case 'La Cerise':
    case 'Les Retrouvailles':
    case 'Peines de Maures / Arc-en-ciel pour daltoniens':
    case "Plaisirs D'amour":
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
    case 'Peer Gynt Suite Nr. 1, Op. 46 (Karajan - B.P.O.)':
    case 'Peer Gynt Suite núm. 1, opus 46 (Karajan - B.P.O.)':
    case 'Peer Gynt Suite num. 1, op. 46 (Karajan - B.P.O.)':
    case 'Peer Gynt Suite No. 1, Op. 46 (Karajan - B.P.O.)':
        // use native locale
        albumLocale = locale;
        break;
    }

    if (logger && albumLocale !== EN_US) {
        logger.info('Using locale ' + albumLocale + ' for album ' + album);
    }
    album = escape(album);
    return locale.startsWith(countryOf(albumLocale)) ? album : exports.speakAs(albumLocale, album);
};
