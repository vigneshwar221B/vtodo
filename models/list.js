const mongoose = require("mongoose");

const itemsSchema = {
    name: String
};

const Item = mongoose.model("Item", itemsSchema);


const item1 = new Item({
    name: "Welcome to your todolist!"
});

const item2 = new Item({
    name: "Hit the + button to add a new item."
});

const item3 = new Item({
    name: "<-- Hit this to delete an item."
});

const defaultItems = [item1, item2, item3];

const listSchema = {
    name: String,
    items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);

module.exports.list = List;
module.exports.item = Item;
