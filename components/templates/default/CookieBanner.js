import { getCookie, setCookies } from "cookies-next";
import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [cookieConsent, setCookieConsent] = useState(false);

  useEffect(() => {
    const { cookieConsent = false } = JSON.parse(
      getCookie(process.env.cookieName) ?? "{}"
    );

    setCookieConsent(cookieConsent);
  }, []);

  const onAllow = () => {
    const cookies = getCookie(process.env.cookieName) ?? {};

    setCookies(
      process.env.cookieName,
      {
        ...cookies,
        cookieConsent: true,
      },
      { maxAge: 60 * 60 * 24 * 365 }
    );

    setCookieConsent(true);
  };

  return (
    <div
      className={`max-w-screen-lg mx-auto fixed bg-white inset-x-5 p-5 bottom-20 rounded-lg drop-shadow-2xl flex gap-4 flex-wrap md:flex-nowrap text-center md:text-left items-center justify-center md:justify-between ${
        cookieConsent ? "hidden" : ""
      }`}
    >
      <div className="w-full">
        This website uses cookies to ensure you get the best experience on our
        website.{" "}
        <a
          href="#"
          className="text-indigo-600 whitespace-nowrap  hover:underline"
        >
          Learn more
        </a>
      </div>
      <div className="flex gap-4 items-center flex-shrink-0">
        <button
          onClick={onAllow}
          className="bg-indigo-500 px-5 py-2 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
        >
          Allow Coockies
        </button>
      </div>
    </div>
  );
}
