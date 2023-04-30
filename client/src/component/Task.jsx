import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { deleteTask, moveTask } from "../../api/apis";
import { Dropdown } from "flowbite-react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import EditTaskForm from "./EditTaskForm";
import { projectContext } from "../pages/Dashboard";
function Task({ title, date, id, list ,desc}) {

        
        const [editTask, setEditTask] = useState(false);
        const queryClient = useQueryClient();

        const lists = useContext(projectContext);

        const deleteTaskMutation = useMutation(deleteTask, {
        onSuccess: () => {
            queryClient.invalidateQueries(list);
        },
    });

    const moveTaskMutation = useMutation(moveTask, {
        onSuccess: () => {

            queryClient.invalidateQueries(moveTaskMutation.targetListID);
            queryClient.invalidateQueries(list);
        },
    })



    return (
        <div className="w-[90%]  h-auto bg-white self-center rounded flex-none ">
            {/* <h1>{props.listTitle}</h1> */}
            {editTask && <EditTaskForm onCancel={setEditTask} list={list} title={title} desc={desc} taskID={id} />}
            <div className="w-full px-3 inline-flex justify-between items-center">
                <p className="indent-1 py-1">{title}</p>
                {/* <button >
                    <svg className="aspect-square basis-2"
                        width="16"
                        height="3"
                        viewBox="0 0 16 3"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M9.375 1.5C9.375 1.79667 9.28703 2.08668 9.12221 2.33336C8.95738 2.58003 8.72312 2.77229 8.44903 2.88582C8.17494 2.99935 7.87334 3.02906 7.58237 2.97118C7.29139 2.9133 7.02412 2.77044 6.81434 2.56066C6.60456 2.35088 6.4617 2.08361 6.40382 1.79264C6.34594 1.50166 6.37565 1.20006 6.48918 0.925975C6.60271 0.651886 6.79497 0.417618 7.04165 0.252796C7.28832 0.0879736 7.57833 0 7.875 0C8.27283 0 8.65436 0.158036 8.93566 0.43934C9.21697 0.720645 9.375 1.10218 9.375 1.5ZM1.5 0C1.20333 0 0.913319 0.0879736 0.666646 0.252796C0.419972 0.417618 0.227713 0.651886 0.114181 0.925975C0.000649922 1.20006 -0.0290551 1.50166 0.0288228 1.79264C0.0867006 2.08361 0.229562 2.35088 0.439341 2.56066C0.649119 2.77044 0.916394 2.9133 1.20737 2.97118C1.49834 3.02906 1.79994 2.99935 2.07403 2.88582C2.34811 2.77229 2.58238 2.58003 2.74721 2.33336C2.91203 2.08668 3 1.79667 3 1.5C3 1.10218 2.84197 0.720645 2.56066 0.43934C2.27936 0.158036 1.89783 0 1.5 0ZM14.25 0C13.9533 0 13.6633 0.0879736 13.4166 0.252796C13.17 0.417618 12.9777 0.651886 12.8642 0.925975C12.7507 1.20006 12.7209 1.50166 12.7788 1.79264C12.8367 2.08361 12.9796 2.35088 13.1893 2.56066C13.3991 2.77044 13.6664 2.9133 13.9574 2.97118C14.2483 3.02906 14.5499 2.99935 14.824 2.88582C15.0981 2.77229 15.3324 2.58003 15.4972 2.33336C15.662 2.08668 15.75 1.79667 15.75 1.5C15.75 1.10218 15.592 0.720645 15.3107 0.43934C15.0294 0.158036 14.6478 0 14.25 0Z"
                            fill="#1f1c2f"
                        />
                    </svg>
                </button> */}
                <Dropdown label="" inline={true}>
             
                    <Dropdown label="move"  placement="right" className="bg-white text-black">
                        {
                            lists.map((list, key)=>{
                                return <Dropdown.Item key={list._id} onClick={()=>{

                                   
                                    moveTaskMutation.mutate({taskID:id, targetListID:list._id})}}>{list.title}</Dropdown.Item>
                            })
                        }
                       
                    </Dropdown>
                    <Dropdown.Item onClick={()=>setEditTask(true)}>
                        Edit
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item className="text-red-600 hover:bg-red-600 hover:text-white" onClick={()=> deleteTaskMutation.mutate(id)}>Delete</Dropdown.Item>
                </Dropdown>
            </div>

            <div className="inline-flex justify-between w-full  px-2  pt-3 pb-1 border-t  items-baseline">
              {desc!="" && <p>
                    <svg
                        className="aspect-square w-4"
                        viewBox="0 0 24 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0 1.125C0 0.826631 0.118526 0.540483 0.329505 0.329505C0.540483 0.118526 0.826631 0 1.125 0H22.875C23.1734 0 23.4595 0.118526 23.6705 0.329505C23.8815 0.540483 24 0.826631 24 1.125C24 1.42337 23.8815 1.70952 23.6705 1.9205C23.4595 2.13147 23.1734 2.25 22.875 2.25H1.125C0.826631 2.25 0.540483 2.13147 0.329505 1.9205C0.118526 1.70952 0 1.42337 0 1.125ZM0 7.5C0 7.20163 0.118526 6.91548 0.329505 6.7045C0.540483 6.49353 0.826631 6.375 1.125 6.375H22.875C23.1734 6.375 23.4595 6.49353 23.6705 6.7045C23.8815 6.91548 24 7.20163 24 7.5C24 7.79837 23.8815 8.08452 23.6705 8.29549C23.4595 8.50647 23.1734 8.625 22.875 8.625H1.125C0.826631 8.625 0.540483 8.50647 0.329505 8.29549C0.118526 8.08452 0 7.79837 0 7.5ZM1.125 12.75C0.826631 12.75 0.540483 12.8685 0.329505 13.0795C0.118526 13.2905 0 13.5766 0 13.875C0 14.1734 0.118526 14.4595 0.329505 14.6705C0.540483 14.8815 0.826631 15 1.125 15H15.375C15.6734 15 15.9595 14.8815 16.1705 14.6705C16.3815 14.4595 16.5 14.1734 16.5 13.875C16.5 13.5766 16.3815 13.2905 16.1705 13.0795C15.9595 12.8685 15.6734 12.75 15.375 12.75H1.125Z"
                            fill="black"
                        />
                    </svg>
                </p>}  
                <p className="ms-auto">
                    <svg
                        className="aspect-square w-4 float-left mt-1 "
                        viewBox="0 0 18 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M2 20C1.45 20 0.979002 19.804 0.587002 19.412C0.195002 19.02 -0.000664969 18.5493 1.69779e-06 18V4C1.69779e-06 3.45 0.196002 2.979 0.588002 2.587C0.980002 2.195 1.45067 1.99933 2 2H3V0H5V2H13V0H15V2H16C16.55 2 17.021 2.196 17.413 2.588C17.805 2.98 18.0007 3.45067 18 4V18C18 18.55 17.804 19.021 17.412 19.413C17.02 19.805 16.5493 20.0007 16 20H2ZM2 18H16V8H2V18Z"
                            fill="black"
                        />
                    </svg>{" "}
                    <span className="ms-1">{date}</span>
                </p>
            </div>
        </div>
    );
}

export default Task;
