const express = require('express'),
    passport = require('passport'),
    session = require('express-session'),
    config = require('./config'),
    path = require('path')

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
    secret: 'halloween2020octo :)',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => res.render('index', { user: req.user }))
app.use('/auth', require('./auth'));

app.use('/assets', express.static(path.join(__dirname, 'public')))
app.listen(config.appPort, () => console.log(`Listening on ${ config.appPort }`));
