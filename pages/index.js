import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthUserProvider";

export default function Home() {
  const { authUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authUser == null) {
      router.push("/auth");
    }
  });

  return <></>;
}
