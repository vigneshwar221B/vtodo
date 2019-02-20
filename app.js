const express = require("express");

const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const session = require("express-session");
const cookieparser = require("cookie-parser");
const flash = require("connect-flash");
const passport = require("passport");



//app.use(cookieparser());
app.use(bodyparser.urlencoded({extended: true}));
// app.use(session({secret:'Alohomora', resave:true, saveUninitialized:true}));
// app.use(flash());

app.set("view engine","ejs");

const db = require('./config/dbkeys').mongoURI;

mongoose
    .connect(
        db, {
            useNewUrlParser: true
        }

    ).then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.use("/",require("./routes/index.js"));



app.listen(8000,()=>{

    console.log("server started at port 8000");

});