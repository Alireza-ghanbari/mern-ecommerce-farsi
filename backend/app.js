import express from "express"
import morgan from "morgan"
import cors from "cors"
import cookieParser from "cookie-parser"

import authRouter from "./routes/auth.route.js"

const app = express()
app.use(morgan("dev"))
app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.get("/", (req, res)=>{
    res.send("server is ready")
})

//Routes
app.use('/api/v1/auth', authRouter)

export default app