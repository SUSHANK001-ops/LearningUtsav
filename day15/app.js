const express = require("express");
const morgan = require("morgan");
const app = express();
app.use(morgan('dev'))
app.set("view engine", "ejs");

// app.use((req, res, next) => {
//   console.log("this is middleware");
//   return next();
// });
app.get("/", (req,res,next)=>{
const a = 5;
const b = 6;
console.log(a+b);
return next()
}, (req, res) => {
  res.render("index");
});
app.get("/about", (req, res) => {
  res.send("This is the about page");
});
app.get("/profile", (req, res) => {
  res.send("Profile page");
});

app.listen(3000);
