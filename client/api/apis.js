import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000"
})
export const getProjects = async () => {
    const results = await api.get('/projects');
    return results.data;
}

export const getProject = async (projectID ) => {
    const results = await api.get(`/projects/${projectID}`);
    return results.data;
}
// export const fetchLists = async (path) => {
    
//     const results = await axios.get(`http://localhost:3000${path}/lists`);
//     return results.data;
// }


export const getTasks = async (listID) => {
    const results = await api.get(`/lists/${listID}/tasks`);
    return results.data;
}

export const deleteTask = async (taskID) => {
     return await api.delete(`/tasks/${taskID}`);
}



export const updateList = async (list) => {
    await api.put(`/projects/${list.projectID}/lists/${list.listID}`,list);
}
export const updateProject = async (project) => {
    await api.put(`/projects/${project.projectID}`,project);
}

export const deleteList = async ({projectID,listID}) => {
     return await api.delete(`/projects/${projectID}/lists/${listID}`);
}
export const deleteProject = async (projectID) => {
    return await api.delete(`/projects/${projectID}`);
}

export const addList = async (list) => {
     return await api.post(`/projects/${list.projectID}/lists`,list);
}

export const addTask = async (task) => {
    return await api.post(`/lists/${task.listID}/tasks`,task);
}


export const addProject = async (project) => {
    return await api.post(`/projects`,project);
}

export const updateTask = async (task)=>{
    return await api.put(`/tasks/${task.taskID}`,task);

}
export const moveTask = async (task) => {
    return await api.put(`/tasks/${task.taskID}/move`, task)
}
export default api; 