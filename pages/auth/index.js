import Head from "next/head";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { auth } from "../../utils/firebase";
import { sendSignInLinkToEmail } from "firebase/auth";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(false);

  const emailValidator = yup.object().shape({
    email: yup.string().email().required(),
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    const resultValidation = emailValidator.validate({ email });

    setError({});

    if (!resultValidation) {
      setError({
        email: "Merci de renseigner votre email",
      });

      return;
    }

    const actionCodeSettings = {
      url: `http://localhost:3000/auth?email=${email}`,
      handleCodeInApp: true,
    };

    await sendSignInLinkToEmail(auth, email, actionCodeSettings);

    setLoading(false);
  };

  const emailChange = async (event) => {
    setEmail(event.target.value);

    setValid(await emailValidator.isValid({ email: event.target.value }));
  };

  return (
    <>
      <Head>
        <title>Auth</title>
      </Head>
      <div className="flex justify-center mt-10">
        <div className="w-full max-w-xs">
          <form
            onSubmit={onSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <h1 className="w-full text-center mb-4 text-gray-700 font-bold">
              Login
            </h1>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                placeholder="E-mail"
                value={email}
                onChange={(event) => emailChange(event)}
              />
              <p className="text-red-500 text-xs italic py-2">{error.email}</p>
            </div>
            <div className="flex items-center justify-between">
              <button
                disabled={loading || !valid}
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                  loading || !valid
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
                type="submit"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
