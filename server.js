const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res, next) => {
    const randomQuote = { quote: getRandomElement(quotes)};
    if(randomQuote){
        res.status(200).send(randomQuote);
    } else {
        res.status(404).send();
    }
});

app.get('/api/quotes', (req, res, next) => {
    const reqPerson = req.query.person;
    const quotesByPerson = quotes.filter(quote => quote.person == reqPerson);
    if(reqPerson){
        res.send({quotes:quotesByPerson});
    } else {
        res.send({quotes:quotes});
    }
});

app.post('/api/quotes', (req, res) => {
    const newQuote = { quote:{
        quote: req.query.quote,
        person: req.query.person
    }}
    if (req.query.quote && req.query.person){
        quotes.push(newQuote.quote);
        res.send(newQuote);
    } else {
        res.status(400).send();
    }
})

app.listen(PORT);