// const express = require("express")
// const app = express()

const session = require("express-session")
const mongodbSession = require("connect-mongodb-session")(session);



// var store = new mongodbSession(
//     {
//       uri: "mongodb://localhost/session2",
//       collection: 'mySessions'
//     })

// app.use(session({
//     secret:"sampath kumar",
//     resave:false,
//     saveUninitialized:true,
//     store:store
// }))

// app.get("/",(req,res) => {
//     req.session.isAuth = true
//     console.log(req.session)
//     console.log(req.session.id)
// })

const isAuth = (req,res,next) =>{
    if(req.session.isAuth){
        next()
    }else{
        console.log("unauthorised")
        res.send("unauthorised")
    }
}

module.exports = isAuth