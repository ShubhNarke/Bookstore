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
});
 

// get order history of particular user 

router.get("/get-order-history",authenticateToken,async(req,res)=>{
    try {
        const {id} = id.headers;
        const userData = await user.findById(id).populate({
            path:"order",
            populate:{path:"book"},
        })

        const orderData = userData.orders.reverse();
        return res.json({
            status:"success",
            data:orderData,
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"an eorrror occurred"});
    }
});

// get all orders admin 

router.get("/get-all-orders",authenticateToken,async(req,res)=>{
    try {
        const userData = await Order.find()
        .populate({
            path:"book",
        })
        .populate({
            path:"user",
        })
        .sort({createAt:-1});
        return res.json({
            status:"success",
            data:userData,
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"An error occured"});
        
    }
})

// update order -- admin 

router.put("/update-status/:id",authenticateToken,async(req,res)=>{
    try {
        const {id} =  req.params;
        await Order.findByIdAndUpdate(id,{status:req.body.status});
        return res.json({
            status:"success",
            message:"Status updated successfully",
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"An error occured"});
    }
})



module.exports = router