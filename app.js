const express = require('express'),
    passport = require('passport'),
    session = require('express-session'),
    config = require('./config'),
    path = require('path'),
    bodyParser = require('body-parser'),
    game = require('./game')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(session({
    secret: 'halloween2020octo :)',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {

    let user = req.user
    if (!user)
        return res.render('index', { name: false, desc: false, imgs: false })

    game.getEventData(user.steamid).then(function(data) {

        if (typeof data === 'string')
            return res.render('index', { name: user.name, desc: data, imgs: false })

        let arr = []
        data.forEach(img => arr.push(config.images[img[2] - 1]))
        res.render('index', { name: user.name, desc: false, imgs: arr })

    }).catch(function(err) {
        res.render('index', { name: user.name, desc: '' + err, imgs: false })
    })

})
app.use('/auth', require('./auth'))

app.post('/submit', (req, res) => {

    let user = req.user
    if (!user)
        return res.sendStatus(401)

    let input = req.body.data
    if (typeof input !== 'string')
        return res.sendStatus(400)

    game.getEventData(user.steamid).then(function(data) {

        if (typeof data === 'string')
            return res.send(JSON.stringify({ msg: data }))

        let arr = []
        data.forEach(img => arr.push(config.houses[img[0] - 1]))
        if (arr.join(',') === input)
            game.completeEvent(user.steamid).then(() => res.send('ok'))
        else res.send(JSON.stringify({ msg: 'Что-то не сходится... Найдёшь в себе силы проверить всё ещё раз?' }))

    }).catch(function(err) {
        console.error(err)
        res.sendStatus(500)
    })

})

app.use('/assets', express.static(path.join(__dirname, 'public')))
app.listen(config.appPort, () => console.log(`Listening on ${ config.appPort }`));
