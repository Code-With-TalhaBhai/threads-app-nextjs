import mongoose from 'mongoose';

let isConnected = false;


export const connectToDb = async()=>{
    mongoose.set('strictQuery',true); // mode for schemas
    if(!process.env.MONGODB_URI) return console.log('MONGODB URI NOT FOUND');
    if(isConnected) return console.log('Already connected to mongodb');
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        isConnected = true;
        console.log('connected tyo db');
    } catch (error) {
        console.log(error);
    }
}