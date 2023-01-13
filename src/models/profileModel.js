const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
    firstName : {type: String},
    lastName : {type: String},
    mobile:{
        type: String,
        validate:{
            validator:(value)=>{
                // if(value.length!==11){
                //     return false
                // }
                // else{
                //     return true
                // }

                return /^(?:(?:\+|00)88|01)?\d{11}$/.test(value);
            },
            message:"must be 11 digit required"
        }  
    },
    email:{
        type: String,
        unique: [true,"all ready registered this email"],
        required: [true,"Must be input a email"],
        validate:{
            validator:(email)=>{
                return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
            },
            message:"must be correct email required"
        }  
    },
    userName : {type: String, unique: true},
    password : {type: String}
},
{versionKey: false
});
const profileModel = mongoose.model('profiles', profileSchema)
module.exports = profileModel;