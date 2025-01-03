import express from "express"
import cors from "cors"
import ResepRoute from "./routes/ResepRoute.js"

const port = 3001
const app = express()

app.use(cors())
app.use(express.json())
app.use(ResepRoute)

app.listen(port, () => { console.log('Server Berjalan di port ', port) })