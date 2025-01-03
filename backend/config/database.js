import { Sequelize } from "sequelize";

const db = new Sequelize('resep_makanan', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

export default db;