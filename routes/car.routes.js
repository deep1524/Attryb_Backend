const express = require("express");
const carModel = require("../models/car.model");

const app = express.Router();
app.get("/",async (req, res) => {

  const query = req.query;

  
  try {
    if (query.sort === "Low to High") {
      const data = await carModel.find().sort({ price: 1 });
      res.send(data);
    } else if (query.sort === "High to Low") {
      const data = await carModel.find().sort({ price: -1 });
      res.send(data);
    } else {
      const data = await carModel.find(query);
      res.send(data);
    }
  } catch (err) {
    console.log(err);
  }
  });
 

app.post("/add", async (req, res) => {
    const payload = req.body;
    // console.log(payload)
    try {
      let newProduct = new carModel(payload);
      await newProduct.save()
      res.send(newProduct);
    } catch (e) {
      res.send(e.message);
    }
  });

  app.patch("/update/:id", async (req, res) => {
    const payload = req.body;
    let id = req.params.id;
    try {
      await carModel.findByIdAndUpdate({ _id: id }, payload);
      res.send("Updated ");
    } catch (e) {
      res.send(e.message);
    }
  });
  
  
  
  
  app.delete("/delete/:id", async (req, res) => {
    let id = req.params.id;
    try {
      await carModel.findByIdAndDelete({ _id: id });
      res.send("Deleted ");
    } catch (e) {
      res.send(e.message);
    }
  });

  module.exports = app;