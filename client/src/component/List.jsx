import React, { useState } from "react";
import Task from "./Task";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getTasks, updateList, deleteList } from "../../api/apis";
import Loader from "./Loader";
import NewTaskFrom from "./NewTaskFrom";

function List({ title, listID, projectID }) {
    const [list, setList] = useState(listID);
    const [isPtag, setIsPtag] = useState(true); //list update form
    const [listTitle, setListTitle] = useState(title); //list add form
    const [newTask, setNewTask] = useState(false); // show task modal

    const {
        data: tasks,
        isLoading,
        refetch,
    } = useQuery([list], () => getTasks(list));
    const queryClient = useQueryClient();
    const deleteListMutation = useMutation(deleteList, {
        onSuccess: () => {
            queryClient.invalidateQueries(projectID);
        },
    });
    const updateListMutation = useMutation(updateList, {
        onSuccess: () => {
            queryClient.invalidateQueries(list);
        },
    });

    const handleListSubmit = (e) => {
        setIsPtag(true);
        e.preventDefault();
        updateListMutation.mutate({ projectID, listID, title: listTitle });
    };
    return (
        <div className="min-w-[25%]    bg-[#1f1c2f]  flex flex-col  gap-2 overflow-auto  h-fit max-h-full rounded ">
            {newTask && <NewTaskFrom onCancel={setNewTask} list={list} />}
            <div className="px-2 py-2 inline-flex justify-between sticky top-0  bg-[#1f1c2f] ">
                {isPtag ? (
                    <p
                        className="text-white pt-2 "
                        onClick={() => setIsPtag(false)}
                    >
                        {title}
                    </p>
                ) : (
                    <form onSubmit={handleListSubmit} className="pt-2">
                        <input
                            type="text"
                            defaultValue={title}
                            onClick={handleListSubmit}
                            autoFocus
                            onChange={(e) => setListTitle(e.target.value)}
                        />
                    </form>
                )}
                {/* list's additional action */}
                <button
                    className="hover:bg-red-400"
                    onClick={() =>
                        deleteListMutation.mutate({ projectID, listID })
                    }
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="20"
                        viewBox="0 0 18 20"
                        fill="none"
                    >
                        <path
                            d="M0 4.52401C0 4.12901 0.327 3.81001 0.73 3.81001H5.518C5.524 2.96801 5.616 1.81501 6.45 1.01701C7.137 0.361781 8.05064 -0.0026011 9 1.39789e-05C9.94936 -0.0026011 10.863 0.361781 11.55 1.01701C12.384 1.81501 12.476 2.96801 12.482 3.81001H17.27C17.673 3.81001 18 4.13001 18 4.52401C17.999 4.61883 17.9792 4.71251 17.942 4.79971C17.9047 4.88691 17.8507 4.96591 17.7829 5.03222C17.7151 5.09852 17.6349 5.15082 17.5469 5.18613C17.4589 5.22144 17.3648 5.23907 17.27 5.23801H0.73C0.635184 5.23907 0.541089 5.22144 0.453087 5.18613C0.365085 5.15082 0.284901 5.09852 0.217113 5.03222C0.149325 4.96591 0.0952611 4.88691 0.0580087 4.79971C0.0207562 4.71251 0.00104477 4.61883 0 4.52401ZM8.607 20H9.394C12.101 20 13.454 20 14.334 19.137C15.215 18.274 15.305 16.857 15.485 14.026L15.745 9.94601C15.843 8.40901 15.891 7.64001 15.45 7.15401C15.008 6.66701 14.262 6.66701 12.771 6.66701H5.23C3.739 6.66701 2.993 6.66701 2.551 7.15401C2.11 7.64001 2.159 8.40901 2.256 9.94501L2.516 14.025C2.696 16.858 2.786 18.274 3.666 19.137C4.545 20 5.9 20 8.607 20Z"
                            fill="white"
                        />
                    </svg>
                </button>
            </div>

            {isLoading ? (
                <Loader />
            ) : (
                tasks?.map((task, key) => {
                    return (
                        <Task
                            title={task.title}
                            key={task._id}
                            id={task._id}
                            listTitle={title}
                            date={task.createdAt.substring(0, 10)}
                            refetchList={refetch}
                            list={list}
                            desc={task.description}
                        />
                    );
                })
            )}

            <div className=" sticky bottom-0 bg-[#1f1c2f]  w-full text-center px-1 py-2">
                <button
                    className="  h-fit w-[90%] bg-white hover:bg-gray-300 px-4  py-1 rounded text-black   "
                    onClick={() => setNewTask(true)}
                >
                    add Task
                </button>
            </div>
        </div>
    );
}

export default List;
