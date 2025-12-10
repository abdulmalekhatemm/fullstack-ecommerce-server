// // const User = require("../models/user");
// // const express = require('express');
// // const router = express.Router();
// // const bycrpt = require('bcrypt');
// // const  jwt = require("jsonwebtoken");
// // const { route } = require("./categories");


// // router.post(`/signup`,async (req , res )=>{
// //    const {name , phone , email ,password} = req.body ;
// //     try {
// //         const existingUser = await User.findOne({email : email});
// //         if(existingUser){
// //             res.status(404).json({msg:"user already exist !"});
// //         }
// //         const hashPassword = await bycrpt.hash(password , 10 );
// //         const result = await User.create({
// //         name:name,
// //         phone:phone,
// //         email:email,
// //         password:hashPassword });
// //         const token = jwt.sign({email: result.email, id: result._id }, process.env.JSON_WEB_SECRET_KEY);
// //         res.status(200).json({
// //             user: result ,
// //             token : token
// //         });
// //     } catch (error){
// //         console.log(error);
// //         res.status.apply(404).json({msg:"user not found"});
// //     } 
// // });

// // router.post(`/sigin`, async (req , res )=>{
// //      cosnt = {email , password } = req.body ;
// //     try {
// //             const existingUser = await User.findOne({email : email});
// //         if(!existingUser){
// //             res.status(404).json({msg:"user already exist !"});
// //         }
        
// //     } catch (error) {
        
// //     }
// // })



// // module.exports = router ;



// const express = require("express");
// const router = express.Router();
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const User = require("../models/user");

// // -----------------------------
// // 🟢 إنشاء مستخدم جديد (SignUp)
// // -----------------------------
// router.post(`/signup`, async (req, res) => {
//   const { name, phone, email, password } = req.body;

//   try {
//     const existingUser = await User.findOne({email : email});
//     if (existingUser) {
//       return res.status(400).json({ msg: "User already exists!" });
//     }

//     const hashPassword = await bcrypt.hash(password, 10);
//     const newUser = await User.create({
//       name,
//       phone,
//       email,
//       password: hashPassword,
//     });

//     const token = jwt.sign(
//       { email: newUser.email, id: newUser._id },
//       process.env.JSON_WEB_SECRET_KEY,
//       { expiresIn: "7d" } // مدة صلاحية التوكن
//     );

//    return res.status(201).json({ user: newUser, token });
// } catch (error) {
//     console.error("Signup Error Details:", error);
//     res.status(500).json({ msg: "Signup failed", error: error.message });
// }

// });

// // -----------------------------
// // 🔵 تسجيل الدخول (SignIn)
// // -----------------------------
// router.post(`/signin`, async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const existingUser = await User.findOne({email});
//     if (!existingUser) {
//       return res.status(404).json({ msg: "User not found!" });
//     }

//     const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
//     if (!isPasswordCorrect) {
//       return res.status(400).json({ msg: "Invalid password!" });
//     }

//     const token = jwt.sign(
//       { email: existingUser.email, id: existingUser._id },
//       process.env.JSON_WEB_SECRET_KEY,
//       { expiresIn: "7d" }
//     );

//     res.status(200).json({ user: existingUser, token: token ,
//       msg:"user Authenticated"

//      });
//   } catch (error) {
//     console.error("Signin Error Details:", error);
//     res.status(500).json({ msg: "Signin failed", error: error.message });
//   }
// });


// router.get(`/` , async (req ,res )=> {

//   const userList = await User.find();
//   try {
//     if(!userList)
//     {
//       res.status(404).json({success: false})
//     }
//     return res.send(userList);
    
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({success: false})
//   }
// });


// router.get(`/:id` , async (req ,res)=> { 
// const user = await User.findById(req.params.id);
// if(!user){
//   res.status(500).json({message: 'The User With The Given ID Was Not Found '})
// }
// res.status(200).send(user);

// });

// router.delete(`/:id`, async (req , res )=> {
//   User.findByIdAndDelete(req.params.id).then(user => {
//     if(user){
//       return res.status(200).json(200).json({success: true , message: 'The User Is Deteted!'});
//     }
//     else{
//       return res.status(500).json({success:false , message: 'User Not Found!'});
//     }
//   }).catch (err=>{
//     return res.status(500).json({success : false , error: err})
//   })
// })



