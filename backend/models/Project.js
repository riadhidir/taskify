import mongoose from "mongoose";
import {listSchema} from './List.js'
const {Schema ,model} = mongoose ;

const projectSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    lists: [{
        type: listSchema,
        default : ()=>{}
    }]

}, {timestamps:true});



const Project = new model('Project', projectSchema);

export default Project; 
