import React, { createContext, useEffect, useState } from "react";
import ProjectBar from "../component/ProjectBar.jsx";
import List from "../component/List.jsx";
import axios from "axios";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

import { getProject,addList, deleteProject,updateProject } from "../../api/apis.js";
import { Form } from "react-router-dom";

export const projectContext = createContext();

function Dashboard() {
    const [project, setProject] = useState("first");
    const [isHtag, setIsHtag] = useState(true); //list update form
    const [toggleAdd, setToggleAdd] = useState(true);
    const [newList, setNewList] = useState("")  // add new list from input
    
    const queryClient = useQueryClient()
    
    const { isLoading, isError, data, error } = useQuery([project], () =>
    getProject(project)
    );
    const [title, setTitle] = useState(data?.title);

      const addListMutation = useMutation(addList, {
        onSuccess: ()=>{
          queryClient.invalidateQueries(project);
        }
      });
      const deleteProjectMutation = useMutation(deleteProject, {
        onSuccess: ()=>{
          queryClient.invalidateQueries(project);
          setProject('first')
        }
      })
      const updateProjectMutation = useMutation(updateProject, {
        onSuccess: () => {
            queryClient.invalidateQueries(project);
        },
    });

    const handleSubmit = (e) =>{
      e.preventDefault()
      addListMutation.mutate({projectID: data._id, title: newList })
      setNewList('')
    }
    const handleUpdateProjectSubmit = (e)=>{
      setIsHtag(true);
      e.preventDefault()
      updateProjectMutation.mutate({projectID: data._id, title })
    }

    return (
        <>
        
            <ProjectBar onClick={setProject} />
            <div className="flex  justify-between px-2 py-1 w-100 border-b-2 border-black place-items-center">
{
  isHtag ?  <h1 className="text-3xl" onClick={()=> setIsHtag(false)}>{data?.title}</h1> :
   <form onSubmit={handleUpdateProjectSubmit}>

<input
                    type="text"
                    id="project_title"
                    defaultValue={data?.title}
                    className="border-2 border-gray-300 rounded px-2 py-1"
                    onClick={handleUpdateProjectSubmit}
                    autoFocus
                    onChange={(e) => setTitle(e.target.value)}
                />
   </form>
}
             


              <div className="inline-flex gap-2">
                <button className="px-2 py-1 border-2 border-red-600 rounded hover:bg-red-600 hover:text-white"
                onClick={()=> deleteProjectMutation.mutate(data._id)}>Delete</button>
              </div>

            </div>
            <div className=" w-100 h-[100vh]  flex  p-10 gap-4 overflow-auto flex-nowrap ">
              <projectContext.Provider value={data?.lists}>
                {data?.lists.map((list, key) => {
                    return (
                        <List
                            title={list.title}
                            key={list._id}
                            listID={list._id}
                            projectID={data._id}
                        />
                    );
                })}
              </projectContext.Provider>
                <button
                    className="h-fit min-w-[25%] px-5 py-2 bg-white text-black rounded "
                    onClick={() => setToggleAdd(!toggleAdd)}
                    style={{display: toggleAdd ? "block": "none" }}
                >
                    
                    add a list
                </button>

                <form onSubmit={handleSubmit}
                    action=""
                    className="min-w-[25%] bg-white h-fit px-2 py-1 rounded" style={{display: toggleAdd ? "none": "block" }}
                >
                    <input
                        className="focus border-2 border-black-400 focus:outline-blue-700 focus:outline-2 rounded w-full px-1 "
                        type="text"
                        name="title"
                        placeholder="enter a title"
                        value={newList}
                        onChange={(e) => setNewList(e.target.value)}
                    />
                    <div className="inline-flex gap-2 mt-1">
                        <button type="button" className="px-2 py-1 bg-[#616a71] text-white rounded" onClick={() => setToggleAdd(!toggleAdd)}>
                            cancel
                        </button>
                        <button type="submit" className="px-2 py-1 bg-[#1f1c2f] text-white rounded">
                            add
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Dashboard;
