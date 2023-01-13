const profileModel = require('../models/profileModel');
const jwt = require('jsonwebtoken');


exports.userLogin = async (req, res)=> {
    const user = req.body['userName'];
    const password = req.body['password'];
    const Query = {userName:user, password:password};   //req.body userName and password == database userName and password  
    const Projection =" "  //All field
    profileModel.find(Query,Projection,(err, data)=>{
        if(err){
            res.status(401).json({status:"Fail", data:err}) 
        }
        else{
            if(data.length >0){

                //jwt token create
               let payLoad = {
                // exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data: data[0]
                };
                let token = jwt.sign(payLoad, process.env.secret); 
                //response
                 res.cookie("token", token, {
                    path: "/",
                    httpOnly: true,
                    expires: new Date(Date.now() + 7* 1000 * 86400), // 7 day
                    sameSite: "none",
                    secure: false,
                  });
                res.status(200).json({status: "Login Success"});
                
            }
            else{
               res.status(401).json({status:"Unauthorized"})  
            }
           
        }
    })
 
            // res.status(200).json({status:"Success", userName, password})
      
}




exports.logout = async (req, res) => {
   await res.cookie("token", "", {
      path: "/",
      httpOnly: true,
      expires: new Date(0),
      sameSite: "none",
      // secure: true,
    });
    return res.status(200).json({ message: "Successfully Logged Out" });
  };