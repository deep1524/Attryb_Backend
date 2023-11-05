const { Schema, model } = require("mongoose");

const carSchema = new Schema(
  {
    image: String,
    brand: String,
    model: String,
    price: Number,
    maxSpeed: Number,
    mileage:Number,
    power:Number,
    colors: String,
  },
  {
    versionKey: false,
  }
);

const carModel = model("Car", carSchema);

module.exports = carModel;