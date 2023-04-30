import  { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { addProject } from "../../api/apis";

function NewProject({ onCancel, projects }) {
    const [title, setTitle] = useState("");
  

    const queryClient = useQueryClient();
    
    const addProjectMutation = useMutation(addProject, {
        onSuccess: () => {
            queryClient.invalidateQueries("projects");
        },
    });

    const handleNewProjectsubmit = (e) => {
        // setIsPtag(true);
        e.preventDefault();

        addProjectMutation.mutate({ title});
        setTitle("");
        onCancel(false);
    };

    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2  w-1/4  bg-white rounded h-fit px-3 py-2 z-50">
            <form
                onSubmit={handleNewProjectsubmit}
                className="flex flex-col justify-center gap-2 shadow-sm"
            >
                <label htmlFor="project_title">title</label>
                <input
                    type="text"
                    id="project_title"
                    className="border-2 border-gray-300 rounded px-2 py-1"
                    onChange={(e) => setTitle(e.target.value)}
                />

                
               
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

export default NewProject;
