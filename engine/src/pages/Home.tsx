import Recently from "../components/recently";
import Button from "../UIKit/Button";
import { t } from "i18next";
export default function Home() {
  function create() {
    window.location.href = "/create";
  }
  function open() {
    window.location.href = "/open";
  }

  return (
    <div className="h-screen flex items-center justify-between">
      <div className="flex flex-col items-center mx-auto">
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
