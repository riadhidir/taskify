import Project from "../models/Project.js";


export const addProject = async (req,res) => {
    const {title} = req.body; 
    if(! await Project.findOne({title})){
        const project =  await Project.create({title}); 
         res.status(200).json(project);
    }else{
        res.status(400).json({message: "project name already exist "});
    }

}
export const getProjects = async (req,res) => {
    const projects = await Project.find({},'title _id');
    res.status(200).json(projects);
}
export const getProject = async (req,res) => {
    const projectID = req.params.id || "first"; 
    let project ;
    if(projectID !== "first"){
    project = await Project.findById(projectID);
    res.status(200).json(project);
    }else{
        project = await Project.findOne({});
    res.status(200).json(project);
    }
 
}

export const removeProject = async (req, res) => {
    const projectID = req.params.id;
    if(! await Project.findById(projectID)){
        res.status(400).json({message: "project not found"});
    }else{
        await Project.deleteOne({_id:projectID });
        res.status(200).json({message: "project deleted Successfully!"});
    }
    
}

export const updateProject = async (req, res) => {
    const {title} = req.body; 
    const projectID = req.params.id; 
    try{
        const project = await Project.findById(projectID);
        if(! project){
            res.status(400).json({message: "Project not found"});
        }else{
            project.title = title;
            project.save();
            res.status(200).json({message: "Project updated Successfully!"});
        }  
    }catch(error){
        res.status(400).json({error:error.message});
    }
}