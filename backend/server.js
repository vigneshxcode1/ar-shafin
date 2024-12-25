import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import mosquerouter from './Routers/mosque.js'
import userroute from './Routers/Userroute.js'



const app = express()

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'admin-id','Content-Type,Authorization']
  
}));


app.use('/api/mosque',mosquerouter)

app.use("/api/mosque",userroute)

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://vicky:test123@cluster0.epdrsry.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

 console.log("mongodb connected")
}

app.listen(3000,()=>{
    console.log("port 3000 connected")
})