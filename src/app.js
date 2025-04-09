import express from "express";
import cors from 'cors'
import cookieParser from "cookie-parser";
import { dataLimit } from "./constants.js";

const app = express();

app.use(cors({
  origin: process.env.ALLOWED_ORIGINS
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

export default app
