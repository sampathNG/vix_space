const mongoose = require("mongoose")

const citySchema = new mongoose.Schema({
    city_name: {type:String,required:true},
    latitude: {type:Number,required:true},
    longitude: {type:Number,required:true},
    s_no:{type:Number,required:true},
    points: {type:Object}
})

const city = mongoose.model("citiess",citySchema)

module.exports = city