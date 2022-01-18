import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as yup from "yup";
import DefaultButton from "../../components/templates/default/DefaultButton";
import { useAuth } from "../../contexts/AuthUserProvider";
import { alertServices } from "../../lib/notificationService";

export default function Auth() {
  const { sendEmailLink, authUser } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    if (authUser != null) {
      router.push("/");
    }
  });

  const emailValidator = yup.object().shape({
    email: yup.string().email().required(),
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    setError({});

    try {
      const resultValidation = await emailValidator.validate({ email });

      if (!resultValidation) {
        throw new Error("Invalid email");
      }

      await sendEmailLink(email);

      alertServices.onSuccess(
        "Il reste une dernière étape...",
        "Vous allez recevoir un email de confirmation pour finaliser votre inscription/connexion"
      );

      setTimeout(() => {
        alertServices.clear();
      }, 3000);
    } catch (error) {
      setError({
        email: "Merci de renseigner votre email",
      });
    }

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
            className="bg-white md:px-10 pt-8 md:py-8 md:rounded-xl md:shadow-lg"
          >
            <h1 className="w-full mb-4 text-gray-700 font-bold">Login</h1>
            <div className="mb-2">
              <input
                className="bg-gray-100 px-4 py-4 outline-none rounded-md w-full"
                id="email"
                placeholder="E-mail"
                value={email}
                onChange={(event) => emailChange(event)}
              />
              <p className="text-red-500 text-xs italic py-2">{error.email}</p>
            </div>
            <div className="flex items-center justify-between">
              <DefaultButton
                disabled={loading || !valid}
                label="Se connecter"
                selected="true"
                className={`w-full text-lg py-3 text-center`}
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
