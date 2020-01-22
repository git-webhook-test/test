const pgsql = require('pg')


async function query(sql, params) {
    const client = new pgsql.Client({
        host: 'localhost',
        port: 5432,
        user: 'neo',
        password: 'abcd1234',
        database: 'neo'
    })
    await client.connect()
    const { rows } = await client.query(sql, params)
    await client.end()
    return rows
}

let DB = function () {

}

DB.prototype = {
    async add_one({ type, name, token, url }) {
        return await query('INSERT INTO webhooks(type, name, token, url)  VALUES($1::varchar, $2::varchar, $3::varchar, $4::varchar)', [type, name, token, url])
    },
    async get_one(name) {
        let t = await query('SELECT * FROM webhooks WHERE name=$1', [name])
    }
}

module.exports = new DB()