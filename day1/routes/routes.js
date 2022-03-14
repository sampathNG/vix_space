const express= require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const usr = require("../db/user")
const auth = require("../middleware/session")


router.post("/signup",async (req,res)=>{
    try{
        const pass = await bcrypt.hash(req.body.password, 10)
        const userss = new usr({
            _id:req.body._id,
            name:req.body.name,
            email:req.body.email,
            password:pass
        })
        const data = await usr.findOne({email:req.body.email})
        if(data){
            console.log("user already found login")
            res.send("user aleady found login again")
        }else{
        const datas = await usr.insertMany(userss)
        await usr.create(req.body)
        console.log("user added succesfully")
        res.send("user added succesfully")
        }

    }
    catch(err){
        res.send({err:err.message})
        console.log(err)
    }
})


router.post("/login",async (req,res)=>{
    try{
        const data = await usr.findOne({email:req.body.email})
        if(data){
        const comp = await bcrypt.compare(req.body.password, data.password);
            if(comp){
                req.session.isAuth = true;
                console.log("login succesfull")
                res.send("login succesfull")
            }else{
                console.log("wrong password entered")
                res.send("wrong password enetred")
            }
        }else{
            console.log("user with email not found")
            res.send("user with email not found")
        }
    }
    catch(err){
        res.send({err:err.message})
        console.log(err)
    }
})


router.get("/get",auth,async(req,res)=>{
    try{
        const ad = await usr.find()
        res.send(ad)
        console.log(ad)
    }
    catch(err){
        res.send({err:err.message})
        console.log(err)
    }
})

// updating user password

router.patch("/patch",auth,async(req,res)=>{
    try{
        const data = await usr.findOneAndUpdate({email:req.body.email})
        data.password = req.body.password
        const a1 = await data.save()
        res.send('data have updated successfully. ')
        console.log("data updated succesfully")
    }
    catch(err){
        res.send({err:err.message})
        console.log(err)
    }
})






module.exports = router