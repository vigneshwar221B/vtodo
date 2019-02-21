const express = require("express");
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');

router.get("/", (req, res) => res.render("home"));
router.get("/login",(req,res) => res.render("login"));

router.get("/register", (req, res) => res.render("register",{}));
router.get('/dashboard', ensureAuthenticated, (req, res) =>
    res.render('dashboard')
);

module.exports = router;