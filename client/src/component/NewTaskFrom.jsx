import React, { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { addTask } from "../../api/apis";
function NewTaskFrom({ onCancel, list }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const queryClient = useQueryClient();
    
    const addTaskMutation = useMutation(addTask, {
        onSuccess: () => {
            queryClient.invalidateQueries(list);
        },
    });

    const handleNewTasksubmit = (e) => {
        // setIsPtag(true);
        e.preventDefault();

        addTaskMutation.mutate({ listID: list, title, description });
        setTitle("");
        setDescription("");
        onCancel(false);
    };

    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2  w-1/4  bg-white rounded h-fit px-3 py-2 z-50">
            <form
                onSubmit={handleNewTasksubmit}
                className="flex flex-col justify-center gap-2 shadow-sm"
            >
                <label htmlFor="task_title">title</label>
                <input
                    type="text"
                    id="task_title"
                    className="border-2 border-gray-300 rounded px-2 py-1"
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label htmlFor="task_desc">description</label>
                <textarea
                    className="border-2 border-gray-300 rounded px-2 py-1"
                    id="task_desc"
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

export default NewTaskFrom;
