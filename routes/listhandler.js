const express = require("express");
const router = express.Router();
const Item = require("../models/list").item;
const List = require("../models/list").list;
const {ensureAuthenticated} = require('../config/auth');

router.get("/users/dashboard", ensureAuthenticated, function (req, res) {

    Item.find({}, function (err, foundItems) {

        if (foundItems.length === 0) {
            Item.insertMany(defaultItems, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Successfully savevd default items to DB.");
                }
            });
            res.redirect("/users/dashboard");
        } else {
            res.render("list", {
                listTitle: "Today",
                newListItems: foundItems
            });
        }
    });

});

router.get("/:customListName", ensureAuthenticated, function (req, res) {
    const customListName = _.capitalize(req.params.customListName);

    List.findOne({
        name: customListName
    }, function (err, foundList) {
        if (!err) {
            if (!foundList) {
                //Create a new list
                const list = new List({
                    name: customListName,
                    items: defaultItems
                });
                list.save();
                res.redirect("/users/dashboard/" + customListName);
            } else {
                //Show an existing list

                res.render("dashboard", {
                    listTitle: foundList.name,
                    newListItems: foundList.items
                });
            }
        }
    });

});

router.post("/users/dashboard", ensureAuthenticated, function (req, res) {

    const itemName = req.body.newItem;
    const listName = req.body.list;

    const item = new Item({
        name: itemName
    });

    if (listName === "Today") {
        item.save();
        res.redirect("/users/dashboard");
    } else {
        List.findOne({
            name: listName
        }, function (err, foundList) {
            foundList.items.push(item);
            foundList.save();
            res.redirect("/users/dashboard/");
        });
    }
});

router.post("users/dashboard/delete", ensureAuthenticated, function (req, res) {
    const checkedItemId = req.body.checkbox;
    const listName = req.body.listName;

    if (listName === "Today") {
        Item.findByIdAndRemove(checkedItemId, function (err) {
            if (!err) {
                console.log("Successfully deleted checked item.");
                res.redirect("/users/dashboard");
            }
        });
    } else {
        List.findOneAndUpdate({
            name: listName
        }, {
            $pull: {
                items: {
                    _id: checkedItemId
                }
            }
        }, function (err, foundList) {
            if (!err) {
                res.redirect("/users/dashboard/" + listName);
            }
        });
    }


});

module.exports = router;