// router.get(`/get/count`, async (req , res )=> {
//   const userCount = await User.countDocuments((count)=> count)
//   if (!userCount){
//     res.status(500).json({success: false});
//   }
//   res.send({
//     userCount: userCount
//   })
// });


// //Updata Data  Users 

// router.put(`/:id`, async (req , res )=> {
//   const { name, phone, email, password } = req.body;
//   const userExit = await  User.findById(req.params.id);
//   let newPassword 
//   if(req.body.password)
//   {
//     newPassword = bcrypt.hashSync(req.body.password , 10 )
//   }else{
//  newPassword = userExit.passwordHash ;
//      }
//     newPassword = userExit.findByIdAndUpdate(
//       req.params.id,
//       {
//        name:name, 
//        phone: phone, 
//        email: email, 
//        password: password
//       },
//       {new :true }
//     )
//     if(!user)
//     {
//       return res.status(400).send('The User Cannot Be Updata!!')
//       res.send(user)
//     }
 
// })

// // -----------------------------
// // 🟡 تعديل بيانات المستخدم
// // -----------------------------
// router.put("/:id", async (req, res) => {
//   const { id } = req.params;
//   const { name, phone, email, password } = req.body;

//   try {
//     const updateData = { name, phone, email };
//     if (password) {
//       updateData.password = await bcrypt.hash(password, 10);
//     }

//     const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
//     if (!updatedUser) {
//       return res.status(404).json({ msg: "User not found!" });
//     }

//     res.status(200).json({ user: updatedUser });
//   } catch (error) {
//     console.error("Update error:", error);
//     res.status(500).json({ msg: "Update failed" });
//   }
// });

// // -----------------------------
// // 🔴 حذف مستخدم
// // -----------------------------
// router.delete("/:id", async (req, res) => {
//   const { id } = req.params;

//   try {
//     const deletedUser = await User.findByIdAndDelete(id);
//     if (!deletedUser) {
//       return res.status(404).json({ msg: "User not found!" });
//     }

//     res.status(200).json({ msg: "User deleted successfully" });
//   } catch (error) {
//     console.error("Delete error:", error);
//     res.status(500).json({ msg: "Delete failed" });
//   }
// });

// module.exports = router;















// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const fs = require("fs");
// const path = require("path");
// const User = require("../models/User");
// const { error } = require("console");
// const bycrpt = require('bcrypt');
// const  jwt = require("jsonwebtoken");
// // ------------------------------
// // 🟢 إعداد مجلد رفع الصور
// // ------------------------------
// const uploadDir = path.join(__dirname, "../upload/user/");
// if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// // ------------------------------
// // 🟢 إعداد multer
// // ------------------------------
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, uploadDir),
//   filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
// });
// const upload = multer({ storage });
// //============================================================
// //====================Signup
// //============================================================
//  router.post(`/signup`,async (req , res )=>{
//    const {name , phone , email ,password , isAdmin} = req.body ;
//     try {
//         const existingUser = await User.findOne({email : email});
//         if(existingUser){
//          return   res.status(404).json({msg:"user already exist !"});
//         }
//         const hashPassword = await bycrpt.hash(password , 10 );
//         const result = await User.create({
//         name:name,
//         phone:phone,
//         email:email,
//         password:hashPassword ,
//          isAdmin :isAdmin });
//         const token = jwt.sign({email: result.email, id: result._id }, process.env.JSON_WEB_SECRET_KEY);
//         res.status(200).json({
//             user: result ,
//             token : token
//         });
//     } catch (error){
//         console.log(error);
//         res.status.apply(404).json({msg:"user not found"});
//     } 
// });
// //============================================================
// //====================changePassword 
// //============================================================
// //  router.post(`/changePassword`,async (req , res )=>{
// //    const { name , phone, email ,password} = req.body ;
// //    const userExit = await User.findById(req.params.id);
// //    const hashPassword = await bycrpt.hash(password,10);

