const express = require("express");
const router = express.Router();




router.get("/", (req, res) => {

    res.render("index");

});

router.post("/login",(req,res)=>{
    
    res.redirect("/login");

});

router.get("/login",(req,res)=>{
    res.render("login")
});

router.post("/register", (req, res) => {

    res.render("register");

});

module.exports = router;