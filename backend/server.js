import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import mosquerouter from './Routers/mosque.js'



const app = express()

app.use(express.json());

app.use(cors());


app.use('/api/mosque',mosquerouter)



main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');

 console.log("mongodb connected")
}

app.listen(3000,()=>{
    console.log("port 3000 connected")
})