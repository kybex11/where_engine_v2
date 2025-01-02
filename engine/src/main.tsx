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
import CreateOpen from "./pages/project/create/open";

import TilemapEditor from "./pages/editor/tilemap/Tilemap";
import TwoEditor from "./pages/editor/two/Two";
import ThreeEditor from "./pages/editor/three/Three";

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
          <Route path="create/open" element={<CreateOpen/>}/>

          <Route path="editor/tilemap" element={<TilemapEditor/>}/>
          <Route path="editor/two" element={<TwoEditor/>}/>
          <Route path="editor/three" element={<ThreeEditor/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);
