const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const registerModel = new Schema({
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
    required:true
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
    required:true
  },
  Password:{
    type:String,
    required:true
  }
}, {timestamps:true});

module.exports= mongoose.model('Users', registerModel)