const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require('bcryptjs');
const passport = require("passport");

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
                                
                                res.redirect("/login");
                            })
                            .catch(err => console.log("save error: "+err));
                    });
                });
            }
        });
    }

});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/users/dashboard',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/login');
});


module.exports = router;