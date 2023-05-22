const author = require("../model/authorModel");
const token = require("../model/tokenModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("../../src/.env");

require('dotenv').config()

// ========================================[create-author]====================================================================

const authors= async function (req, res) {
  try{
     let data=req.body
  
    if (Object.keys(data).length === 0) return res.status(400).send({ msg: "please provide sufficient data " })

    if(!data.name){
     return res.status(400).send({status:false,message:"author name is required"})
    }

    if(!data.userName){
      return res.status(400).send({status:false,message:"author username is required"})
    }
    // if(!/^[a-zA-Z]{2,}$/.test(data.userName)){
    //    return res.status(400).send({status:false,message:"name is not in right format "})
    // }
    if(!data.email){
      return res.status(400).send({status:false,message:" email is required"})
    }
    if (!/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(data.email)) {
      return res.status(400).send({status: false,message: "invalid emailId"});
    }
    let  email = await author.findOne({email:data.email})
    if (email) {  
      return res.status(400).send({status: false,message: "email already exists"});
    }

    if(!data.password){
        return res.status(400).send({status:false,message:" password is required"})
    }
 
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(data.password , salt);
    req.body.password = hashedPass;
    // if(!/^[a-zA-Z0-9'@&#.\s]{8,15}$/.test(data.password)) {
    //   return res.status(400).send({status: false,message: "password dosent match with format"});
    // }

       let authorCreated =await author.create(req.body)
       return res.status(201).send({status:true,data:authorCreated, msg:"created"}) 

    }
    catch (err) {
      res.status(500).send({error: err.message})
    }
  };


// =======================================authorLogin=============================================================

const authorLogin = async function (req, res) {
    try {
      const { email, password } = req.body
      if(!email){
        return res.status(400).send({status:false,message:"plz provide email "})
      }
      if(!password){
      return res.status(400).send({status:false,message:"plz provide password "})
      }

      let authorData = await author.findOne({ email: email });
      if (!authorData) {
        return res.status(404).send({ status: false, messege: "no data found " });
      }
    
      

  
      let checkPassword = await bcrypt.compare(password, authorData.password); //decrypting hashed pass to compare/verify with original one

      if(checkPassword){
        let accessToken = jwt.sign(
          {
            author_Id: authorData._id.toString(), //payload
            expiredate: "15m"
          },
          '841d4ea2a3f8bb8629d1acc29079610082ec86a388b97882bf8348c531d4edaaf89773f24a245e99d4b5139840fa21ac2f016b3c24bad67dfd6741528d3f103f'  // SECRET KEY
        );
        console.log(accessToken);
        let refreshToken = jwt.sign(
          {
            author_Id: authorData._id.toString(), //payload
          },
          'bb0660664df1f0c90a02a72e59d0f388e48adcdbef166027e03339c8e6fc0d693063210b3a22048e0ee021f98ffc41e78b953f0fcdcffb92570ce1650c5f2df8' // SECRET KEY
        );
        console.log(refreshToken);


        const newToken = new token({token : refreshToken}) ;
        await newToken.save();
        res.status(201).send({ status: true, accessToken : accessToken, refreshToken : refreshToken, email : email , msg:"login successfull" });
      }else{
        return res.status(400).send({ status: false, messege: "Login failed!! password is incorrect." });
      }
          
    
     } catch (error) {
      res.status(500).send({ status: false, msg: error.message });
     }
    }


module.exports.authors = authors
module.exports.authorLogin = authorLogin