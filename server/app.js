const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

mongoose.connect('mongodb://ds042128.mlab.com:42128/books', {user: 'KenelyOliveira', pass: 'BabaYaga32/*/', useNewUrlParser: true });
mongoose.connection.once('open', () => { console.log('Conectado à base de dados'); });

app.use(cors());
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(4000, () => { console.log('Conectado à porta 4000');  });



