import express from "express";
import cors from 'cors'
import cookieParser from "cookie-parser";
import { dataLimit } from "./constants.js";

const app = express();

app.use(cors({
  origin: process.env.ALLOWED_ORIGINS,
  credentials: true
}))

app.use(express.json({
  limit: dataLimit
}))

app.use(express.urlencoded({
  limit:dataLimit,
  extended:true
}))



app.use(express.static('public'))

app.use(cookieParser())


// router imports 
import {healthCheckRouter} from "./routes/route.healthcheck.js"
import {userRouter} from "./routes/route.user.js";

// router middlewares
app.use('/api/v1/healthcheck', healthCheckRouter)
app.use('/api/v1/user', userRouter)

export default app
