const mongoose = require('mongoose');

// const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const registerModel = new mongoose.Schema({
  Name:{
    type:String,
    required:true
  },
  Email:{
    type:String,
    unique:true,
    required:true
  },
  Phone:{
    type:Number,
    min:10,
    max:10,
    required:true,
  },
  District:{
    type:String,
    required:true
  },
  State:{
    type:String,
    required:true
  },
  Address:{
    type:String,
    required:true
  },
  Pincode:{
    type:Number,
    min:6,
    max:6,
    required:true
  },
  Password:{
    type:String,
    required:true
  }
}, {timestamps:true});


const User= mongoose.model('Users', registerModel);
module.exports = User;