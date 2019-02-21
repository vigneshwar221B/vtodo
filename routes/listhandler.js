const express = require("express");
const router = express.Router();
const Item = require("../models/list").item;
const List = require("../models/list").list;

const {ensureAuthenticated} = require('../config/auth');
let defaultItems = require("../models/list").defitems;

router.get("/users/dashboard",ensureAuthenticated, function (req, res) {

    Item.find({}, function (err, foundItems) {

        if (foundItems.length === 0) {
            Item.insertMany(defaultItems, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Successfully saved default items to DB.");
                }
            });

            res.redirect("/users/dashboard");
        } else {
            res.render("dashboard", {
                
                newListItems: foundItems
            });
        }
    });

});


router.post("/users/dashboard/add", ensureAuthenticated, function (req, res) {

    const itemName = req.body.newItem;

    const item = new Item({
        name: itemName
    });

    item.save();

    res.redirect("/users/dashboard");

    
});

router.post("/users/dashboard/delete", ensureAuthenticated, function (req, res) {
    console.log("delete method executed");
    const checkedItemId = req.body.checkbox;

    Item.findByIdAndRemove(checkedItemId, function (err) {
        if (!err) {
            console.log("Successfully deleted checked item.");
            res.redirect("/users/dashboard");
        }
    });

});

module.exports = router;