const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    category: {type:String,required:true},
    title: {type:String,required:true},
    s_no:{type:Number,required:true},
    image: {data:Buffer,contentType:String}
})

const product = mongoose.model("Products",productSchema)

module.exports = product