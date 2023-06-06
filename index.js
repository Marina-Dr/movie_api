const express = require("express"),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    uuid = require('uuid');

const app = express();

app.use(bodyParser.json());
 
//data about my top 10 movies
let topMovies = [
  {
    id: 1,
    title: 'Forrest Gump',
    year: '1994',
    director: 
        {
            name: 'Robert Zemeckis',
            bio: 'Robert Lee Zemeckis is an American filmmaker. He first came to public attention as the director of the action-adventure romantic comedy Romancing the Stone, the science-fiction comedy Back to the Future film trilogy, and the live-action/animated comedy Who Framed Roger Rabbit.',
            birthyear: '1952'
        },
    genre:{
      name: 'Drama',
      description: 'In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.'
    },
    imageUrl: 'https://www.imdb.com/title/tt0109830/mediaviewer/rm1954748672/?ref_=tt_ov_i'
  },
  {
    id: 2,
    title: 'Flight Club',
    year: '1999',
    director: 
        {
            name: 'David Fincher',
            bio: 'David Andrew Leo Fincher is an American film director. His films, mostly psychological thrillers, have received 40 nominations at the Academy Awards, including three for him as Best Director. Born in Denver, Colorado, Fincher was interested in filmmaking at an early age.',
            birthyear: '1962'
        },
    genre:{
            name:'Drama',
            description: 'In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.'
          },
    imageUrl: 'https://www.imdb.com/title/tt0137523/mediaviewer/rm2110056193/?ref_=tt_ov_i'

  },
  {
    id: 3,
    title: "Howl's Moving Castle",
    year: '2004',
    director: 
        {
          name:'Hayao Miyazaki',
          bio: 'Hayao Miyazaki is a Japanese animator, filmmaker, and manga artist. A co-founder of Studio Ghibli, he has attained international acclaim as a masterful storyteller and creator of Japanese animated feature films, and is widely regarded as one of the most accomplished filmmakers in the history of animation.',
          birthyear:'1941'
        },
    genre:
    {
       name: 'Fantasy',
      description: '18-year-old Sophie Hatter is the eldest of three sisters living in Market Chipping, a town in the magical kingdom of Ingary, where fairytale tropes are accepted ways of life, including that the eldest of three will never be successful.'
    },
    imageUrl:'https://www.imdb.com/title/tt0347149/mediaviewer/rm2848505089/?ref_=tt_ov_i'
  },
  {
    id: 4,
    title: 'Leon',
    year: '1994',
    director: 
    {
      name:'Luc Besson',
      bio:'Besson was born in Paris, to parents who both worked as Club Med scuba-diving instructors. Influenced by this milieu, as a child, he planned to become a marine biologist. He spent much of his youth traveling with his parents to tourist resorts in Italy, Yugoslavia, and Greece. The family returned to France when he was 10. His parents divorced, and both remarried',
      birthyear: '1959'
    },
    genre:{
      name:'Drama',
      description: 'Léon is an Italian hitman (or "cleaner", as he refers to himself) in the Little Italy neighborhood of New York City working for a mafioso named "Old Tony". One day, Léon meets Mathilda Lando, a lonely twelve-year-old who lives with her dysfunctional family in an apartment down the hall from Léon, and has stopped attending class at her school for troubled girls.'
    },
    imageUrl: 'https://www.imdb.com/title/tt0110413/mediaviewer/rm727457281/?ref_=tt_ov_i'
  },
  {
    id: 5,
    title: 'The Matrix',
    year: '1999',
    director: 
    {
      name:'The Wachowskis',
      bio: 'Lana was born in Chicago in 1965; Lilly was born two and a half years later, in 1967. Their mother, Lynne (née Luckinbill), was a nurse and painter. Their father, Ron Wachowski, was a businessman of Polish descent. Their uncle is an actor and Primetime Emmy Award-winning producer, Laurence Luckinbill. Ron and Lynne died five weeks apart in the late 2010s.',
      birthyear: '1965, 1967'
    },
    genre:{
      name: 'Science fiction',
      description: 'At an abandoned hotel, a police squad corners Trinity who overpowers them with superhuman abilities. She flees, pursued by the police and a group of suited Agents capable of similar superhuman feats. She answers a ringing public telephone and vanishes.'
    },
    imageUrl: 'https://www.imdb.com/title/tt0133093/mediaviewer/rm525547776/?ref_=tt_ov_i'
  },
  {
    id: 6,
    title: 'Whiplash',
    year: '2013',
    director: 
    {
      name:'Damien Chazelle',
      bio: 'Chazelle was born in Providence, Rhode Island to a Catholic family. His French-American father, Bernard Chazelle, is the Eugene Higgins Professor of computer science at Princeton University, and was born in Clamart, France. His mother, Celia, is from an English-Canadian family based in Calgary, Alberta, and teaches medieval history at The College of New Jersey.',
      birthyear:'1985'
    },
    genre:{ 
      name: 'Drama',
      description: 'Andrew Neiman is a first-year student and jazz drummer at the prestigious Shaffer Conservatory in New York City, hoping one day to leave a legacy like that of his childhood idol, jazz drummer Buddy Rich.'
    },
    imageUrl: 'https://www.imdb.com/title/tt2582802/mediaviewer/rm1048725760/?ref_=tt_ov_i'
  },
  {
    id: 7,
    title: 'Pretty Woman',
    year: '1990',
    director: 
    {
      name:'Garry Marshall',
      bio: 'Garry Kent Marshall was born in the Bronx, New York City, on November 13, 1934, the only son and the eldest child of Anthony "Tony" Masciarelli (later Anthony Wallace Marshall; 1906-1999), a director of industrial films and producer, and Marjorie Irene (née Ward; 1908-1983), the owner and teacher in a tap dance school.',
      birthyear: '1934'
    },
    genre:{
      name:'Comedy',
      description: 'Edward Lewis, a powerful corporate raider hailing from New York, acquires and dismantles struggling companies, selling their assets for profit. He invites his girlfriend, Jessica, to join him on a business trip, but she grows weary of being at his constant beck and call and decides to end their relationship.'
    },
    imageUrl: 'https://www.imdb.com/title/tt0100405/mediaviewer/rm2508385280/?ref_=tt_ov_i'
  },
  {
    id: 8,
    title: 'Inside out',
    year: '2015',
    director:
    {
      name:'Pete Docter',
      bio: 'Pete Docter is an American animator, film director, screenwriter, producer, voice actor, and chief creative officer of Pixar.',
      birthyear: '1968'
    },
    genre:{
      name: 'Comedy',
      description: 'Within the mind of a young girl named Riley are the basic emotions that control her actions: Joy, Sadness, Fear, Disgust, and Anger. Her experiences become memories, stored as colored orbs, which are sent into long-term memory each night. '
    },
    imageUrl:'https://www.imdb.com/title/tt2096673/mediaviewer/rm3662344960/?ref_=tt_ov_i'
  },
  {
    id: 9,
    title: 'Avatar',
    year: '2009',
    director: 
    {
      name:'James Cameron',
      bio: "James Francis Cameron CC is a Canadian film director, screenwriter, and producer. A major figure in the post-New Hollywood era, Cameron is considered one of the industry's most innovative filmmakers, regularly pushing the boundaries of cinematic capability with his use of novel technologies.",
      birthyear:'1954'
    },
    genre:{
      name: 'Science fiction',
      description: 'In 2154, the natural resources of the Earth have been depleted. The Resources Development Administration (RDA) mines the valuable mineral unobtanium on Pandora, a moon in the Alpha Centauri star system.'
    },
    imageUrl: 'https://www.imdb.com/title/tt0499549/mediaviewer/rm2864126209/?ref_=tt_ov_i'
  },
  {
    id: 10,
    title: 'Fantastic Mr. Fox',
    year: '2009',
    director: 
    {
      name:'Wes Anderson',
      bio: 'Wesley Wales Anderson is an American filmmaker. His films are known for their eccentricity, unique visual and narrative styles, and frequent use of ensemble casts. They often contain themes of grief, loss of innocence, and dysfunctional families.',
      birthyear:'1969'
    },
    genre:{
      name: 'Comedy',
      description: "While raiding Berk's Squab Farm, Mr. Fox triggers a fox trap caging himself along with his wife Felicity. Felicity reveals her pregnancy to her husband and pleads with him to find a safer job if they escape, and he agrees."
    },
    imageUrl:'https://www.imdb.com/title/tt0432283/mediaviewer/rm329928960/?ref_=tt_ov_i'
  },
  {
    id: 11,
    title: 'Inception',
    year: '2010',
    director: 
    {
      name:'Christopher Nolan',
      bio: 'Christopher Edward Nolan is a British-American filmmaker. Known for his Hollywood blockbusters with complex storytelling, Nolan is considered a leading filmmaker of the 21st century. His films have grossed $5 billion worldwide.',
      birthyear: '1970'
    },
    genre:{
      name: 'Science fiction',
      description: "Cobb and Arthur are extractors who perform corporate espionage using experimental dream-sharing technology to infiltrate their targets' subconscious and extract information. Their latest target, Saito, is impressed with Cobb's ability to layer multiple dreams within each other."
    },
    imageUrl: 'https://www.imdb.com/title/tt1375666/mediaviewer/rm3426651392/?ref_=tt_ov_i'
  }
  ];
  
  app.get('/', (req, res) => {
    res.send('This is my practice for backend development');
});

//get request to get a list of data about all movies
app.get('/movies', (req, res) => {
    res.send('Succesful GET request returning data for all movies')
});

//get request to get info on movie using title
app.get('/movies/:title', (req, res) => {
    res.send('Succesful GET request returning data for selected movie')
});

//get request to get genre of a movie
app.get('/movies/genre/:genreName', (req, res) => {
    res.send('Succesful GET request returning genre')
});

//gets data about director
app.get('/movies/director/:directorName', (req, res) => {
    res.send('Succesful GET request returning director')
});

//POST for user registration
app.post('/users', (req, res) => {
    res.send('Succesful registration')
});

//POST for updating username 
app.post('/users/username', (req, res) => {
    res.send('Information was updated correctly')
});

//POST for adding a movie to favorites
app.post('/users/username/movies/MovieID', (req, res) => {
    res.send('Succesfully added movie to favorites')
});

//DELETE for removing movie from list of favorites
app.delete('/users/username/movies/MovieID', (req, res) => {
    res.send('Succesful removal of favorite movie')
});

//DELETE for unregistering
app.delete('/users/username', (req, res) => {
    res.send('Succesful deregistration')
});

app.use(express.static('public'));

app.use(morgan('common'));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(8080, () => console.log("listening on port 8080"))