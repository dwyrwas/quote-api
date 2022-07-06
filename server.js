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
})

app.listen(PORT);