const mongoose = require('mongoose');
const User = require('../Models/user')

const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema;

const productSchema = new Schema({
    Name:{
        type: String,
        required: true
    },
    MRP:{
        type: Number,
        required: true
    },
    Model_No:{
        type: String
    },
    Company:{
        type: String
    },
    Barcode:{
        type: String
    },
    Category:{
        type: String,
        required: true
    },
    img:{
        type: String,
        required: true
    }, 
    product_desc:{
        type: String
    },
    adminBoughtOn:{
        type:Date,
        required:true
    },
    agentNamePurchased:{
        type:String,
        default:""
    },
    agentPurchasedDate:{
        type:Date,
        default:""
    },
    agentSoldDate:{
        type:Date,
        default:""
    },
    
});



module.exports = mongoose.model('product', productSchema);