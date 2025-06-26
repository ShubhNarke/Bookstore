const mongoose = require('mongoose');
require('dotenv').config();



//  conection file 
const conn = () => {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Database connected"))
    .catch((err) => console.error("MongoDB  connection error:", err));
};

module.exports = conn;
