const express = require('express');
const router = express.Router();
//Controller
const {profileCreate, readProfile, updateProfile} = require('../controllers/profileController');
//Middleware
const {authVerify} = require('../middlewares/authVerifyMiddleware');

router.post("/userRegistration", profileCreate);
router.get("/readProfile", authVerify, readProfile);
router.post("/updateProfile", authVerify, updateProfile);




module.exports = router;