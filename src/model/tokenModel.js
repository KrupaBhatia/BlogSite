const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema( {
    token:{
      type:String,
      required:true,
      trim:true
    }
      
     })
  
  module.exports = mongoose.model('token', tokenSchema)