// const express = require("express");
// const router = express.Router();
// const Category = require("../models/category");
// const ImageUpload = require("../models/imageUpload");
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");
// const pLimit = require("p-limit");
// const { error } = require("console");
// // const cloudinary = require('cloudinary');
// const mongoose = require("mongoose");
// var imageArr = [];
// var categoryEditId;
// // cloudinary.config({
// //   cloud_name : process.env.cloudinary_Config_Cloud_Nmae ,
// //   api_key: process.env.cloudinary_Config_api_key ,
// //   api_secret:process.env.cloudinary_Config_api_key,
// // secure:true
// // })

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "upload");
//   },
//   filename: function (req, file, cb) {
//     const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, unique + path.extname(file.originalname));
//   },
// });
// const upload = multer({ storage: storage });

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

// // router.get("/", async (req, res) => {
// //   try {
// //     const page = parseInt(req.query.page) || 1;
// //     const perPage = 15;
// //     const totalPosts = await Category.countDocuments();
// //     const totalPages = Math.ceil(totalPosts / perPage);

// //     if (page > totalPages) {
// //       return res.status(404).json({ message: "Data No Found!!!! " });
// //     }
// //     const categoryList = await Category.find()
// //       .skip((page - 1) * perPage)
// //       .limit(perPage)
// //       .exec();

// //     if (!categoryList) {
// //       return res.status(500).json({ success: false });
// //     }
// //     return res.status(200).json({
// //       categoryList: categoryList,
// //       totalPages: totalPages,
// //       page: page,
// //     });
// //   } catch (err) {
// //     console.error("🔥 Error while fetching categories:", err); // ✅ يظهر الخطأ الحقيقي
// //     res.status(500).json({ success: false, error: err.message });
// //     // console.log(category) // ✅ عرض الرسالة فقط
// //   }
// // });

// // router.get('/:id', async (req , res  )=> {

// //     const category = await Category.findById(req.params.id);

// //     if(!category){
// //       return  res.status(404).json({message : "The Categore With The Give ID Was Not Found."});
// //     }
// //     return res.status(200).send(category);

// // })

// //router for delete

// // ❌ حذف صورة واحدة
// router.delete("/deleteImage", async (req, res) => {
//   const { image } = req.body;
//   console.log("🧾 Received image name:", image);

//   try {
//     if (!image) {
//       return res.status(400).json({ error: "Image name is required" });
//     }

//     const imageName = image.split("/").pop();
//     const filePath = path.join(__dirname, "..", "upload", imageName);
//     console.log("📂 Full path to delete:", filePath);

//     if (fs.existsSync(filePath)) {
//       fs.unlinkSync(filePath);
//       console.log("✅ Deleted:", filePath);
//       return res.status(200).json({ msg: "Image deleted successfully" });
//     } else {
//       console.log("⚠️ File not found:", filePath);
//       return res.status(404).json({ msg: "Image not found" });
//     }
//   } catch (error) {
//     console.error("❌ Error deleting image:", error);
//     res.status(500).json({ error: "Failed to delete image!" });
//   }
// });

// router.get("/:id", async (req, res) => {
//   categoryEditId = req.params.id;
//   const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ message: "Invalid Category ID" });
//   }

//   try {
//     const category = await Category.findById(id);
//     if (!category) {
//       return res.status(404).json({ message: "Category not found" });
//     }
//     return res.status(200).json(category);
//   } catch (err) {
//     return res
//       .status(500)
//       .json({ message: "Server Error", error: err.message });
//   }
// });

// router.delete("/:id", async (req, res) => {
//   try {
//     const category = await Category.findById(req.params.id);
//     if (!category) {
//       return res
//         .status(404)
//         .json({ message: "Product not found", status: false });
//     }

//     // لو الصور مخزنة كمسارات محلية فقط
//     if (category.images && category.images.length > 0) {
//       for (const image of category.images) {
//         const filePath = path.join(__dirname, "..", "upload", image);

//         // تأكد أن الملف موجود قبل الحذف
//         if (fs.existsSync(filePath)) {
//           fs.unlinkSync(filePath);
//         }
//       }
//     }
//     const deleteUser = await Category.findByIdAndDelete(req.params.id);

//     if (!deleteUser) {
//       return res.status(404).json({
//         success: false,
//         message: "Category Not Found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Category Deleted Successfully!",
//     });
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       message: "Error deleting category",
//       error: err.message,
//     });
//   }
// });

// // مسار إضافة Category
// // router.post("/create", upload.array("images"), async (req, res) => {
// //   try {
// //     const { name, color, slug, parentId } = req.body;
// //     const images = req.files.map((file) => file.filename);

// //     // تحقق من الحقول required
// //     if (!name || !color || !slug || images.length === 0) {
// //       return res
// //         .status(400)
// //         .json({ error: true, msg: "Please provide all required fields" });
// //     }

