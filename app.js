const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const coordinators = require('./routes/coordinators')
const certificate = require('./routes/certificate')
const path = require('path');
const $ = require('jquery');

// mongoose.connect('mongodb://localhost/coordinators')
mongoose.connect(`mongodb+srv://msCoord:${process.env.msdb_password}@cluster0.xylfk.mongodb.net/certificate?retryWrites=true&w=majority`,{useNewUrlParser : true, useCreateIndex: true, useUnifiedTopology: true})
        .then(console.log('Connected to database ...'))
        .catch(err => console.log('Error occured in connecting database ...'));

app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/certificate', certificate);
app.use('/api/coordinators', coordinators);

app.set('view engine', 'ejs');



app.listen(process.env.PORT=3000, () => console.log('Server started @port 3000'))