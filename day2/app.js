const express = require("express")
const bodyParser = require("body-parser")
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
const DBconnect = require("./database/config.js")
const ru = require("./routes/routes.js")
app.use("/",ru)




app.listen(5000,console.log("running on port 1500"))