// //     const newCategory = new Category({
// //       name,
// //       color,
// //       slug,
// //       images,
// //       parentId: parentId || null,
// //     });

// //     const savedCategory = await newCategory.save();
// //     res.status(201).json({ error: false, data: savedCategory });
// //   } catch (err) {
// //     console.error("❌ Error saving category:", err);
// //     res
// //       .status(500)
// //       .json({ error: true, msg: "Server error while saving category" });
// //   }
// // });

// // These Coding for follow eposide 54

// const createCategories = (categories, parentId = null) => {
//   const categoryList = [];
//   let category;

//   if (parentId === null) {
//     category = categories.filter((cat) => !cat.parentId);
//   } else {
//     category = categories.filter((cat) => cat.parentId == parentId);
//   }

//   for (let cat of category) {
//     categoryList.push({
//       _id: cat._id,
//       name: cat.name,
//       images: cat.images,
//       color: cat.color,
//       slug: cat.slug,
//       Children: createCategories(categories, cat._id),
//     });
//   }

//   return categoryList;
// };

// router.get("/", async (req, res) => {
//   try {
//     const categoryList = await Category.find();
//     if (!categoryList) {
//       res.status(500).json({ success: false });
//     }
//     if (categoryList) {
//       const categoryData = createCategories(categoryList);

//       return res.status(200).json({
//         categoryList: categoryData,
//       });
//     }
//   } catch (error) {
//     res.status(500).json({ success: false });
//   }
// });

// router.post("/create", upload.array("images", 5), async (req, res) => {
//   try {
//     // نملأ الكائن category بنفس المنطق: إذا كانت هناك صور مرفوعة نضيفها
//     let catObj = {};
//     if (req.files && req.files.length > 0) {
//       catObj = {
//         name: req.body.name,
//         images: req.files.map((file) => file.filename),
//         color: req.body.color,
//         slug: req.body.name,
//       };
//     } else {
//       catObj = {
//         name: req.body.name,
//         slug: req.body.name,
//       };
//     }

//     // إذا كانت هناك parentId نضيفها
//     if (req.body.parentId) {
//       catObj.parentId = req.body.parentId;
//     }

//     // إنشاء كائن جديد من الموديل
//     let category = new Category(catObj);

//     // حفظ الكائن في قاعدة البيانات
//     category = await category.save();

//     // إرسال الرد للفرونت إند
//     res.status(201).json(category);
//   } catch (err) {
//     console.error("❌ Error in /create:", err);
//     res.status(500).json({
//       error: err,
//       success: false,
//     });
//   }
// });

// router.get("/tree", async (req, res) => {
//   try {
//     const categoryList = await Category.find();

//     if (!categoryList) {
//       return res.status(500).json({ success: false });
//     }

//     // تصحيح اسم الدالة
//     const categoryData = createCategories(categoryList);

//     return res.status(200).json({
//       categoryList: categoryData,
//     });
//   } catch (error) {
//     console.error("🔥 Error:", error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// router.get(`/get/count`, async (req, res) => {
//   const categoryCount = await Category.countDocuments({ parentId: undefined });
//   if (!categoryCount) {
//     res.status(500).json({ success: false });
//   }
//   res.send({
//     categoryCount: categoryCount,
//   });
// });

// router.get(`/subCat/get/count`, async (req, res) => {
//   let subCatList = [];
//   const categories = await Category.find();
//   if (!categories) {
//     res.status(500).json({ success: false });
//   } else {
//     for (let cat of categories) {
//       if (cat.parentId !== undefined) {
//         subCatList.push(cat);
//       }
//     }
//   }
//   res.send({
//     categoryCount: subCatList.length,
//   });
// });

// router.get("/get/count", async (req, res) => {
//   const categoryCount = await Category.countDocuments();
//   if (!categoryCount) {
//     res.status(500).json({ success: false });
//   }
//   res.send({
//     categoryCount: categoryCount,
//   });
// });

// // router.post("/create", async (req, res) => {
// //   let catObj = {};
// //   if (imageArr.length > 0) {
// //     catObj = {
// //       name: req.body.name,
// //       images: imageArr,
// //       color: req.body.color,
// //       slug: req.body.slug,
// //     };
// //   } else {
// //     catObj = {
// //       name: req.body.name,
// //       slug: req.body.slug,
// //     };
// //   }
// //   if ( req.body.parentId){
// //     catObj.parentId = req.body.parentId ;
// //   }
// //   let category = new Category(catObj);
// //   if(!category){
// //     res.status(500).json({
// //       error: err ,
// //       success: false
// //     });
// //   }
// //   category  = await category.save();

// //   imageArr = [];

// //   res.status(201).json(category);
// // });

