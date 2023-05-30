const express = require('express'),
  morgan = require('morgan');

const app = express();
 
//data about my top 10 movies
let topFilms = [
  {
    title: 'Forrest Gump',
    year: '1994'
  },
  {
    title: 'Flight Club',
    year: '1999'
  },
  {
    title: "Howl's Moving Castle",
    year: '2004'
  },
  {
    title: 'Inception',
    year: '2010'
  },
  {
    title: 'Leon',
    year: '1994'
  },
  {
    title: 'Mononoke-Hime',
    year: '1997'
  },
  {
    title: 'The Matrix',
    year: '1999'
  },
  {
    title: 'Whiplash',
    year: '2013'
  },
  {
    title: 'Pretty Woman',
    year: '1990'
  },
  {
    title: 'Inside out',
    year: '2015'
  },
  {
    title: 'Avatar',
    year: '2009'
  },
  {
    title: 'Fantastic Mr. Fox',
    year: '2009'
  }
  ];

  
app.use(morgan('common'));

app.get('/', (req, res) => {
  res.send('Welcome to my app!');
});

app.get('/movies', (req, res) => {
  res.json(topFilms);
});

app.use(express.static('public'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
  });

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});