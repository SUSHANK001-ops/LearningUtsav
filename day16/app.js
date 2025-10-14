const express = require("express");
const morgan = require("morgan");
const userModel = require("./models/user");
const db = require("./config/db");
const app = express();
app.use(morgan("dev"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get(
  "/",
  (req, res, next) => {
    return next();
  },
  (req, res) => {
    res.render("index");
  }
);
app.get("/register", (req, res) => {
  res.render("register");
});
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
 const newUser=  await userModel.create({
    username: username,
    email: email,
    password: password,
  });
  res.send(newUser);
});

app.get('/get-users',(req,res)=>{
  userModel.find().then((user)=>{
    res.send(user)
  })
})
app.get('/get-users',(req,res)=>{
  userModel.find({
    username:'Ansu'
  }).then((user)=>{
    res.send(user)
  })
})
app.get('/get-users',(req,res)=>{
  userModel.find().then((user)=>{
    res.send(user)
  })
})

app.get('/get-users',(req,res)=>{
  userModel.findOne({
    username:'Ansu'
  }).then((user)=>{
    res.send(user)
  })
})

app.get('/update-user',async(req,res)=>{
  await userModel.findOneAndUpdate({
    username:'Ansu'
  },
{
  email:'Ansu@gmail.com'
})
res.send("user updated")
})

app.get('/delete-user', async(req,res)=>{
  await userModel.findOneAndDelete({
    username :"sushank"
  })
  res.send("User deleted")
})
app.listen(3000);
