const mongoose  = require('mongoose');

let AccountShema  = new mongoose.Schema({
    reqId : {
       type : String ,
       default : null,
       required: true ,
       unique:  true
    }, 
    firstName :{
        type :String,
        default : null,

    },
    lastName : {
        type :String ,
        default : null 
    },
    accountNumber :{
        type: String ,
        default : null
    }   
})

module.exports  = mongoose.model('account',  AccountShema);
