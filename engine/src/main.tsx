import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Open from "./pages/project/Open";

import "./input.css";
import "./App.css";

import Titlebar from "./components/titlebar";
import Create from "./pages/project/Create";
import { useEffect } from "react";
import { updateGetEditorStatus } from "./components/system/functions/statuses";
import Editor from "./pages/editor/Editor";

export default function App() {
  useEffect(() => {
    updateGetEditorStatus(false);
  }, []);
  return (
    <>
      <Titlebar />
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="create" element={<Create />} />
          <Route path="open" element={<Open/>}/>
          <Route path="editor" element={<Editor/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);