// // router.post("/create", upload.array("images", 5), async (req, res) => {
// //   console.log("Body:", req.body);
// //   console.log("Files:", req.files);
// //   try {
// //     if (!req.files || req.files.length === 0) {
// //       return res
// //         .status(400)
// //         .json({ success: false, message: "No images uploaded" });
// //     }

// //     const imageArr = req.files.map((file) => file.filename);

// //     const category = new Category({
// //       name: req.body.name,
// //       images: imageArr,
// //       color: req.body.color,
// //     });

// //     const savedCategory = await category.save();
// //     res.status(201).json(savedCategory);
// //   } catch (err) {
// //     console.error("❌ Error in /create:", err);
// //     res.status(500).json({
// //       success: false,
// //       error: err.message,
// //     });
// //   }
// // });

// // ===================
// // تعديل كاتيجوري
// // ===================

// router.put("/:id", upload.array("images", 5), async (req, res) => {
//   const { name, color } = req.body;
//   const newImages = req.files?.map((file) => file.filename) || [];

//   if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Invalid Category ID" });
//   }

//   try {
//     const category = await Category.findById(req.params.id);
//     if (!category) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Category not found" });
//     }

//     // حذف الصور القديمة إذا تم رفع صور جديدة
//     if (newImages.length > 0 && category.images.length > 0) {
//       for (const image of category.images) {
//         const filePath = path.join(__dirname, "..", "upload", image);
//         if (fs.existsSync(filePath)) {
//           fs.unlinkSync(filePath);
//         }
//       }
//       category.images = newImages; // استبدال الصور القديمة بالجديدة
//     }

//     // تحديث باقي البيانات
//     category.name = name;
//     category.color = color;

//     await category.save();
//     res.status(200).json({ success: true, category });
//   } catch (error) {
//     console.error("❌ Error in PUT /category/:id =>", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Server error", error: error.message });
//   }
// });

// module.exports = router;

// // router.post('/create', async (req , res , next )=>{
// //  const limit = pLimit(2);
// //  const imagesToUpload = req.body.images.map((image)=>{
// //     return limit ( async ()=> {
// //          const result = await cloudinary.uploader.upload(image);
// //         //  console.log(`Successfully Upload ${image}`);
// //         //     console.log(`> Result : ${result.secure_url}`);
// //             return result;
// //     })

// //  });
// //  const uploadStatus  = await Promise.all(imagesToUpload);
// //  const imageUrl = uploadStatus.map((item)=>{
// //     return item.secure_url
// //  })
// //   if(!uploadStatus){
// //     return  res.status(500).json({
// //         error:"images cannot  upload!",
// //         status:false
// //     })
// //   }
// //   let category = new Category({
// //     name:req.body.name ,
// //     images:imageUrl ,
// //     color:req.body.color
// //   });
// //   if(!category){
// //     res.status(500).json({
// //         error: err ,
// //         success : false
// //     })
// //   }
// //    category = await category.save();

// //    res.status(201).json(category);
// // });

// //The Uploading
// // router.post(`/upload`,upload.array("images"),async(req , res )=>{
// //   imageArr = [] ;
// //   const files = req.files;
// //   for(let i = 0; i < files.length;i++){
// //     imageArr.push(files[i].filename)
// //   }
// //   console.log(imageArr);
// //   res.json({images:imageArr});
// // });
// // router.post(`/upload`,upload.array("images"),async (req , res )=>{
// //   if (categoryEditId !== undefined){
// //     const category = await Category.findById(categoryEditId);
// //     const images = category.images ;
// //     if(images.length !== 0){
// //       for(image of images){
// //         fs.unlinkSync(`upload/${image}`);
// //       }
// //     }
// //   }
// //   imageArr = [];
// //   const files = req.files ;
// //   for(let i =0; i<files.length;i++){
// //     imageArr.push(files[i].filename);
// //   }
// //   res.send(imageArr);

// // })
// //
// // router.post('/create', async (req, res) => {

// //       let category = new Category({
// //         name:req.body.name,
// //         images:imageArr,
// //         color:req.body.color
// //     });

// //     if(!category)
// //     {
// //       res.status(500).json({
// //         error:err ,
// //         success:false
// //       })
// //     }
// //      const savedCategory = await category.save();
// //         res.status(201).json(savedCategory);

// //     // const { name, images, color } = req.body;

// //     // // ✅ تحقق من أن images موجودة وغير فارغة
// //     // if (!images || !Array.isArray(images) || images.length === 0) {
// //     //     return res.status(400).json({
// //     //         success: false,
// //     //         message: 'Images array is required and must contain at least one image.'
// //     //     });
// //     // }

// //     // const category = new Category({
// //     //     name,
// //     //     images,
// //     //     color
// //     // });

// //     // try {
// //     //     const savedCategory = await category.save();
// //     //     res.status(201).json(savedCategory);
// //     // } catch (error) {
// //     //     res.status(500).json({ success: false, error: error.message });
// //     // }
// // });

