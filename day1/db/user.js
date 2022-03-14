const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    _id:{type:Number,required:true},
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true}
})

const model = mongoose.model("users",userSchema)
module.exports = model
    