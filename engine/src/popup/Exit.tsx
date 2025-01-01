import { useEffect, useState } from "react"
import { getEditorOpenStatus } from "../components/system/functions/statuses";
import { getCurrentWindow } from "@tauri-apps/api/window";

interface ExitProps {
    onClose: () => void;
}

export default function Exit({ onClose }: ExitProps) {
    const appWindow = getCurrentWindow();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    useEffect(() => {
        setIsOpen(getEditorOpenStatus());
    }, [onClose]);

    const handleOK = () => {appWindow.close(); onClose()};
    const handleCancel = () => {setIsOpen(false); onClose()};

    console.log('triggered');

    return (
        <>
          {isOpen && (
            <div className="fixed inset-0 bg-black bg-opactiy-50 flex justify-center items-center">
                <div className="p-6 w-80 h-52 border border-gray-300 rounded-lg bg-white shadow-md">
                    <p className="mb-4">You really exit?</p>
                    <div className="">
                        <button
                            onClick={handleOK}
                            className="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            OK
                        </button>
                        <button onClick={handleCancel} className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400">Cancel</button>
                    </div>
                </div>
            </div>
          )} 
        </>
    )
}