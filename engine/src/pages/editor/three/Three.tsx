import { useEffect } from "react"
import { updateGetEditorStatus } from "../../../components/system/functions/statuses";

export default function ThreeEditor() {
    useEffect(() => {
        updateGetEditorStatus(true);
    }, []);
    return (
        <>
        </>
    )
}