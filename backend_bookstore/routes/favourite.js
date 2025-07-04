const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");

//  add book to favourite 

router.put("/add-book-to-favourite" , authenticateToken, async(requestAnimationFrame,res)=>{
    try {
        const {bookid,id} = req.headers;
        const userData = await User.findById(id);
        const isBookFavourite = userData.favourites.includes(bookid);
        if(isBookFavourite){
            return res.status(200).json({message:"Book is alredy favourites"});
        }
        await User.findByIdAndUpdate(id,{$push:{favourites:bookid}});
     return res.status(200).json({message:"Book added to in favourites"});

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});


// remove the book to favourites 

router.delete("/remove-book-to-favourite" , authenticateToken, async(req,res)=>{
    try {
        const {bookid,id} = req.headers;
        const userData = await User.findById(id);
        const isBookFavourite = userData.favourites.includes(bookid);
        if(isBookFavourite){
            await User.findByIdAndUpdate(id,{$pull:{favourites:bookid}});
        }
       
     return res.status(200).json({message:"Book remove to favourites"});

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});


// get favourites books of particular user

router.get("/get-favourite-book",authenticateToken,async(req,res)=>{
    try {
        const {id}=req.header;
        const userData = await User.findById(id).populate("favourites");
        const favouriteBooks  = userData.favourites;
        return res.json({
            status:"success",
            data:favouritesBooks,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"An error accuers"});

    }
})




module.exports  = router;