const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const app = express();



//get date and time:
let day = "";
app.get("/", function(req,res){
let today = new Date();
let option = {
    weekday: "long",
    day: "numeric",
    month: "long"
};

app.set('view engine', 'ejs');
// let workItems = [];
// let todos = ["play video game"];
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));

//connection for mongoose
mongoose.connect("mongodb://localhost:27017/todoListDB");


const itemSchema = {

  name: String
};
const Item = mongoose.model("item", itemSchema);

const item1 = new Item({
  name: "Welcome to your todo list."
});

const item2 = new Item({
  name: "Hit + button to create a new item."
});

const item3 = new Item({
  name: "<-- Hit this to delete an item."
});

//Storing items into an array
const defaultItems = [item1, item2, item3];

Item.insertMany(defaultItems)
  .then(function(){
    console.log("Saved to database");
  })
  .catch(function(err){
      console.log(err);
    }
  );
  Item.find({}).then(function(foundItems){


    day = today.toLocaleDateString("en-us", option);
    res.render("List", {kindOfDay: day, newListItems: foundItems});
})
.catch(function(err){
  console.log(err);
});





});
app.get("/work",function(req,res){
    res.render("List",{kindOfDay: "work List", newListItems: workItems});
})



app.post("/", function(req,res){
    let todo = req.body.newItem;

    if(req.body.Button === "work"){
        workItems.push(todo);
        res.redirect("/work");
    }else{
        todos.push(todo);
        res.redirect("/");
    }
    console.log(req.body);


})



app.listen(3000,function(){
    console.log("server is running on port 3000");
});