// //    const user = await User.findByIdAndUpdate(
// //     req.params.id,
// //     {
// //       name:name ,
// //       phone: phone ,
// //       email:email ,
// //       password: hashPassword,
// //       images: images ,
// //     },
// //     {new : true}
// //    )
// //    if(!user)
// //    {
// //     return res.status(500).json({msg: 'not foud user'})
// //    }
// //     // try {
// //     //     const existingUser = await User.findOne({email : email});
// //     //     if(existingUser){
// //     //         res.status(404).json({msg:"user already exit!   !"});
// //     //     }
// //     //     const hashPassword = await bycrpt.hash(password , 10 );
// //     //     if(req.body.password){
// //     //       newPassword = bycrpt.hashSync(req,body.password, 10);
// //     //     }else
// //     //     {
// //     //       newPassword = await User.findByIdAndUpdate(
// //     //         req.params.id {
// //     //           password:newPassword ,

// //     //          },
// //     //          {new: true}
// //     //       )
// //     //     }
// //     //     const matchPassword = await bycrpt.compare(password , existingUser.password);
// //     //     if(!matchPassword)
// //     //     {
// //     //       return res.status(400).json({error:true , msg:'invailid credentails'});
// //     //     }
// //     //     const hashPassword = await bycrpt.hash(password , 10 );
// //     //     const result = await User.create({
// //     //     email:email,
// //     //     password:hashPassword });
// //     //     const token = jwt.sign({email: result.email, id: result._id }, process.env.JSON_WEB_SECRET_KEY);
// //     //     res.status(200).json({
// //     //         user: result ,
// //     //         token : token
// //     //     });
// //     // } catch (error){
// //     //     console.log(error);
// //     //     res.status.apply(404).json({msg:"user not found"});
// //     // } 
// // });
// //============================================================
// //====================changePassword 
// //============================================================
// //  router.post(`/changePassword/:id`,async (req , res )=>{
// //    const { name , phone, email ,password, newPass , images} = req.body ;

// //    const userExit = await User.findById({email : email});
// //    if(!userExit)
// //    {
// //     res.status(404).json({error: true , msg:'User Not fond !'})
// //    }
// //     const matchPassword = await bycrpt.compare(password , userExit.password);
// //   if(!matchPassword){
// //     return res.json({error: true , msg:'current password worng'});
// //   } 
// //   let newPassword 

// //   if(newPass){
// //     newPassword = bycrpt.hashSync(newPass,10);
// //   }
// //   else{
// //     newPassword = userExit.hashPassword ;
// //   }
// //   console.log(newPassword);
// //   const user = await User.findByIdAndUpdate(
// //     req.params.id,
// //     {
// //       name: name ,
// //       phone:phone ,
// //       email: email,
// //       password:newPassword,
// //       images: images,
// //     }
// //   ) 
// //   //  const hashPassword = await bycrpt.hash(password,10);
    
// //   //  const user = await User.findByIdAndUpdate(
// //   //   req.params.id,
// //   //   {
// //   //     name:name ,
// //   //     phone: phone ,
// //   //     email:email ,
// //   //     password: hashPassword,
// //   //     images: images ,
// //   //   },
// //   //   {new : true}
// //   //  )
// //    if(!user)
// //    {
// //     return res.status(400).json({msg: 'not foud user'})
// //    }

// //    res.send(user)
   
// // });


// //============================================================
// //==================== CHANGE PASSWORD ========================
// //============================================================
// router.put(`/changePassword/:id`, async (req, res) => {
//   try {
//     const { name, phone, email, password, newPass, images } = req.body;

//     // 1) التحقق من وجود المستخدم عبر الإيميل
//     const userExit = await User.findOne({ email: email });
//     if (!userExit) {
//       return res.status(404).json({ error: true, msg: "User Not Found!" });
//     }

//     // 2) مقارنة كلمة المرور الحالية
//     const matchPassword = await bcrypt.compare(password, userExit.password);
//     if (!matchPassword) {
//       return res.json({ error: true, msg: "Current password wrong" });
//     }

//     // 3) تجهيز كلمة المرور الجديدة
//     let newPassword;
//     if (newPass) {
//       newPassword = bycrpt.hashSync(newPass, 10);
//     } else {
//       newPassword = userExit.password;
//     }

//     // 4) تحديث المستخدم
//     const user = await User.findByIdAndUpdate(
//       req.params.id,
//       {
//         name: name,
//         phone: phone,
//         email: email,
//         password: newPassword,
//         images: images,
//       },
//       { new: true }
//     );

//     if (!user) {
//       return res.status(400).json({ msg: "User Not Found!" });
//     }

//     res.send(user);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ msg: "Server Error" });
//   }
// });

