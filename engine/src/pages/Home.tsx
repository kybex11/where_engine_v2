import Recently from "../components/recently";
import Button from "../UIKit/Button";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from "@fortawesome/free-solid-svg-icons";
import i18next from "i18next";
import { useTranslation } from 'react-i18next';
import Cookies from "js-cookie";

export default function Home() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  function create() {
    window.location.href = "/create";
  }
  function open() {
    window.location.href = "/open";
  }

  function changeLanguage(lang: string) {
    Cookies.set('language', lang);
    i18next.changeLanguage(lang);
    setMenuOpen(false);
  }

  return (
    <div className="h-screen flex items-center justify-between">
      <div className="flex flex-col items-center mx-auto">
        <div className="absolute top-10 left-4">
          <FontAwesomeIcon 
            icon={faCog} 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="text-white cursor-pointer" 
          />
          {menuOpen && (
            <div className="absolute bg-white shadow-lg rounded p-2">
              <button onClick={() => changeLanguage('en')}>English</button>
              <button onClick={() => changeLanguage('ru')}>Русский</button>
            </div>
          )}
        </div>
        <h2 className="text-white font-bold text-2xl mb-4 w-full text-left">
          {t('recently_projects')}
        </h2>
        <div className="bg-white w-96 h-96 rounded-xl shadow-lg">
          <Recently />
        </div>
      </div>

      <div className="flex flex-col items-end justify-center pr-10">
        <Button text={t('create')} func={create} />
        <Button text={t('open')} func={open} />
      </div>
    </div>
  );
}
