const mongoose = require("mongoose")

const url = "mongodb://localhost/vixspace2"
module.exports = mongoose.connect(url,({useNewUrlParser:true}),err=>{
    console.log("connected to mognodb databse")
})
