import { ProjectStruct } from "../packages/engine.project";
import Cookies from "js-cookie";

export function OpenProject(project: ProjectStruct) {
    Cookies.set('project.name', project.projectName);
    Cookies.set('project.type', project.projectType);
    Cookies.set('project.template', project.template);
    Cookies.set('project.path', project.path);
    Cookies.set('project.compiled', 'false');
    
    switch(project.projectType) {
        case 'two':
            window.location.href = "editor/two";
            break;
        case 'three': 
            window.location.href = "editor/three";
            break;
        case 'tilemap':
            window.location.href = "editor/tilemap";
            break;
    }    
}