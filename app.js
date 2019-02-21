const express = require("express");

const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require('passport');

//configuring passport

require('./config/passport')(passport);

app.use(express.static("public"));

app.use(bodyparser.urlencoded({
    extended: true
}));



app.set("view engine", "ejs");

const db = require('./config/dbkeys').mongoURI;

mongoose
    .connect(
        db, {
            useNewUrlParser: true
        }

    ).then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);

//passport configuration

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});



app.use(require("./routes/index.js"));
app.use(require("./routes/handler.js"));
app.use(require("./routes/listhandler.js"));

//404 page
app.use((req, res, next) => {

    res.status(404).render("e404page");

});

app.listen(8000, () => console.log("server started at port 8000"));