// ///=======================================================
// ///=======================================================

// // router.put('/:id', async (req, res) => {
// //     try {
// //         const { name, images, color } = req.body;

// //         if (!images || !Array.isArray(images) || images.length === 0) {
// //             return res.status(400).json({
// //                 success: false,
// //                 message: 'Images array is required and must contain at least one image.'
// //             });
// //         }

// //         const category = await Category.findByIdAndUpdate(
// //             req.params.id,
// //             { name, images, color },
// //             { new: true }
// //         );

// //         if (!category) {
// //             return res.status(404).json({
// //                 success: false,
// //                 message: "Category not found"
// //             });
// //         }

// //         res.status(200).json(category);

// //     } catch (error) {
// //         console.error("❌ Error in PUT /category/:id =>", error.message);
// //         res.status(500).json({
// //             success: false,
// //             message: "Server error",
// //             error: error.message
// //         });
// //     }
// // });

const express = require("express");
const router = express.Router();
const Category = require("../models/category");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");

// إعداد التخزين للصور
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload");
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// ========================
// إنشاء شجرة التصنيفات
// ========================
const createCategories = (categories, parentId = null) => {
  const categoryList = [];
  let category;

  if (parentId === null) {
    category = categories.filter((cat) => !cat.parentId);
  } else {
    category = categories.filter(
      (cat) => String(cat.parentId) === String(parentId)
    );
  }

  for (let cat of category) {
    categoryList.push({
      _id: cat._id,
      name: cat.name,
      images: cat.images || [],
      color: cat.color || "",
      slug: cat.slug,
      Children: createCategories(categories, cat._id),
    });
  }

  return categoryList;
};

// ========================
// جلب جميع التصنيفات
// ========================
router.get("/", async (req, res) => {
  try {
    const categoryList = await Category.find();
    const categoryData = createCategories(categoryList);
    return res.status(200).json({ categoryList: categoryData });
  } catch (error) {
    console.error("🔥 Error fetching categories:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
});


router.get(`/get/count`, async (req, res) => {
  let subCatList = [];
  const categories = await Category.find();
  if (!categories) {
    res.status(500).json({ success: false });
  } else {
    for (let cat of categories) {
      if (cat.parentId !== undefined) {
        subCatList.push(cat);
      }
    }
  }
  res.send({
    categoryCount: subCatList.length,
  });
});




router.get(`/subCat/get/count`, async (req, res) => {
  try {
    const subCatList = await Category.find({ parentId: { $ne: undefined } });
    return res.send({
      categoryCount: subCatList.length,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});


// router.get("/get/count", async (req, res) => {
//   const categoryCount = await Category.countDocuments();
//   if (!categoryCount) {
//     res.status(500).json({ success: false });
//   }
//   res.send({
//     categoryCount: categoryCount,
//   });
// });
// ========================
// إضافة تصنيف جديد
// ========================
router.post("/create", upload.array("images", 5), async (req, res) => {
  try {
    const catObj = {
      name: req.body.name,
      slug: req.body.slug || req.body.name,
      images: req.files?.map((file) => file.filename) || [],
      color: req.body.color || "",
    };

    if (req.body.parentId) {
      catObj.parentId = req.body.parentId;
    }

    const category = new Category(catObj);
    const savedCategory = await category.save();

    console.log("✅ Saved category:", savedCategory);
    return res.status(201).json(savedCategory);
  } catch (err) {
    console.error("❌ Error creating category:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
});


// ========================
// جلب شجرة التصنيفات
// ========================
router.get("/tree", async (req, res) => {
  try {
    const categoryList = await Category.find();
    const categoryData = createCategories(categoryList);
    return res.status(200).json({ categoryList: categoryData });
  } catch (error) {
    console.error("🔥 Error fetching tree:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

// ========================
// حذف تصنيف
// ========================
router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    // حذف الصور من النظام
    if (category.images?.length > 0) {
      for (const image of category.images) {
        const filePath = path.join(__dirname, "..", "upload", image);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      }
    }

    await Category.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json({ success: true, message: "Category deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting category:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// ========================
// تحديث تصنيف
// ========================
router.put("/:id", upload.array("images", 5), async (req, res) => {
  try {
    const { name, color } = req.body;
    const newImages = req.files?.map((file) => file.filename) || [];

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Category ID" });
    }

    const category = await Category.findById(req.params.id);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    // حذف الصور القديمة إذا تم رفع صور جديدة
    if (newImages.length > 0 && category.images.length > 0) {
      for (const image of category.images) {
        const filePath = path.join(__dirname, "..", "upload", image);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      }
      category.images = newImages;
    }

    category.name = name;
    category.color = color;

    await category.save();
    return res.status(200).json({ success: true, category });
  } catch (error) {
    console.error("❌ Error updating category:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
