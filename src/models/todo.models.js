import mongoose, { Schema, Types } from "mongoose";


const todoSchema = new Schema({
    task : {
        types : String,
        required : true,
        trim : true
    },
    createdBy : {
        types : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    repeat :{
        types : Boolean,
        default : false
    },
    repeatData:{
        types : String,
        trim : true,
        default : null
    }
},{timestamps:true})


export const Todo = mongoose.model('Todo',todoSchema)