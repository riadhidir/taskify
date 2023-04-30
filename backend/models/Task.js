import mongoose from "mongoose";
const {Schema, model} = mongoose;

const taskSchema = new Schema({
    title:{
        type:String,
        required: true
    },
    description:{
        type:String, 
        default :""
    },
    list:{
        type:Schema.Types.ObjectId,
        ref:"List"
    }
    
},{timestamps:true});




const Task = new model("Task", taskSchema);
export default Task;