// // ===================================================================
// // 🟢 تسجيل مستخدم جديد
// // ===================================================================
// // router.post("/register", async (req, res) => {
// //   try {
// //     const { name, email, password } = req.body;

// //     const exist = await User.findOne({ email });
// //     if (exist) return res.json({ success: false, msg: "Email already exists" });

// //     const user = new User({ name, email, password, images: [] });
// //     await user.save();

// //     res.json({ success: true, user });
// //   } catch (err) {
// //     res.json({ success: false, msg: err.message });
// //   }
// // });

// // ===================================================================
// // 🟢 تسجيل دخول
// // ===================================================================
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });

//     if (!user || user.password !== password) {
//       return res.json({ success: false, msg: "Invalid login" });
//     }

//     res.json({ success: true, userId: user._id, email: user.email });
//   } catch (err) {
//     res.json({ success: false, msg: err.message });
//   }
// });

// // ===================================================================
// // 🟢 رفع الصور وربطها بالمستخدم
// //    POST → /api/user/:id/upload
// // ===================================================================
// router.post("/:id/upload", upload.array("images", 10), async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) return res.json({ success: false, msg: "User not found" });

//     const newImages = req.files.map((f) => f.filename);
//     user.images.push(...newImages);
//     await user.save();

//     res.json({ success: true, images: user.images });
//   } catch (err) {
//     res.json({ success: false, msg: err.message });
//   }
// });

// // ===================================================================
// // 🟢 حذف كل الصور المؤقتة
// // ===================================================================
// router.delete("/deleteAllImages", (req, res) => {
//   try {
//     if (!fs.existsSync(uploadDir)) return res.json({ success: false, msg: "Folder not found" });

//     const files = fs.readdirSync(uploadDir);
//     files.forEach((f) => fs.unlinkSync(path.join(uploadDir, f)));

//     res.json({ success: true, msg: "All images deleted" });
//   } catch (err) {
//     res.status(500).json({ success: false, msg: err.message });
//   }
// });

// // ===================================================================
// // 🟢 جلب مستخدم
// //    GET → /api/user/:id
// // ===================================================================
// router.get("/:id", async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) return res.json({ success: false, msg: "User not found" });
//     res.json(user);
//   } catch (err) {
//     res.json({ success: false, msg: err.message });
//   }
// });

// // ===================================================================
// // 🟢 تحديث مستخدم
// //    POST → /api/user/:id
// // ===================================================================
// // تحديث مستخدم → استبدال الصور القديمة بالجديدة
// router.post("/:id", upload.single("image"), async (req, res) => {
//   try {
//     const { name, phone } = req.body;
//     const user = await User.findById(req.params.id);
//     if (!user) return res.json({ success: false, msg: "User not found" });

//     if (name) user.name = name;
//     if (phone) user.phone = phone;

//     // حذف الصورة القديمة إذا موجودة
//     if (user.images.length > 0) {
//       user.images.forEach(img => {
//         const filePath = path.join(uploadDir, img);
//         if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
//       });
//       user.images = [];
//     }

//     // لو فيه صورة جديدة
//     if (req.file) {
//       user.images.push(req.file.filename);
//     }

//     await user.save();

// return res.json({ success: true, msg: "Updated successfully", user });
//   } catch (err) {
//     res.json({ success: false, msg: err.message });
//   }
// });


// module.exports = router;









const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ============================================================
// 🟢 إعداد رفع الصور
// ============================================================
const uploadDir = path.join(__dirname, "../upload/user/");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// ============================================================
// 🟢 Signup
// ============================================================
router.post("/signup", async (req, res) => {
  const { name, phone, email, password, isAdmin } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(404).json({ msg: "User already exists!" });

    const hashPassword = await bcrypt.hash(password, 10);

    const result = await User.create({
      name,
      phone,
      email,
      password: hashPassword,
      isAdmin,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.JSON_WEB_SECRET_KEY
    );

    res.status(200).json({ user: result, token });
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "Error creating user" });
  }
});

// ============================================================
// 🟢 Change Password
// ============================================================
router.put(`/changePassword/:id`, async (req, res) => {
  try {
    const { name, phone, email, password, newPass, images } = req.body;

    const userExit = await User.findOne({ email : email});
    if (!userExit)
      return res.status(404).json({ error: true, msg: "User not found!" });

    const matchPassword = await bcrypt.compare(password, userExit.password);
    if (!matchPassword) {
      return res.json({ error: true, msg: "Current password wrong" });
    }
    else
    {
      let newPassword;
    if (newPass) {
      newPassword = await bcrypt.hashSync(newPass, 10);
    } else {
      newPassword = userExit.password;
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        name,
        phone,
        email,
        password: newPassword,
        images,
      },
      { new: true }
    );

    if (!user) return res.status(404).json({ msg: "User not found!" });

    res.send(user);
    }

    
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
});


