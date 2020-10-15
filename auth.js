const router = require('express').Router(),
    passport = require('passport'),
    config = require('./config');

const SteamStrategy = require('passport-steam').Strategy

passport.use(new SteamStrategy({
    returnURL: config.appBaseUrl + 'auth/return',
    realm: config.appBaseUrl,
    apiKey: config.steamApiKey
}, (identifier, profile, done) => {
    done(null, {
        name: profile._json.personaname,
        steamid: profile._json.steamid
    })
}))

passport.deserializeUser((obj, done) => done(null, obj))
passport.serializeUser((data, done) => done(null, data))

router.get('/',
    passport.authenticate('steam', { failureRedirect: '/' }),
    (req, res) => res.redirect(config.appBaseUrl)
)

router.get('/return',
    passport.authenticate('steam', { failureRedirect: '/' }),
    (req, res) => {
        const to = req.session.returnTo || config.appBaseUrl
        delete req.session.returnTo
        res.redirect(to)
})

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect(config.appBaseUrl)
})

module.exports = router