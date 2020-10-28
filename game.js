const mysql = require('mysql2'),
	config = require('config')

let db

async function createTable() {
	await db.execute(`
		CREATE TABLE IF NOT EXISTS halloween_images (
			steamid64 VARCHAR(50) NOT NULL,
			data TINYTEXT NOT NULL,
			claimed TINYINT NOT NULL DEFAULT 0,
				PRIMARY KEY (steamid64)
		)
	`)
}

const dbConfig = config.get('db')
function reconnect() {
	db = mysql.createConnection({
		host: dbConfig.host,
		database: dbConfig.name,
		user: dbConfig.user,
		password: dbConfig.pass,
	}).promise()

	db.connect().then(createTable).then(() => {
		db.emit('connect')
		console.log('Connected to database')
	}).catch(() => setTimeout(reconnect, 10000))

	db.on('error', function onError(err) {
		if (err.code === 'ECONNREFUSED' || err.code === 'PROTOCOL_CONNECTION_LOST')
			reconnect()
		else throw err
	})
}
reconnect()

const game = {}

game.getEventData = async function(sid64) {
	const [rows] = await db.execute(`SELECT * FROM halloween_images WHERE steamid64=?`, [sid64])
	if (!rows[0])
		return false
	else if (rows[0].claimed !== 0)
		return 'Хорошая работа! Другой пока что нет.'
	else return JSON.parse(rows[0].data)
}

game.completeEvent = async function(sid64) {
	await db.execute(`UPDATE halloween_images SET claimed=1 WHERE steamid64=?`, [sid64])
	await db.execute(`INSERT INTO octolib_queue(serverID, event, data) VALUES ('dbg', 'halloween.done', ?)`, [JSON.stringify({user: sid64})])
}

module.exports = game