const mysql = require('mysql2'),
    config = require('./config'),
    EventEmitter = require('events')

const db = new EventEmitter()
let instance

db.migrate = async function() {
    console.log('Running DB migration...')

    await instance.execute(`
        CREATE TABLE IF NOT EXISTS halloween_images (
            steamid64 VARCHAR(50) NOT NULL,
            data TINYTEXT NOT NULL,
            claimed TINYINT NOT NULL DEFAULT 0,
                PRIMARY KEY (steamid64)
        )
    `)

    console.log('Done migrating DB.')
}

db.reconnect = function() {
    console.log('Reconnecting to DB...')
    instance = mysql.createConnection({
        host: config.db.host,
        database: config.db.name,
        user: config.db.user,
        password: config.db.pass,
    }).promise()

    instance.connect()
        .then(() => {
            console.log('Connected to DB.')
            db.migrate()
                .then(() => db.emit('connect'))
        })
        .catch(() => setTimeout(db.reconnect, 10000))

    const reconnectOn = { ECONNREFUSED: true, PROTOCOL_CONNECTION_LOST: true }
    instance.on('error', function onError(err) {
        if (reconnectOn[err.code]) {
            db.reconnect()
        } else {
            throw err
        }
    })
}
db.reconnect()

db.execute = async function(query, params) {
    return instance.execute(query, params)
}

module.exports = db
