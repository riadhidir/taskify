// import List from "../models/List.js";
import Project from "../models/Project.js";


export const addList = async (req,res) => {

    const projectID = req.params.id;  
    const {title} = req.body; 
    const project = await Project.findById(projectID);
    project.lists.push({title});
    project.save();
    res.status(200).json({list:project.lists[project.lists.length-1]});
     
}

//get all lists created in a specific project
export const getLists = async (req,res) => {
    const projectID = req.params.id;
    const project = await Project.findById(projectID);
    res.status(200).json(project.lists);
}
//get a specific list created in a specific project
export const getList = async (req,res) => {
    const {projectID,listID} =  req.params;

    const project = await Project.findById(projectID);
    res.status(200).json(project.lists.id(listID));
}

//remove specific list from a specific project
export const removeList = async (req, res) => {
    const {projectID,listID} =  req.params;
    const project = await Project.findById(projectID);
    project.lists.pull(listID);
    project.save();
    res.status(200).json({message: "List deleted Successfully!"});
     
}

export const updateList = async (req, res) => {
    const {title} = req.body; 
    const {projectID,listID} =  req.params;

    try{
        const project = await Project.findById(projectID);
        project.lists.id(listID).title = title ;

         project.save()
            res.status(200).json({message: "List updated Successfully!"});
      
    }catch(error){
        res.status(400).json({error:error.message});
    }
}