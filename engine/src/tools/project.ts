import { ProjectStruct } from "../packages/engine.project";

export function OpenProject(project: ProjectStruct) {
    switch(project._project_type) {
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