router.get(`/` , async (req ,res )=> {

  const userList = await User.find();
  try {
    if(!userList)
    {
      res.status(404).json({success: false})
    }
    return res.send(userList);
    
  } catch (error) {
    console.log(error);
    res.status(400).json({success: false})
  }
});
//Count The Users 
router.get("/get/count", async (req, res) => {
  const usersCount = await User.countDocuments();
  if (!usersCount) {
    res.status(500).json({ success: false });
  }
return  res.send({
    usersCount: usersCount,
  });
});
// ============================================================
// 🟢 Login
// ============================================================
router.post(`/signin`, async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({email});
    if (!existingUser) {
      return res.status(404).json({ msg: "User not found!" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ msg: "Invalid password!" });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JSON_WEB_SECRET_KEY,
      { expiresIn: "7d" }
    );

    res.status(200).json({ user: existingUser, token: token ,
      msg:"user Authenticated"

     });
  } catch (error) {
    console.error("Signin Error Details:", error);
    res.status(500).json({ msg: "Signin failed", error: error.message });
  }
});

// ============================================================
// 🟢 رفع الصور لمستخدم
// ============================================================
router.post("/:id/upload", upload.array("images", 10), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.json({ success: false, msg: "User not found" });

    const newImages = req.files.map((f) => f.filename);
    user.images.push(...newImages);
    await user.save();

    res.json({ success: true, images: user.images });
  } catch (err) {
    res.json({ success: false, msg: err.message });
  }
});




router.post(`/authWithGoogle`, async (req , res )=>{
  const {name , phone ,  email , password , images , isAdmin } = req.body ;

try {
  const existUser = await User.findOne({email : email });
  if(!existUser){
    const result = await User.create({
      name: name,
      phone:phone ,
      email:email,
      password:password ,
      images:images ,
      isAdmin: isAdmin 

    });
    const token = jwt.sign({email:result.email , id: result._id }, process.env.JSON_WEB_SECRET_KEY);
    return res.status(200).json({
      user: result,
      token: token,
      msg: "user Login Succesfully  "
    })
  }
  else
  {
    const existingUser = await User.findOne({email: email});
    const token  = jwt.sign({
      email: existingUser.email , id : existingUser._id },process.env.JSON_WEB_SECRET_KEY);
      return res.status(200).json({user: existUser,
        user :  existingUser ,
        token: token ,
        msg : "user Login succesfully !"

      })
    
      
  }
} catch (error) {
   console.log(error);
   res.status(404).json({msg:"user not found"});
    // 
}

});
// ============================================================
// 🟢 حذف جميع الصور
// ============================================================
router.delete("/deleteAllImages", (req, res) => {
  try {
    if (!fs.existsSync(uploadDir))
      return res.json({ success: false, msg: "Folder not found" });

    const files = fs.readdirSync(uploadDir);
    files.forEach((f) => fs.unlinkSync(path.join(uploadDir, f)));

    res.json({ success: true, msg: "All images deleted" });
  } catch (err) {
    res.json({ success: false, msg: err.message });
  }
});

// ============================================================
// 🟢 جلب مستخدم
// ============================================================
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.json({ success: false, msg: "User not found" });

    res.json(user);
  } catch (err) {
    res.json({ success: false, msg: err.message });
  }
});

// ============================================================
// 🟢 تحديث مستخدم (مع استبدال الصور)
// ============================================================
router.post("/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, phone } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) return res.json({ success: false, msg: "User not found" });

    if (name) user.name = name;
    if (phone) user.phone = phone;

    if (user.images.length > 0) {
      user.images.forEach((img) => {
        const filePath = path.join(uploadDir, img);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      });
      user.images = [];
    }

    if (req.file) user.images.push(req.file.filename);

    await user.save();

    res.json({ success: true, msg: "Updated successfully", user });
  } catch (err) {
    res.json({ success: false, msg: err.message });
  }
});

module.exports = router;

