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
config.images = ['zPWQ1', 'iD1fC', 'lWCK2', 'PE0iw', 'ppqC0', 'N4q89', 'dRazV', 'qdIMZ']
// house numbers by their ids
config.houses = [3, 9, 13, 1, 3, 4, 8, 9, 10, 13, 1, 8, 3, 5, 6, 8, 10, 13, 15, 2]
