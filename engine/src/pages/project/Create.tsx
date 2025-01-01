import { useState } from "react";
import { ProjectStruct, templates } from "../../packages/engine.project/index";
import Button from "../../UIKit/Button";
import Input from "../../UIKit/Input";
import { OpenProject } from "../../tools/project";
import { invoke } from "@tauri-apps/api/core";

export default function Create() {
  const [projectType, setProjectType] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectTemplate, setProjectTemplate] = useState("");
  const [projectPath, setProjectPath] = useState("");

  let project: ProjectStruct = {
    _project_name: projectName,
    _project_type: projectType,
    _template: projectTemplate,
    _path: projectPath
  };

  const create = () => {
    invoke('create_project', { project })
      .then((msg) => {
        OpenProject(project._path);
      })
      .catch((error) => console.error(error));
    
  };

  return (
    <>
      <div className="justify-center items-center flex h-screen">
        <div className="w-auto">
          <h1 className="text-white text-4xl p-10 text-center font-bold">
            Create Project
          </h1>
          <div className="bg-white w-96 h-96 rounded-xl shadow-lg p-4">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Project Name"
                value=""
                onchange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setProjectName(e.target.value)
                }
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
            <div className="flex items-center gap-2 p-4">
                <h1>templates in development</h1>
            </div>
          </div>
          <Button text="Create" func={create} />
          <Button
            text="Back"
            func={() => {
              window.location.href = "/";
            }}
          />
        </div>
      </div>
    </>
  );
}