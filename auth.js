const router = require('express').Router(),
	passport = require('passport'),
	config = require('config');

const SteamStrategy = require('passport-steam').Strategy

passport.use(new SteamStrategy({
	returnURL: config.get('url') + '/auth/return',
	realm: config.get('url'),
	apiKey: config.get('steam.key')
}, (_identifier, profile, done) => {
	done(null, {
		name: profile._json.personaname,
		steamid: profile._json.steamid
	})
}))

passport.deserializeUser((obj, done) => done(null, obj))
passport.serializeUser((data, done) => done(null, data))

router.get('/',
	passport.authenticate('steam', { failureRedirect: '/' }),
	(_req, res) => res.redirect(config.get('url'))
)

router.get('/return',
	passport.authenticate('steam', { failureRedirect: '/' }),
	(req, res) => {
		const to = req.session.returnTo || config.get('url')
		delete req.session.returnTo
		res.redirect(to)
})

router.get('/logout', (req, res) => {
	req.logout()
	res.redirect(config.get('url'))
})

module.exports = router