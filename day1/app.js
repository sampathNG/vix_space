const express = require("express")
const bodyParser = require("body-parser")
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
const session = require("express-session")
const mongodbSession = require("connect-mongodb-session")(session);
const db = require("./db/config")


var store = new mongodbSession(
    {
      uri: "mongodb://localhost/session2",
      collection: 'mySessions'
    })

app.use(session({
    secret:"sampath kumar",
    resave:false,
    saveUninitialized:true,
    store:store
}))


app.get("/",(req,res) => {
    req.session.isAuth = true
    console.log(req.session)
    console.log(req.session.id)
})


const r = require("./routes/routes")
app.use("/",r)
app.listen(4000,console.log("runnning on port 4000"))