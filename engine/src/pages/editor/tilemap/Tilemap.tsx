import { useEffect } from "react"
import { updateGetEditorStatus } from "../../../components/system/functions/statuses";

export default function TilemapEditor() {
    useEffect(() => {
        updateGetEditorStatus(true);
    }, []);
    return (
        <>
        </>
    )
}