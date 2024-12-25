import express from 'express'
import { admin, adminlogin, adminregister } from '../controllers/user.js'

const route = express.Router()

route.post('/register',adminregister)
route.post('/login',adminlogin)


export default route