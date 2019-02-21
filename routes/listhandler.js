const express = require("express");
const router = express.Router();
const Item = require("../models/userlist");


const {ensureAuthenticated} = require('../config/auth');


router.get("/users/dashboard", ensureAuthenticated, function (req, res) {

   

    Item.findOne({email: req.user.email}, function (err, foundItems) {

        
        res.render("dashboard", { 

            newListItems: foundItems.clist

        });
    });
        

});


router.post("/users/dashboard/add", ensureAuthenticated, function (req, res) {

    const itemName = req.body.newItem;
    
    
   
    Item.findOne({ email: req.user.email }, function (err, user) {
        
        user.clist.push(itemName)

        user.save(function (err) {
            if (err) {
                console.error('ERROR!');
            }
        });
    });
    res.redirect("/users/dashboard");
});

router.post("/users/dashboard/delete", ensureAuthenticated, function (req, res) {
    
    const checkedItem = req.body.checkbox;

   Item.findOne({
       email: req.user.email
   }, function (err, user) {

       var newList = user.clist.filter((e)=>{ return e!=checkedItem});
        user.clist = newList;
       user.save(function (err) {
           if (err) {
               console.error('ERROR!');
           }
       });
   });
res.redirect("/users/dashboard");
});


module.exports = router;