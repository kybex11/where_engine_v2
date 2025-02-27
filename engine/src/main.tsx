import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Open from "./pages/project/Open";

import "./input.css";
import "./App.css";

import { initReactI18next } from "react-i18next";
import i18next from "i18next";

import Titlebar from "./components/titlebar";
import Create from "./pages/project/Create";
import { useEffect } from "react";
import { updateGetEditorStatus } from "./components/system/functions/statuses";
import CreateOpen from "./pages/project/create/open";

import TilemapEditor from "./pages/editor/tilemap/Tilemap";
import TwoEditor from "./pages/editor/two/Two";
import ThreeEditor from "./pages/editor/three/Three";

import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";

i18next
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
         'recently_projects': "Recently Projects",
         "create": "Create",
         "open": "Open",
         "back": "Back",
         "create_project": "Create Project",
         "open_project": "Open Project",
         "set_project_path": "Set Project Path"
        }
      },
      ru: {
        translation: {
         'recently_projects': "Последние Проекты",
         "create": "Создать",
         "open": "Открыть",
         "back": "Назад",
         "create_project": "Создать Проект",
         "open_project": "Открыть Проект",
         "set_project_path": "Путь Проекта"
        }
      }
    },
    lng: "en", 
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default function App() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(Cookies.get('language'))
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
