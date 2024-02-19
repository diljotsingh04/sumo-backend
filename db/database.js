const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL).then(
    ()=>console.log("Connection with mongoDb Successfully")
    );

const schema = new mongoose.Schema({
    a : Number,
    b : Number,
    result: Number
})

const History = mongoose.model('Sum', schema);

module.exports = {
    History
}