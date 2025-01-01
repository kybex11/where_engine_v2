import { useEffect } from "react"
import { updateGetEditorStatus } from "../../components/system/functions/statuses";

export default function Editor() {
    useEffect(() => {
        updateGetEditorStatus(true);
    }, []);
    return (
        <>
        </>
    )
}