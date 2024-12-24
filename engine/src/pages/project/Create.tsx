import { useState } from "react";
import { ProjectStruct, templates } from "../../packages/engine.project/index";
import Button from "../../UIKit/Button";
import Input from "../../UIKit/Input";

export default function Create() {
    const [projectType, setProjectType] = useState("");
    const [projectName, setProjectName] = useState("");
    let project: ProjectStruct = {
        _project_name: projectName,
        _project_type: projectType,
        _template: ""
    }

    function create() {

    }

    return (
        <>
        <div className="justify-center items-center flex h-screen">
            <div className="w-auto">
                <h1 className="text-white text-4xl p-10 text-center font-bold">Create Project</h1>
                <div className="bg-white w-96 h-96 rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-2">
                        <Input 
                            placeholder="Project Name" 
                            onchange={(e: React.ChangeEvent<HTMLInputElement>) => setProjectName(e.target.value)}
                        />
                        <select 
                            value={projectType} 
                            onChange={(e) => setProjectType(e.target.value)} 
                            className="border border-gray-300 rounded-md font-bold p-2 shadow-md h-10"
                        >
                            <option value="">Select Type</option>
                            <option value="2D">2D</option>
                            <option value="3D">3D</option>
                            <option value="Tilemap">Tilemap</option>
                        </select>
                    </div>
                </div>
                <Button text="Create" func={create}/>
                <Button text="Back" func={() => { window.location.href="/"}}/>
            </div>
        </div>
        </>
    )
}