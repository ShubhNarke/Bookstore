const router = require("express").Router();
const { authenticateToken } = require("./userAuth");
const Book = require("../models/book");
const Order = require("../models/order");
const user = require("../models/user");

// place order 

router.post("/place-order", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { order } = req.body;


        for (const orderData of order) {
            const newOrder = new Order({ user: id, book: orderData._id });
            const orderDataFromDb = await newOrder.save();


            // saving order in user model 
            await User.findByAndupdate(id, {
                $push: { orders: orderDataFromDb._id },
            });

            // clearing cart 

            await user.findByIdAndUpdate(id, {
                $pull: { cart: orderData._id },
            });
        }

        return res.json({
            status: "success",
            message: "order placed successfully",

        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "An error occcured" });
    }
})





module.exports = router