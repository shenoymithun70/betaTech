const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema;

const adminSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    userType:{
        type: String,
        required: true
    }
});

adminSchema.pre('save',  async function(next) {
    console.log("Aya to hai")
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12);
    }
    next();
})

module.exports = mongoose.model('admin', adminSchema);