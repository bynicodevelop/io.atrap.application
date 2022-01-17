import { auth } from "../utils/firebase";

import {
  onAuthStateChanged,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function AuthenticationComponent({ children }) {
  const router = useRouter();

  useEffect(() => {
    if (isSignInWithEmailLink(auth, router.asPath)) {
      signInWithEmailLink(auth, router.query["email"], router.asPath).then(
        (result) => {
          router.push("/");
        }
      );
    }

    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user logged in", user);
        if (router.pathname === "/auth") {
          router.push("/");
        }
      } else {
        if (router.pathname !== "/auth") {
          router.push("/auth");
        }
      }
    });
  });

  return <>{children}</>;
}
