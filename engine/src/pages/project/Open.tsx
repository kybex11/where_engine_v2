import { useState } from "react";
import Input from "../../UIKit/Input";
import Button from "../../UIKit/Button";

export default function Open() {
    const [path, setPath] = useState('');
    return (
        <>
            <div className="justify-center items-center flex h-screen">
                <div className="w-auto">
                    <h1 className="text-white text-4xl p-10 text-center font-bold">Open Project</h1>
                    <div className="bg-white w-96 h-96 rounded-xl shadow-lg p-4">
                        <div className="flex items-center gap-2 justify-center">
                            <Input placeholder="Project Path" onchange={(e) => setPath(e.target.value)} />
                            <Button text="Open" func={() => console.log('pipiska')}/>
                        </div>
                        <div className="bg-black rounded-xl w-90 h-60">
                            <h1 className="text-white p-5 font-bold text-lg">penis</h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}