require("dotenv").config();
const express = require('express');
const cors = require('cors');

const app = express();

// Connect to MongoDB
const conn = require("./conn/conn");
conn();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const user = require("./routes/user");
const Books = require("./routes/book");
const Favourite = require("./routes/favourite");
const Cart = require("./routes/cart");
const Order = require("./routes/order");

app.use("/api/v1", user);
app.use("/api/v1", Books);
app.use("/api/v1", Favourite);
app.use("/api/v1", Cart);
app.use("/api/v1", Order);

// Start Server
app.listen(process.env.PORT, () => {
    console.log(`Server started at ${process.env.PORT}`);
});
