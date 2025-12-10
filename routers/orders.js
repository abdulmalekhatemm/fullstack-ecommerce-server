const express = require('express');
const router = express.Router();
const Orders = require('../models/orders');
const ImageUpload = require('../models/imageUpload'); 
const multer = require('multer');
const path = require('path');
const fs = require("fs");
const pLimit = require('p-limit');
const { error } = require('console');
// const cloudinary = require('cloudinary');
const mongoose = require('mongoose');




router.get('/', async (req, res) => {
    try {

        const page = parseInt(req.query.page) || 1;
        const perPage = 15;
        const totalPosts = await Category.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage);
        
        if(page > totalPages){
            return res.status(404).json({message:"Data No Found!!!! "});
        }
        const ordersList = await Orders.find()
        .skip((page - 1) * perPage)
        .limit(perPage)
        .exec();

         if (!ordersList) {
            return res.status(500).json({ success: false });
        }
          return res.status(200).json({
            "ordersList":ordersList,
            "totalPages":totalPages,
            "page":page
        });

    } catch (err) {
        console.error('🔥 Error while fetching Orders:', err); // ✅ يظهر الخطأ الحقيقي
        res.status(500).json({ success: false, error: err.message });
        // console.log(category) // ✅ عرض الرسالة فقط
    }
});





router.get('/:id', async (req, res) => {
  categoryEditId = req.params.id ;
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Category ID" });
  }

  try {
    const orders = await Orders.findById(id);
    if (!orders) {
      return res.status(404).json({ message: "Category not found" });
    }
    return res.status(200).json(category);
  } catch (err) {
    return res.status(500).json({ message: "Server Error", error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const orders = await Orders.findById(req.params.id);
    if (!orders) {
      return res.status(404).json({ message: "Product not found", status: false });
    }


    const deleteOrders= await Orders.findByIdAndDelete(req.params.id);

    if (!deleteOrders) {
      return res.status(404).json({
        success: false,
        message: "Orders Not Found"
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Orders Deleted Successfully!'
    });
    
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Error deleting Orders',
      error: err.message
    });
  }
});



router.post("/create", async (req, res) => {
  console.log("Body:", req.body);
  console.log("Files:", req.files);
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "No images uploaded" });
    }

   

    const orders = new Orders({
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      address:req.body.address,
      pincode:req.body.pincode,
      amount:req.body.amount,
      paymentId:req.body.paymentId,
      email:req.body.email,
      userid: req.body.userid ,
      products:req.body.products ,
      status:req.body.status ,
     
    });

    const savedOrders = await orders.save();
    res.status(201).json(savedOrders);
  } catch (err) {
    console.error("❌ Error in /create:", err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});


