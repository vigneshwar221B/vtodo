const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require('bcryptjs');


router.post("/register", (req, res) => {

    let errors = [];
    console.log(req.body);
    const {
        uname,
        fname,
        lname,
        email,
        password
    } = req.body;

    console.log("uname:"+ uname);

    if (password.length < 6) {
        errors.push({
            msg: 'Password must be at least 6 characters'
        });
    }

    if (errors.length > 0) {
        res.render('register', {
            errors
        });
    } else {

        User.findOne({
            email: email
        }).then((resUser) => {
            if (resUser) {
                console.log("findOne gets executed!");
                errors.push({
                    msg: "Email has already registered!"
                });
                resUser.render("register", {
                    errors
                });
            } else {
                const newUser = new User({
                    fname: fname,
                    lname: lname,
                    uname: uname,
                    email: email,
                    password: password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save().then(user => {
                            console.log(user);
                                req.flash(
                                    'success_msg',
                                    'You are now registered and can log in'
                                );
                                
                                res.redirect("/");
                            })
                            .catch(err => console.log("save error: "+err));
                    });
                });
            }
        });
    }

});



module.exports = router;