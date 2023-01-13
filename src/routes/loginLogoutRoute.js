const express = require('express');
const router = express.Router();
//Controller
const {userLogin,logout} = require('../controllers/loginController');


router.post("/userLogin", userLogin);
router.get("/userLogout", logout);




module.exports = router;