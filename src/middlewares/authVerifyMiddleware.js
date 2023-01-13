var jwt = require('jsonwebtoken');
//Decode
exports.authVerify = async(req, res, next)=>{
    try {
        const token = await req.cookies.token;
        if (!token) {
             res.status(401).json({Error:"Unauthorized, please login"})
        } 
        await jwt.verify(token, process.env.secret, (err, decoded)=>{
            if(err){
                res.status(401).json({status:"Fail", Data:err})
            }
            else{
                const user = decoded.data.userName;
            
                if (!user) {
                    res.status(401);
                    throw new Error("User not found");
                  }
                  req.user = user;
             
                next()
            }
        })
    } catch (error) {
         res.status(401).json({Error:error.message})
    }
}