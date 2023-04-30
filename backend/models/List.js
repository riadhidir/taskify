import mongoose from "mongoose";

const {Schema} = mongoose;

export  const listSchema = new Schema({

    title:{
        type: String,
        required: true
    },
   
},{timestamps: true});


// const List  = new model("List", listSchema);
// export default List;