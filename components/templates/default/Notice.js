import { useEffect, useState } from "react";
import { alertServices } from "../../../lib/notificationService";
import DefaultButton from "./DefaultButton";

export default function Notice() {
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    alertServices.onAlert().subscribe((alert) => {
      if (alert.type !== "default-alert") {
        setAlert(alert);
        return;
      }

      setAlert(null);
    });
  }, [alert]);

  const clear = () => {
    alertServices.clear();
  };

  return alert != null ? (
    <div
      className={`flex flex-col space-y-4 animated fadeIn faster fixed flex bottom-10 right-10 items-center z-50 outline-none focus:outline-none ${
        alert == null ? "hidden" : ""
      }`}
    >
      <div className="flex flex-col p-8 bg-white shadow-md hover:shodow-lg rounded-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-16 h-16 rounded-2xl p-3 border border-blue-100 text-blue-400 bg-blue-50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <div className="flex flex-col ml-3 mr-3">
              <div className="font-medium leading-none">{alert.title}</div>
              <p className="text-sm text-gray-600 leading-none mt-1">
                {alert.subTitle}
              </p>
            </div>
          </div>
          <DefaultButton onClick={clear} label="Fermer" selected="true" />
        </div>
      </div>
    </div>
  ) : null;
}
