const ToDoModel = require('../models/ToDoListModel');

exports.ToDoCreate = (req, res)=> {
    let userName = req.user
    if(req.body){
        let {toDoSubject, toDoDescription,toDoStatus } = req.body
        
        let postData= {
            userName : userName,
            toDoSubject : toDoSubject,
            toDoDescription : toDoDescription,
            toDoStatus : toDoStatus || "New",
            toDoCreateDate : new Date().toISOString(),
            toDoUpdateDate :  new Date().toISOString()
        }
        ToDoModel.create(postData, (err, data)=>{
            if(err){
                res.status(400).json({status:"Fail", data:err})
            }
            else{
                res.status(200).json({status:"Success", data:data})
            }
        })
    }
    else{
        res.status(400);
        throw new Error("Invalid user data");
    }
}



exports.readToDoList = async (req, res)=> {
    const user = req.user
    const Query = {userName:user}
    // const Projection = "firstName lastName mobile email"
    await ToDoModel.find(Query,(err, data)=>{
            if(err){
                res.status(400).json({status:"Fail", data:err})
            }
            else{
                res.status(200).json({status:"Success", data:data})
            }
        }).select("-_id");
}


exports.ToDoUpdate = async (req, res)=> {
    const { toDoSubject, toDoDescription, ID} = req.body;
    const ToDoItem = {_id:ID};
    let toDoUpdateDate= new Date().toISOString();
    let postData={
        toDoSubject : toDoSubject,
        toDoDescription: toDoDescription,
        toDoUpdateDate: toDoUpdateDate
    }
    await ToDoModel.updateOne(ToDoItem, postData,{upsert:true},(err, data)=>{
        if(err){
            res.status(400).json({status:"Fail", data:err})
        }
        else{
            res.status(200).json({status:"Success", data:data})
        }
    })
}


exports.ToDoStatusUpdate = async (req, res)=> {
    const {toDoStatus, ID} = req.body;
    const ToDoItem = {_id:ID};
    let toDoUpdateDate= new Date().toISOString();
    let postData={
        toDoStatus : toDoStatus,
        toDoUpdateDate: toDoUpdateDate
    }
    await ToDoModel.updateOne(ToDoItem, postData,{upsert:true},(err, data)=>{
        if(err){
            res.status(400).json({status:"Fail", data:err})
        }
        else{
            res.status(200).json({status:"Success", data:data})
        }
    })
}



exports.removeToDo = async (req, res)=> {
    const {ID} = req.body;
    const ToDoItem = {_id:ID};
    await ToDoModel.remove(ToDoItem,(err, data)=>{
        if(err){
            res.status(400).json({status:"Fail", data:err})
        }
        else{
            res.status(200).json({status:"Success", data:data})
        }
    })
}



exports.ToDoFilterByStatus = async (req, res)=> {
    const user = req.user
    const {toDoStatus} = req.body;
    const Query = {userName:user, toDoStatus: toDoStatus }
    // const Projection = "firstName lastName mobile email"
    await ToDoModel.find(Query,(err, data)=>{
            if(err){
                res.status(400).json({status:"Fail", data:err})
            }
            else{
                res.status(200).json({status:"Success", data:data})
            }
        }).select("-_id");
}



exports.ToDoFilterByDate = async (req, res)=> {
    const user = req.user
    const {FromDate, ToDate} = req.body;
    const Query = {userName:user, toDoCreateDate:{$gte:new Date(FromDate).toISOString(),$lte:new Date(ToDate).toISOString()}}
    await ToDoModel.find(Query,(err, data)=>{
            if(err){
                res.status(400).json({status:"Fail", data:err})
            }
            else{
                res.status(200).json({status:"Success", data:data})
            }
        });
}