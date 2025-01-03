import { useState } from "react";
import Button from "../../UIKit/Button";
import { OpenProject } from "../../tools/project";
import { invoke } from "@tauri-apps/api/core";
import Input from "../../UIKit/Input";
import { ProjectStruct } from "../../packages/engine.project";
import Cookies from 'js-cookie';

export default function Open() {
    const [path, setPath] = useState('');
    const project: ProjectStruct = {
        _project_name: Cookies.get('project.name') || '',
        _project_type: Cookies.get('project.type') || '',
        _template: Cookies.get('project.template') || '',
        _path: path
    }
    const [filesAndDirs, setFilesAndDirs] = useState<string[]>([]);

    const handlePathChange = (newPath: string) => {
        setPath(newPath);
        invoke('return_files_and_directories', { path: newPath })
            .then((message) => setFilesAndDirs(message as string[]))
            .catch((error) => console.error(error));
    };

    const updateDir = (value: string ) => {
        handlePathChange(`${path}${value}/`);
    };

    return (
        <>
            <div className="justify-center items-center flex h-screen">
                <div className="w-auto">
                    <h1 className="text-white text-4xl p-10 text-center font-bold">Open Project</h1>
                    <div className="bg-white w-96 h-96 rounded-xl shadow-lg p-4">
                        <div className="items-center gap-2 justify-center p-4">
                            <Input placeholder="Project Path" value={path} onchange={(e) => handlePathChange(e.target.value)} />
                        </div>
                        <div className="bg-black rounded-xl overflow-x-hidden overflow-y-auto w-full h-60">
                            {filesAndDirs.map((file, index) => (
                                <button onClick={() => updateDir(file)} key={index} className="text-white p-3 cursor-pointer">{file}</button>
                            ))}
                        </div>
                    </div>
                    <Button text="Open" func={() => OpenProject(project)}/>
                    <Button text="Back" func={() => window.location.href = "/"}/>
                </div>
            </div>
        </>
    )
}