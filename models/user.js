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

        date: {
            type: Date,
            default: Date.now
        }

})

const User = new mongoose.model("user",userSchema);



module.exports = User;