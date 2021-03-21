const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    Agent_name:{
        type: String,
        required: true
    },
    Customer_name:{
        type: Number,
        required: true
    },
    Agent_phone:{
        type: Number,
    },
    Customer_phone:{
        type: Number,
    },
    Address:{
        type: String,
        required: true
    },
    Barcode:{
        type: Schema.Types.Barcode,
        ref: 'product',
        required: true
    },
    Product:{
        type: Schema.Types.ObjectId,
        ref: 'product',
        required: true
    },
    quantity:{
        type: Number,
        required:true

    }
    
});



module.exports = mongoose.model('order', orderSchema);