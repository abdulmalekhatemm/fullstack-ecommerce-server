const Category = require("../models/category");
const ProductWeight   = require("../models/productWeight");
const express = require('express');
const router = express.Router();


router.get('/',async (req , res )=>{

    try {
        const productWeightList = await ProductWeight.find();
        if(!productWeightList)
        {
            res.status(500).json({success:false});
        }
        return res.status(200).json(productWeightList);
    } catch (error) {

        res.status(500).json({success:false});
        
    }
});

router.get('/:id',async (req , res )=>{ 
  const item = await ProductWeight.findById(req.params.id);
  if(!item){
    res.status(500).json({message: "The Item With Given ID Was Not Found"});
  }
  return res.status(200).send(item);
})

router.post('/create', async (req, res) => {
  try {
    if (!req.body.productWeight) {
      return res.status(400).json({
        message: "productRam field is required"
      });
    }

    // ✅ استخدم اسم مختلف عن اسم الموديل
    let newProductWeights = new ProductWeight({
      productWeight: req.body.productWeight 
    });

    // ✅ استخدم save() بحرف صغير
    const saved = await newProductWeights.save();

    res.status(201).json({
      success: true,
      data: saved
    });

  } catch (error) {
    console.error("❌ Server Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
});



router.delete('/:id', async (req, res) => {
  const deletedItem = await ProductWeight.findByIdAndDelete(req.params.id);

  if (!deletedItem) {
    return res.status(404).json({
      message: "Item Not found!!!",
      success: false
    });
  }

  res.status(200).json({
    success: true,
    message: "Item Deleted Successfully"
  });
});

router.put('/:id', async (req, res) => {
  try {
    const item = await ProductWeight.findByIdAndUpdate(
      req.params.id,
      { productWeight: req.body.productWeight },
      { new: true }
    );

    if (!item) {
      return res.status(404).json({
        message: "Item not found",
        success: false
      });
    }

    res.status(200).json({
      success: true,
      data: item
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Update failed",
      error: err.message
    });
  }
});


module.exports = router ;

