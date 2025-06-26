const router = require("express").Router();
const { model } = require("mongoose");
const User = require("../models/user");
const {authenticateToken} = require("./userAuth");

// put book to cart 

router.put("/add-to-cart",authenticateToken,async(req,res)=>{
    try {
        const {bookid , id}= req.headers();
        const userData  = await User.findById(id);
        const isBookFavourited = userData.cart.includes(bookid);
        if(isBookFavourited){
            return res.json({
                status:"success",
                message:"Book is allredy in cart",
            });
        }
        await User.findByIdAndUpdate(id,{
            $push:{cart:bookid},
        });

        return res.json({
            stauts:"success",
            message:"Book added to cart",
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"An error occurred"});
        
    }
})











module.exports = router;