const profileModel = require('../models/profileModel');

exports.profileCreate = (req, res)=> {
    const bodyData = req.body;

    profileModel.create(bodyData, (err, data)=>{
        if(err){
            res.status(400).json({status:"Fail", data:err})
        }
        else{
            res.status(200).json({status:"Success", data:data})
        }
    })
}


exports.readProfile = async (req, res)=> {
    const user = req.user
    const Query = {userName:user}
    // const Projection = "firstName lastName mobile email"
    await profileModel.find(Query,(err, data)=>{
            if(err){
                res.status(400).json({status:"Fail", data:err})
            }
            else{
                res.status(200).json({status:"Success", data:data[0]})
            }
        }).select("-password");
}



exports.updateProfile = async (req, res)=> {
    const user = req.user
    const reqData = req.body
    const Query = {userName:user}
    const updateData={$set:reqData}
    await profileModel.updateOne(Query, updateData,{upsert:true},(err, data)=>{
        if(err){
            res.status(400).json({status:"Fail", data:err})
        }
        else{
            res.status(200).json({status:"Success", data:data})
        }
    })
}

