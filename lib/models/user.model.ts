import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    bio:  String,
    image: String,
    threads:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thread'
    }
    ],
    onboarded:{
        type: Boolean,
        default: false
    },
    communities: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Community'
    }]
})


const user = mongoose.models.User || mongoose.model('User',UserSchema);


export default user;