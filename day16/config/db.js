const mongoose = require('mongoose')
const connection = mongoose.connect('mongodb+srv://sensei:sushank@cluster0.uolqmyg.mongodb.net/').then(()=>{
    console.log("DB connected")
})

module.exports = connection