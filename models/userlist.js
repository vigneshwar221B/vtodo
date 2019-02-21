const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({

    fname: {
        type: String,
        required: true,

    },

    lname: {
        type: String,
        required: true,

    },

    uname: {
        type: String,
        required: true,

    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

   clist:[]



});



 const User = mongoose.model("Item", userSchema);




module.exports = User;

