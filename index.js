require('dotenv').config();
const express = require('express');
const {connect} = require('./mongoconnection');
const uuid  = require('uuid');
const AccountModel  = require('./account');
const DebitModel  = require('./debit');
const {createConnection} = require('./redix.connection');
connect()
const client  = createConnection();
const app = express();

app.use(express.json());

app.disable('x-powered-by')

client.on('connect',()=>{
    console.log('Redis connected successfully.');
})

client.on('error', (error)=>{
    console.error("The redis error ", error);
})

app.post('/key/:userId', async (req, res)=>{
    try {
        let {userId}  = req.params;
        let uniqueId  = uuid.v4();
        await client.set(uniqueId , userId);
        return  res.status(200).json({ message : "Idempotency Key generated", key : uniqueId}) 
    }
    catch(error){
        return res.status(500).json({message : "Something went wrong"});
    }
})

app.post('/account/:key', async (req, res, next)=>{
     try {
        let {key} = req.params;
        let IdempotentKey = await client.get(key);
        if(IdempotentKey){
            next()
        }
        else {
            return res.status(200).json({ message : "Successfully done"})
        }
     }
     catch(error){
        return res.status(500).json({message : "Something went wrong"});
     }
},  async (req, res)=>{
    let {key } = req.params;
    let debit  = await DebitModel.findOne({reqId : key});
    let account = await AccountModel.findOne({reqId : key})
    if(!debit){
        await DebitModel.create({ name : req.body.name, reqId : key})
    }
    if(!account){
        await AccountModel.create({...req.body, reqId : key })
    }
    await client.del(key)
    return res.status(200).json({ message :"account created successfully"})
})


app.get('/user',async (req, res)=>{
    try {
        await client.set('name', 'akash');
        return res.status(200)
    }
    catch(error){
        console.error(error);
    }
})

app.post('/user', async (req, res)=>{
    try {
        return res.status(200).json({message :"post method of the  user response"});
    }
    catch(error){
        console.log("the error ", error);
    }
})
app.get('/users',  async (req, res)=>{
    try{
    
    const name  = await client.get('name')
    return res.status(200).json({message :'get all users running '+name  })
    }
    catch(error){
        console.error(error);
    }
})

const PORT  =process.env.PORT || 9000;

app.listen(PORT , (err)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log("Server is running on ", PORT);
})
