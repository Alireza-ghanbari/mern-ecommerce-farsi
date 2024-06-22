import express from "express"
import morgan from "morgan"
import cors from "cors"
import cookieParser from "cookie-parser"

import authRouter from "./routes/auth.route.js"
import userRouter from "./routes/user.route.js"

const app = express()

app.use(morgan("dev"))
app.use(express.json())
app.use(cookieParser())
app.use(cors())


//Routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/user', userRouter)

export default app