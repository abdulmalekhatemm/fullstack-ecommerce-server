const SubCategory = require('../models/subCat');
const express = require('express');
//const { trace } = require('./categories');
const router = express.Router();




router.get('/', async (req, res) => {
    try {

        const page = parseInt(req.query.page) || 1;
        const perPage = 8;
        const totalPosts = await SubCategory.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage);
        
        if(page > totalPages){
            return res.status(404).json({message:"Data No Found!!!! "});
        }
        const subCategoryList = await SubCategory.find().populate("category")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .exec();

         if (!subCategoryList) {
            return res.status(500).json({ success: false });
        }
          return res.status(200).json({
            "subCategoryList":subCategoryList,
            "totalPages":totalPages,
            "page":page
        });

    } catch (err) {
        console.error('🔥 Error while fetching categories:', err); // ✅ يظهر الخطأ الحقيقي
        res.status(500).json({ success: false, error: err.message });
        console.log(subCategoryList) // ✅ عرض الرسالة فقط
    }
});


// router.get('/', async (req, res) => {
//   try {
//     const subCat = await SubCategory.find().populate("category");

//     if (!subCat) {
//       return res.status(500).json({ success: false });
//     }

//     return res.status(200).json(subCat);
//   } catch (error) {
//     console.error('🔥 Error while fetching categories:', error);
//     res.status(500).json({ success: false });
//   }
// });

router.get('/:id', async (req, res) => {
try {
    const subcategory = await SubCategory.findById(req.params.id).populate("category");
    if (!subcategory) {
      return res.status(404).json({ message: "The Sub Category With Given Id Was  not found" });
    }
    return res.status(200).json(subcategory);
  } catch (err) {
    return res.status(500).json({ message: "Server Error",});
  }
});

router.post('/create', async (req, res) => {

      let SubCategor = new SubCategory({
        category:req.body.category,
        SubCat:req.body.SubCat
    });

    if(!SubCategor)
    {
      res.status(500).json({
        error:err ,
        success:false 
      })
    }
  const subCategor = await SubCategor.save();
        res.status(201).json(subCategor);

    // const { name, images, color } = req.body;

    // // ✅ تحقق من أن images موجودة وغير فارغة
    // if (!images || !Array.isArray(images) || images.length === 0) {
    //     return res.status(400).json({
    //         success: false,
    //         message: 'Images array is required and must contain at least one image.'
    //     });
    // }

    // const category = new Category({
    //     name,
    //     images,
    //     color
    // });

    // try {
    //     const savedCategory = await category.save();
    //     res.status(201).json(savedCategory);
    // } catch (error) {
    //     res.status(500).json({ success: false, error: error.message });
    // }
});




router.delete('/:id', async (req, res) => {
  try {
    const subCat = await SubCategory.findById(req.params.id);
    if (!subCat) {
      return res.status(404).json({ message: "Product not found", status: false });
    }



    
    const deleteSubCat = await SubCategory.findByIdAndDelete(req.params.id);

    if (!deleteSubCat) {
      return res.status(404).json({
        success: false,
        message: "Category Not Found"
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Category Deleted Successfully!'
    });
    
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Error deleting category',
      error: err.message
    });
  }
});


// router.put('/:id', async (req, res) => {
//   try {
   
   

//     // تحديث المنتج
//     const subCat = await SubCategory.findByIdAndUpdate(
//       req.params.id,
//       {
//         category:req.body.name,  
//         SubCat:req.body.SubCat,
       
//       },
//       { new: true }
//     );

//     if (!subCat) {
//       return res.status(404).json({ success: false, message: 'Sub CateGory Is  not found.' });
//     }

//     return res.status(200).json({ success: true, message: 'Product updated.', data: subCat });

//   } catch (error) {
//     return res.status(500).json({ success: false, message: 'Server error', error: error.message });
//   }
//  });

router.put('/:id', async (req, res) => {
  try {
    const subCat = await SubCategory.findByIdAndUpdate(
      req.params.id,
      {
        category: req.body.category,  
        SubCat: req.body.SubCat,
      },
      { new: true }
    );

    if (!subCat) {
      return res.status(404).json({ success: false, message: 'Sub Category not found.' });
    }

    return res.status(200).json({ success: true, message: 'Product updated.', data: subCat });

  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});


module.exports = router ;