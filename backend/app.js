import  express  from "express";
import mongoose from "mongoose";
import * as projectCtrl from "./controllers/projectController.js";
import * as listCtrl from "./controllers/listController.js";
import * as taskCtrl from "./controllers/taskController.js";
import * as mdlw from "./middlewares/doc_pre_delete.js";
import cors from  "cors"
mongoose.set('strictQuery', false);

const app = express()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

mongoose.connect("mongodb+srv://riadhidir5:riadhidir5@cluster0.aha4g2i.mongodb.net/?retryWrites=true&w=majority").then(()=>{
app.listen(3000, ()=>{console.log('http://localhost:3000')});
});

// app.get('/', async (req,res)=>{
//     const projet = await mongoose.model('Project').findById("64493d69ad094b6b48bd107b");
//     const lists = await  mongoose.model('List').deleteMany({_id :{$in :projet.list}});
//     console.log(lists)
// })
//works 
app.get('/projects', projectCtrl.getProjects);
app.get('/projects/:id', projectCtrl.getProject);
app.post('/projects', projectCtrl.addProject);
app.put('/projects/:id', projectCtrl.updateProject);
app.delete('/projects/:id',mdlw.pre_project, projectCtrl.removeProject); //on delete cascade

//list routes 
//works
app.get('/projects/:projectID/lists/:listID', listCtrl.getList);
app.get('/projects/:id/lists', listCtrl.getLists);
app.post('/projects/:id/lists', listCtrl.addList);
app.delete('/projects/:projectID/lists/:listID',mdlw.pre_list, listCtrl.removeList); // on delete cacade
app.put('/projects/:projectID/lists/:listID', listCtrl.updateList);


//task routes   

app.get('/lists/:id/tasks', taskCtrl.getTask);
app.post('/lists/:id/tasks', taskCtrl.addTask);
app.delete('/tasks/:id', taskCtrl.removeTask);
app.put('/tasks/:id', taskCtrl.updateTask);
app.put('/tasks/:id/move', taskCtrl.moveTask);

