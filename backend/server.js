import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import mosquerouter from './Routers/mosque.js'
import userroute from './Routers/Userroute.js'



const app = express()

app.use(express.json());




const allowedOrigins = [
  'http://localhost:5173',           
  'https://ar-shafin-client.onrender.com',
  'http://localhost:8081',
  "https://nsmjcs4-vigneshwaran1-8081.exp.direct"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
  allowedHeaders: ['Content-Type', 'admin-id','Authorization'], // Specify allowed headers
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