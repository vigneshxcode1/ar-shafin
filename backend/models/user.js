import mongoose from 'mongoose'


const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})


const adminauth = mongoose.model('admin-auth',userSchema);

export default adminauth;