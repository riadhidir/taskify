import React, { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateTask } from "../../api/apis";
function EditTaskForm({ onCancel, list ,title,desc,taskID}) {

    const [_title, set_Title] = useState(title);
    const [description , setDescription] = useState(desc)
    const queryClient = useQueryClient();
    const updateTaskMutation = useMutation(updateTask, {
        onSuccess: () => {
            queryClient.invalidateQueries(list);
        },
    });

    const handleEditTasksubmit = (e) => {
        e.preventDefault();

        updateTaskMutation.mutate({ taskID, title:_title, description });
      
        onCancel(false);
    };

    return (
       
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2  w-1/4  bg-white rounded h-fit px-3 py-2 z-50 border-2 border-black">
            <form
                onSubmit={handleEditTasksubmit}
                className="flex flex-col justify-center gap-2 shadow-sm"
            >
                <label htmlFor="task_title">title</label>
                <input
                    type="text"
                    id="task_title"
                    defaultValue={_title}
                    className="border-2 border-gray-300 rounded px-2 py-1"
                    onChange={(e) => set_Title(e.target.value)}
                />

                <label htmlFor="task_desc">description</label>
                <textarea
                    className="border-2 border-gray-300 rounded px-2 py-1"
                    id="task_desc"
                    defaultValue={description}
                    rows={4}
                    style={{ resize: "none" }}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <div className="inline-flex w-full justify-end gap-2">
                    <button
                        type="button"
                        className="px-2 py-1 bg-[#616a71] rounded text-white"
                        onClick={() => onCancel(false)}
                    >
                        cancel
                    </button>
                    <button
                        type="submit"
                        className="px-2 py-1 bg-[#1f1c2f] rounded text-white"
                    >
                        save
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditTaskForm;
