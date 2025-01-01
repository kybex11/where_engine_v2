import { getCurrentWindow } from "@tauri-apps/api/window"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { getEditorOpenStatus } from "./system/functions/statuses";
import { useState } from "react";
import Exit from "../popup/Exit";

export default function Titlebar() {
  const appWindow = getCurrentWindow();
  const [isExitVisible, setExitVisible] = useState(false); 

  function minimize() { appWindow.minimize() }
  function close() {
    if(getEditorOpenStatus()) {
      setExitVisible(true);
    } else {
      appWindow.close();
    }
  } 
  function drag() { appWindow.startDragging() }

  return (
    <>
        <div 
          className="titlebar" 
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '30px', backgroundColor: 'black', padding: '0 10px' }} 
          onMouseDown={drag}
        >
            <h1 style={{ margin: 0, fontFamily: 'sans-serif, Arial', color: 'white', fontSize: 'large', userSelect: 'none', cursor: 'pointer' }}>Engine</h1>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div 
                  style={{ width: '80px', height: '48px', cursor: 'default', display: 'flex', alignItems: 'center' }} 
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <button onClick={minimize} style={{ margin: '0 5px', border: 'none', background: 'none', color: 'white', fontSize: '16px', cursor: 'pointer' }}>
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <button onClick={close} style={{ margin: '0 5px', border: 'none', background: 'none', color: 'white', fontSize: '16px', cursor: 'pointer' }}>
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
            </div>
        </div>
        {isExitVisible && <Exit onClose={() => setExitVisible(false)} />} {}
    </>
  )
}