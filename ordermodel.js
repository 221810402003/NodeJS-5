const mongoose = require("mongoose");

var orderSchema = new mongoose.Schema({
    CustomerID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    BookID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    initialDate: {
        type: Date,
        required: true
    },
    deliveryDate: {
        type: Date,
        required: true
    }
});

mongoose.model("Orderm", orderSchema);
