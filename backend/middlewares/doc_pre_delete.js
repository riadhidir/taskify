import Project from "../models/Project.js";
import Task from "../models/Task.js";

export const pre_list = async (req, res, next) => {
    const listID = req.params.listID;
    const tasks = await Task.deleteMany({ list: listID });
    next();
};

export const pre_project = async (req ,res , next) => {

    const projectID = req.params.id; 
    const project = await Project.findById(projectID);
    await Task.deleteMany({list:{$in : project.lists}});
    next();
}