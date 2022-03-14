const mongoose = require("mongoose")

const uri = "mongodb://localhost/session2"

const conn = mongoose.connect(uri,{useNewUrlParser: true,useUnifiedTopology: true},(err)=>{
    console.log("connected to mongodb")
})

module.exports = conn