const config = {}
module.exports = config

config.appPort = process.env.PORT || 5000
config.appBaseUrl = process.env.BASE_URL

config.steamApiKey = process.env.STEAM_APIKEY
