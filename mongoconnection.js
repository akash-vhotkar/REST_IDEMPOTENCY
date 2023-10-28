'use strict';

const mongoose = require('mongoose');

const DB_NAME  = 'SAMPLE_IDMPOT';
const DB_HOST  = 'localhost';
const DB_PORT  = 27017;


module.exports = {
    connect: () => {
        try {
            const connectionString = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
            console.log(connectionString);
            const options = { useNewUrlParser: true, useUnifiedTopology: true };
            mongoose.connect(connectionString, options).then(()=>{
                console.log("Database connected... ");
            
            }).catch(err => {
                if (err) {
                    console.log(err);
                }
            });
            mongoose.set('autoCreate', true);
            return mongoose;
        } catch (e) {
            console.log(e);
        }
    }
};