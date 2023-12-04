const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose")
const axios = require("axios");
const connectDb = require("./orderdb")
const app = express();

app.use(bodyparser.json());

connectDb();

require("./ordermodel")

const Order = mongoose.model("Orderm")

app.get("/order", (req,res) => {
    Order.find().then((books) => {
        res.json(books)
    }).catch((err) => {
        if(err){
            throw err;
        }
    })
})

app.get("/order/:id", (req,res) => {
    Order.findById(req.params.id).then((order) => {
        if(order){
            axios.get("http://localhost:7000/customer/" + order.CustomerID).then((response) => {
                var orderObject = {customerName: response.data.name, bookTitle: ''}
                axios.get("http://localhost:5000/book/" + order.BookID).then((response) => {
                    orderObject.bookTitle = response.data.title
                    res.json(orderObject)
                })
            })
        }else{
            res.send("Invalid order")
        }
    })
})

app.post("/order", async  (req,res) => {
    var newOrder = {
        CustomerID: new mongoose.Types.ObjectId(req.body.CustomerID),
        BookID: new mongoose.Types.ObjectId(req.body.BookID),
        initialDate: req.body.initialDate,
        deliveryDate: req.body.deliveryDate
    }        
    var order = new Order(newOrder);
    await order.save();
    console.log("Order created");
    res.send("Order created");
})

app.get('/', (req,res) => {
    res.send("working")
})

app.listen(6000, (req,res) => {
    console.log("working")
})