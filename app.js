const express = require("express");
const bodyparser = require("body-parser");
const app = express();


app.set('view engine', 'ejs');
let workItems = [];
let todos = ["play video game"];
app.use(bodyparser.urlencoded({extended: true}));  
app.use(express.static("public"));
let day = "";
app.get("/", function(req,res){
let today = new Date();
let option = {
    weekday: "long",
    day: "numeric",
    month: "long"
};


day = today.toLocaleDateString("en-us", option);
res.render("List", {kindOfDay: day, newListItems: todos});


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
