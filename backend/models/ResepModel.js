import { Sequelize } from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;

const Resep = db.define('list_resep', {
    nama_makanan: DataTypes.STRING,
    bahan: DataTypes.STRING,
    step_by_step: DataTypes.STRING
}, {
    freezeTableName: true
});

export default Resep; 

(async()=>{
    await db.sync();
})()