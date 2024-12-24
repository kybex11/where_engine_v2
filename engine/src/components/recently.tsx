import { invoke } from '@tauri-apps/api/core';
import { useEffect, useState } from 'react';
import { OpenProject } from '../tools/project';

export default function Recently() {
    const [ recently, setRecently ] = useState<{ [key: string]: string}>({});
    useEffect(() => {
        invoke('get_recently')
            .then((message) => setRecently(JSON.parse(message as string)))
            .catch((error) => console.error(error));
    }, []);
    
    return (
        <>
        {Object.entries(recently).map(([key, value]) => (
            <div key={key}>
                <button className='font-bold text-2xl p-5' onClick={() => OpenProject(value)}>{key}</button>
            </div>
        ))}
        </>
    )
}