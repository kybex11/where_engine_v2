import { invoke } from '@tauri-apps/api/core';
import { useEffect, useState } from 'react';
import { OpenProject } from '../tools/project';
import { ProjectStruct } from '../packages/engine.project';

export default function Recently() {
    const [ recently, setRecently ] = useState<{ [key: string]: string}>({});
    useEffect(() => {
        invoke('get_recently')
            .then((message) => setRecently(JSON.parse(message as string)))
            .catch((error) => console.error(error));
    }, []);

    const open = (value: string, key: string) => {
        const project: ProjectStruct = {
            projectName: key,
            projectType: '',
            template: '',
            path: value
        };

        OpenProject(project);
    }
    
    return (
        <>
        {Object.entries(recently).map(([key, value]) => (
            <div key={key}>
                <button className='font-bold text-2xl p-5' onClick={() => open(value, key)}>{key}</button>
            </div>
        ))}
        </>
    )
}