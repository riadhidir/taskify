import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import { getProjects } from "../../api/apis.js";
import NewProject from "./NewProject.jsx";

function ProjectBar({ onClick }) {
    const { data: projects } = useQuery(["projects"], getProjects);
    const [newProject, setNewProject] = useState(false);

    return (
        <div className="float-left w-20 h-[100vh] bg-white flex flex-col flex-nowrap items-center p-3 border gap-5  overflow-auto ">
            {newProject && (
                <NewProject projects={projects} onCancel={setNewProject} />
            )}
            <div>
                <button className="hidden">
                    <svg
                        className="aspect-square w-2/3 mx-auto"
                        viewBox="0 0 18 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M1 1H17"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M1 7H17"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M1 13H17"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>

                <button className="">
                    <svg
                        className="aspect-square w-1/2 mx-auto"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M14.781 13.7198C14.8507 13.7895 14.906 13.8722 14.9437 13.9632C14.9814 14.0543 15.0008 14.1519 15.0008 14.2504C15.0008 14.349 14.9814 14.4465 14.9437 14.5376C14.906 14.6286 14.8507 14.7114 14.781 14.781C14.7114 14.8507 14.6286 14.906 14.5376 14.9437C14.4465 14.9814 14.349 15.0008 14.2504 15.0008C14.1519 15.0008 14.0543 14.9814 13.9632 14.9437C13.8722 14.906 13.7895 14.8507 13.7198 14.781L7.50042 8.56073L1.28104 14.781C1.14031 14.9218 0.94944 15.0008 0.750417 15.0008C0.551394 15.0008 0.360523 14.9218 0.219792 14.781C0.0790615 14.6403 3.92322e-09 14.4494 0 14.2504C-3.92322e-09 14.0514 0.0790615 13.8605 0.219792 13.7198L6.4401 7.50042L0.219792 1.28104C0.0790615 1.14031 -1.48284e-09 0.94944 0 0.750417C1.48284e-09 0.551394 0.0790615 0.360523 0.219792 0.219792C0.360523 0.0790615 0.551394 1.48284e-09 0.750417 0C0.94944 -1.48284e-09 1.14031 0.0790615 1.28104 0.219792L7.50042 6.4401L13.7198 0.219792C13.8605 0.0790615 14.0514 -3.92322e-09 14.2504 0C14.4494 3.92322e-09 14.6403 0.0790615 14.781 0.219792C14.9218 0.360523 15.0008 0.551394 15.0008 0.750417C15.0008 0.94944 14.9218 1.14031 14.781 1.28104L8.56073 7.50042L14.781 13.7198Z"
                            fill="black"
                        />
                    </svg>
                </button>
            </div>

            {projects?.map((project, key) => {
                return (
                    <button
                        onClick={() => onClick(project._id)}
                        className="aspect-square  shrink-0 bg-red-100 w-full rounded-full shadow-xl border"
                        key={project._id}
                    ></button>
                );
            })}

            <button
                onClick={() => setNewProject(true)}
                className="aspect-square  shrink-0 bg-red-100 w-full rounded-full shadow-xl border flex place-content-center place-items-center"
            >
                <svg className="w-10 h-10"
                    xmlns="http://www.w3.org/2000/svg"
                   
                    viewBox="0 0 20 20"
                    fill="none"
                >
                    <path
                        d="M9 11V14C9 14.2833 9.096 14.521 9.288 14.713C9.48 14.905 9.71733 15.0007 10 15C10.2833 15 10.521 14.904 10.713 14.712C10.905 14.52 11.0007 14.2827 11 14V11H14C14.2833 11 14.521 10.904 14.713 10.712C14.905 10.52 15.0007 10.2827 15 10C15 9.71667 14.904 9.479 14.712 9.287C14.52 9.095 14.2827 8.99933 14 9H11V6C11 5.71667 10.904 5.479 10.712 5.287C10.52 5.095 10.2827 4.99933 10 5C9.71667 5 9.479 5.096 9.287 5.288C9.095 5.48 8.99933 5.71733 9 6V9H6C5.71667 9 5.479 9.096 5.287 9.288C5.095 9.48 4.99933 9.71733 5 10C5 10.2833 5.096 10.521 5.288 10.713C5.48 10.905 5.71733 11.0007 6 11H9ZM10 20C8.61667 20 7.31667 19.7373 6.1 19.212C4.88333 18.6867 3.825 17.9743 2.925 17.075C2.025 16.175 1.31267 15.1167 0.788 13.9C0.263333 12.6833 0.000666667 11.3833 0 10C0 8.61667 0.262667 7.31667 0.788 6.1C1.31333 4.88333 2.02567 3.825 2.925 2.925C3.825 2.025 4.88333 1.31267 6.1 0.788C7.31667 0.263333 8.61667 0.000666667 10 0C11.3833 0 12.6833 0.262667 13.9 0.788C15.1167 1.31333 16.175 2.02567 17.075 2.925C17.975 3.825 18.6877 4.88333 19.213 6.1C19.7383 7.31667 20.0007 8.61667 20 10C20 11.3833 19.7373 12.6833 19.212 13.9C18.6867 15.1167 17.9743 16.175 17.075 17.075C16.175 17.975 15.1167 18.6877 13.9 19.213C12.6833 19.7383 11.3833 20.0007 10 20ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18Z"
                        fill="black"
                    />
                </svg>
            </button>
        </div>
    );
}

export default ProjectBar;
