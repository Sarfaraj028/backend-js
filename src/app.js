import 'dotenv/config'
import express, { json } from "express"
import cookieParser from "cookie-parser"
import cors from 'cors'

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "10kb"}))
app.use(express.urlencoded({extended: true, limit: "10kb"}))
app.use(express.static("public")) // to serve statis files like pdf, images, videos, css
app.use(cookieParser()) //to read cookies from users browser for crud opreration


//routes import
import userRouter from './routes/user.routes.js'
//routes declaration
app.use("/api/v1/users", userRouter)


export {app}