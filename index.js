import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDb } from './src/database/db.js'
import router from './src/routes/contact.routes.js'
import nodemailer from "nodemailer"
dotenv.config()
const port = process.env.PORT || 5000
const app = express()
app.use(express.json())
app.use(cors({
    // origin: 'http://localhost:5173', 
    origin: 'https://portfolio-frontend-vdfv.onrender.com', 
}
))
app.get('/',(req,res)=>{
    res.send("Hello World")
})


//Db and Server connection
connectDb()
.then(()=>{
    app.listen(port,()=>{
            console.log(`Server running at http://localhost:${port} `)
    })
})
.catch((error)=>{
    console.log(`Server Error ${error}`)
})
app.use('/api',router)
