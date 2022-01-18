import { useEffect, useState } from "react";
import {
  isSignInWithEmailLink,
  onAuthStateChanged,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  signOut,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useRouter } from "next/router";

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [authError, setAuthError] = useState([]);
  const router = useRouter();

  const authStateChanged = async (authState) => {
    if (!authState) {
      console.log("User is not logged in");

      setAuthUser(null);

      return;
    }

    console.log("login : ", authState);

    // Formatter user state
    setAuthUser(authState);
  };

  const validEmailLink = (emailLink) => {
    if (isSignInWithEmailLink(auth, emailLink)) {
      const email = window.localStorage.getItem("emailForSignIn");

      signInWithEmailLink(auth, email, emailLink)
        .then((result) => {
          console.log("User signed in with success: ", result);

          window.localStorage.removeItem("emailForSignIn");
        })
        .catch((error) => {
          console.log("Error signing in with email link: ", error);
          authError.push(error.code);

          setAuthError(authError);
        });
    }
  };

  useEffect(() => {
    // if (
    //   authError.includes(
    //     "auth/invalid-json-payload-received.-/email-should-be-string"
    //   ) &&
    //   router.asPath !== "/"
    // ) {
    //   console.log("Redirecting to home page");
    //   router.push("/");
    // }

    if (!authUser) {
      validEmailLink(window.location.href);
    }

    onAuthStateChanged(auth, authStateChanged);
  });

  const sendEmailLink = async (email) => {
    window.localStorage.setItem("emailForSignIn", email);

    const actionCodeSettings = {
      url: `http://localhost:3000/`,
      handleCodeInApp: true,
    };

    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
  };

  const logout = async () => await signOut(auth);

  return {
    authUser,
    sendEmailLink,
    logout,
  };
}
