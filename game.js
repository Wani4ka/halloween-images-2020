const db = require('./db')

const game = {}

game.getEventData = async function(sid64) {
    const [rows] = await db.execute(`SELECT * FROM halloween_images WHERE steamid64=?`, [sid64])
    if (!rows[0])
        return 'Ночами тёмными по улицам бродят они. На востоке города, за рамами в окнах таясь, то скребутся, то воют. Дома, приютившие их, должны быть непременно отмечены. Взор навостри, вокруг осмотрись, будь осторожен, нечисть ища.'
    else if (rows[0].claimed !== 0)
        return 'Хорошая работа! Другой пока что нет.'
    else return JSON.parse(rows[0].data)
}

game.completeEvent = async function(sid64) {
    await db.execute(`UPDATE halloween_images SET claimed=1 WHERE steamid64=?`, [sid64])
    await db.execute(`INSERT INTO octolib_queue(serverID, event, data) VALUES ('dbg', 'halloween.done', ?)`, [JSON.stringify({user: sid64})])
}

module.exports = game