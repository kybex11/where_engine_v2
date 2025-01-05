import { useEffect, useState } from "react";
import { ProjectStruct, templates } from "../../packages/engine.project/index";
import Button from "../../UIKit/Button";
import Input from "../../UIKit/Input";
import { OpenProject } from "../../tools/project";
import { invoke } from "@tauri-apps/api/core";
import Cookies from 'js-cookie';
import { t } from "i18next";

// Define the template structure
interface Template {
  name: string;
  description: string;
  icon: string;
  path: string;
}

export default function Create() {
  const [projectType, setProjectType] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectTemplate, setProjectTemplate] = useState("");
  const [projectPath, setProjectPath] = useState("");

  const [availableTemplates, setAvailableTemplates] = useState<Template[]>([]);

  useEffect(() => {
    Cookies.set('project.name', '');
    Cookies.set('project.type', '');
    Cookies.set('project.template', '');
    Cookies.set('project.path', '');
  }, []);

  useEffect(() => {
    if (projectType) {
      const fetchedTemplates = templates(projectType);
      console.log(fetchedTemplates);
      setAvailableTemplates(fetchedTemplates);
    }
  }, [projectType]);

  let project: ProjectStruct = {
    projectName: projectName,
    projectType: projectType,
    template: projectTemplate,
    path: projectPath
  };

  const create = () => {
    if (project.path.length < 1) {
      Cookies.set('project.name', project.projectName);
      Cookies.set('project.type', project.projectType);
      Cookies.set('project.template', project.template);
      window.location.href = "/create/open";
      
    } else {
      invoke('create_project', { project })
      .then((msg) => {
        OpenProject(project);
      })
      .catch((error) => console.error(error));
    }
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
                value={projectName}
                onchange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setProjectName(e.target.value)
                }
              />
              <select
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="border border-gray-300 rounded-md font-bold p-2 shadow-md h-10"
              >
                <option value="two">2D</option>
                <option value="three">3D</option>
                <option value="tilemap">Tilemap</option>
              </select>
            </div>
            <div className="flex flex-wrap gap-4 p-4">
              {availableTemplates.map((template, index) => (
                <div key={index} className="flex flex-col items-center">
                  <button 
                    onClick={() => { setProjectTemplate(template.name)}} 
                    className="flex flex-col items-center"
                  >
                  
                  <img src={template.icon} alt={template.name} className="w-16 h-16" />
                  <p>{template.description}</p>
                  </button>
                </div>
              ))}
            </div>
          </div>
          <Button text={t('create')} func={create} />
          <Button
            text={t('back')}
            func={() => {
              window.location.href = "/";
            }}
          />
        </div>
      </div>
    </>
  );
}