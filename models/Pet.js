const mongoose = require("mongoose");

const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type:{
      type : String,
      required :true
    },
    breed: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    weight: {
      type: String,
      required: true,
    },
    height: {
      type: String,
      required: true,
    },
    condition: {
      type: String,
      required: true,
    },
    owner: {
      type: [String]
    },
    image :{
      type : String
    }
  },
  { timestamps: true }
);

const Pet = mongoose.model('pet',petSchema)
module.exports = Pet
