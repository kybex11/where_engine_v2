let editorOpen: boolean = false;

function updateGetEditorStatus(_status: boolean) {
    editorOpen = _status;
}

function getEditorOpenStatus(): boolean {
    return editorOpen;
}
 
export { updateGetEditorStatus, getEditorOpenStatus }; //editor

