const config = {}
module.exports = config

config.appPort = process.env.PORT || 5000
config.appBaseUrl = process.env.BASE_URL

config.steamApiKey = process.env.STEAM_APIKEY

config.db = {
	host: process.env.DB_HOST,
	name: process.env.DB_NAME,
	user: process.env.DB_USER,
	pass: process.env.DB_PASS
}

// paths to images by their ids
config.images = ['evIvV', 'bQm6N', 'Tp5sb', 'h18SD', 'MqY63', 'p3rrq', 'doQLu', 'Q0CbT', 'ZiV4s', 'xdOxz', 'jgdQ4', 'M6XKO', 'Jmuxf']
// house numbers by their ids
config.houses = [3, 7, 9, 13, 1, 7, 8, 10, 13, 1, 8, 3, 5, 6, 8, 10, 13, 15, 2, 6]
