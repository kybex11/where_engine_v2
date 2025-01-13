import { useEffect } from "react"
import { updateGetEditorStatus } from "../../../components/system/functions/statuses";

export default function TwoEditor() {
    useEffect(() => {
        updateGetEditorStatus(true);
    }, []);   
    return (
        <>
        </>
    )
}