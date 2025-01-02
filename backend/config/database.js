const db = require('mysql')
const conn = db.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'resep_makanan',
    timezone: '+07:00'
})

conn.getConnection(err => {
    if (err) throw err
    console.log("Berhasil Terhubung ke Database")
})

module.exports = conn