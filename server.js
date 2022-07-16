const express = require('express');
const morgan = require('morgan');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

// Your API should have a GET /api/quotes/random route. This route should send back a random quote from the quotes data.
app.get('/api/quotes/random', (req, res) => {
  res.send({
    quote: getRandomElement(quotes)
  });
});

// Your API should have a GET /api/quotes route. This route should return all quotes from the data if the request has no query params. If there is a query string with a person attribute, the route should return all quotes said by the same person. For instance, the data set has multiple quotes for Grace Hopper, so GET /api/quotes?person=Grace Hopper should return an array of only those quotes. If there are no quotes for the requested person, send back an empty array.
app.get('/api/quotes', (req, res) => {
  if (req.query.person !== undefined) {
    const quotesByPerson = quotes.filter(quote => quote.person === req.query.person);
    res.send({
      quotes: quotesByPerson
    });
  } else {
    res.send({
      quotes: quotes
    });
  }
});

// Your API should have a POST /api/quotes route for adding new quotes to the data. New quotes will be passed in a query string with two properties: quote with the quote text itself, and person with the person who is credited with saying the quote. This route should verify that both properties exist in the request query string and send a 400 response if it does not. If all is well, this route handler should add the new quote object to the data array and send back a response
app.post('/api/quotes', (req, res) => {
  const newQuote = {
    quote: req.query.quote,
    person: req.query.person
  };
  if (newQuote.quote && newQuote.person) {
    quotes.push(newQuote);
    res.send({ quote: newQuote });
  } else {
    res.status(400).send();
  }
});


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
