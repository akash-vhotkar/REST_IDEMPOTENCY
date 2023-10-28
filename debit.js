const mongoose  = require('mongoose');
const DebitSchema  = new mongoose.Schema({
    reqId :{
         type : String ,
         default : null 
    },
    name :{
        type :String ,
        default: null 
    }
})

module.exports  = mongoose.model('debit', DebitSchema)
