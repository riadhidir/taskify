import Task from "../models/Task.js";
// import List from "../models/List.js";


export const addTask = async (req,res) => {
    const listID = req.params.id;  
    const {title, description} = req.body; 
    
    const task = await Task.create({title,description, list:listID});

         res.status(200).json(task);
     
}

export const getTask = async (req,res) => {
    const listID = req.params.id;
    const tasks = await Task.find({list:listID});
    res.status(200).json(tasks);
}

export const removeTask = async (req, res) => {
    const taskID = req.params.id;
    if(! await Task.findById(taskID)){
        res.status(400).json({message: "Task not found"});
    }else{
        await Task.deleteOne({_id:taskID });
        res.status(200).json({message: "Task deleted Successfully!"});
    }    
}

export const updateTask = async (req, res) => {
    const {title,description} = req.body; 
    const taskID = req.params.id; 
    try{
        const task = await Task.findById(taskID);
        if(! task){
            res.status(400).json({message: "Task not found"});
        }else{
            task.title = title;
            task.description = description;
            task.save();
            res.status(200).json({message: "Task updated Successfully!"});
        }  
    }catch(error){
        res.status(400).json({error:error.message});
    }
}

export const moveTask = async (req,res) => {

    const {targetListID} = req.body;
    const taskID = req.params.id;

    const task = await Task.findById(taskID);
    console.log(task.list);

    task.list = targetListID;
    console.log(task.list);
     task.save();
    res.status(200).json({message:"moved Successfully" })

}