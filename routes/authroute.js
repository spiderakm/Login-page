const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt")
const createDB = require("../config/db")
const User = require("../models/userModels");
const {
  validateName,
  validateEmail,
  validatePassword
} = require('../utils/validators.js')
createDB.sync().then(() => {
  console.log("running db")
})
let users = {
  
}
//signup
router.post("/signup", async (req,res) => {
  try{
    const {name,email,password} = req.body;
    console.log(name,email,password)
    const userExist = await User.findOne({
      where: {
        email
      }
    });

    if(userExist){
      res.send("user exist")
    }
    if(!validateName(name)){
      res.send("Invalid name plese enter a valid name")
    }

    if(!validateEmail(email)){
      res.send("Invalid email plese enter a valid name")
    }

    if(!validatePassword(password)){
      res.send("Invalid Password plese enter a valid name")
    }
    const Epassword = await bcrypt.hash(password, 10)
    const saveToDB = {
      name,email,Epassword
    }
    const createdUser = await User.create(saveToDB)
    return res.status(201).send(createdUser)
    
  } catch (err) {
    console.log(err)
    return res.status(500).send(err.message)
  }
})

//signin
router.post("/signin", async (req,res) => {
  try{
    const {email,password} = req.body;
    const userExist = users.hasOwnProperty(email);
    if(!userExist){
      res.send("user not exist")
    }

    const MatchPass = await bcrypt.compare(password,users[email].password)
    if(!MatchPass){
      send("wrong password")
    }

    res.send("successfully login")
  } catch(e){
    res.send("Wrong Password")
  }
})
module.exports = router
