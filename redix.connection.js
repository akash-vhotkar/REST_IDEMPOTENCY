const  redis  = require('redis');
const createConnection = ()=>{
    const client  = redis.createClient({
        url:'redis://localhost:6379',
        socket:{
            host :'localhost',
            port : 6379
        }
    })
    client.connect();

    return client;
   
}
module.exports  =  {
    createConnection
    
}