// ===================
// تعديل كاتيجوري
// ===================
router.put('/:id',  async (req, res) => {
  const { name, color } = req.body;


  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ success: false, message: "Invalid Category ID" });
  }

  try {
    const orders = await Orders.findById(req.params.id);
    if (!orders) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }


    // تحديث باقي البيانات
     Orders.name = name;
     Orders.phoneNumber = phoneNumber;
     Orders.address = address;
     Orders.pincode = pincode;
     Orders.amount = amount;
     Orders.paymentId = paymentId;
     Orders.email = email;
     Orders.products = products ;
     Orders.status=req.body.status

    await Orders.save();
    res.status(200).json({ success: true, orders });

  } catch (error) {
    console.error("❌ Error in PUT /orders/:id =>", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

module.exports = router;






















//   cloud_name : process.env.cloudinary_Config_Cloud_Nmae ,
//   api_key: process.env.cloudinary_Config_api_key ,
//   api_secret:process.env.cloudinary_Config_api_key,
// secure:true 
// })

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'upload');
//   },
//   filename: function (req, file, cb) {
//     const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     cb(null, unique + path.extname(file.originalname));
//   },
// });
// const upload = multer({storage : storage });



// router.post(`/upload`, upload.array("images"), async (req, res) => {
//   const categoryEditId = req.body.categoryId; // أرسل id من frontend
//   let imageArr = [];

//   if (categoryEditId) {
//     const category = await Category.findById(categoryEditId);
//     if (category && category.images.length) {
//       for (const image of category.images) {
//         const filePath = `upload/${image}`;
//         if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
//       }
//     }
//   }

//   const files = req.files;
//   for (let i = 0; i < files.length; i++) {
//     imageArr.push(files[i].filename);
//   }

//   res.json({ images: imageArr });
// });


// router.post('/create', async (req , res , next )=>{
//  const limit = pLimit(2);
//  const imagesToUpload = req.body.images.map((image)=>{
//     return limit ( async ()=> {
//          const result = await cloudinary.uploader.upload(image);
//         //  console.log(`Successfully Upload ${image}`);
//         //     console.log(`> Result : ${result.secure_url}`);
//             return result;
//     })
   
//  });
//  const uploadStatus  = await Promise.all(imagesToUpload);
//  const imageUrl = uploadStatus.map((item)=>{
//     return item.secure_url
//  })
//   if(!uploadStatus){
//     return  res.status(500).json({
//         error:"images cannot  upload!",
//         status:false 
//     })
//   }
//   let category = new Category({
//     name:req.body.name ,
//     images:imageUrl ,
//     color:req.body.color 
//   });
//   if(!category){
//     res.status(500).json({
//         error: err ,
//         success : false 
//     })
//   }
//    category = await category.save();

//    res.status(201).json(category);
// });



//The Uploading 
// router.post(`/upload`,upload.array("images"),async(req , res )=>{
//   imageArr = [] ;
//   const files = req.files;
//   for(let i = 0; i < files.length;i++){
//     imageArr.push(files[i].filename)
//   }
//   console.log(imageArr);
//   res.json({images:imageArr});
// });
// router.post(`/upload`,upload.array("images"),async (req , res )=>{
//   if (categoryEditId !== undefined){
//     const category = await Category.findById(categoryEditId);
//     const images = category.images ;
//     if(images.length !== 0){
//       for(image of images){
//         fs.unlinkSync(`upload/${image}`); 
//       }
//     }
//   }
//   imageArr = [];
//   const files = req.files ;
//   for(let i =0; i<files.length;i++){
//     imageArr.push(files[i].filename);
//   }
//   res.send(imageArr);

// })
//
// router.post('/create', async (req, res) => {



//       let category = new Category({
//         name:req.body.name,
//         images:imageArr,
//         color:req.body.color
//     });

//     if(!category)
//     {
//       res.status(500).json({
//         error:err ,
//         success:false 
//       })
//     }
//      const savedCategory = await category.save();
//         res.status(201).json(savedCategory);

//     // const { name, images, color } = req.body;

//     // // ✅ تحقق من أن images موجودة وغير فارغة
//     // if (!images || !Array.isArray(images) || images.length === 0) {
//     //     return res.status(400).json({
//     //         success: false,
//     //         message: 'Images array is required and must contain at least one image.'
//     //     });
//     // }

//     // const category = new Category({
//     //     name,
//     //     images,
//     //     color
//     // });

//     // try {
//     //     const savedCategory = await category.save();
//     //     res.status(201).json(savedCategory);
//     // } catch (error) {
//     //     res.status(500).json({ success: false, error: error.message });
//     // }
// });

///=======================================================
///=======================================================

// router.put('/:id', async (req, res) => {
//     try {
//         const { name, images, color } = req.body;

//         if (!images || !Array.isArray(images) || images.length === 0) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Images array is required and must contain at least one image.'
//             });
//         }

//         const category = await Category.findByIdAndUpdate(
//             req.params.id,
//             { name, images, color },
//             { new: true }
//         );

//         if (!category) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Category not found"
//             });
//         }

//         res.status(200).json(category);

//     } catch (error) {
//         console.error("❌ Error in PUT /category/:id =>", error.message);
//         res.status(500).json({
//             success: false,
//             message: "Server error",
//             error: error.message
//         });
//     }
// });
