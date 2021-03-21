const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    Name: {
        type: String,
        required: true
    },
    image:{

    },
    description:{

    }
    
});


module.exports = mongoose.model('category', categorySchema);