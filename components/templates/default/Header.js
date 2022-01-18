import Link from "next/link";

import { useAuth } from "../../../contexts/AuthUserProvider";
import DefaultButton from "./DefaultButton";

export default function Header() {
  const { authUser, logout } = useAuth();

  const signOut = async () => {
    await logout();
  };

  const button =
    authUser == null ? (
      <DefaultButton label="Login" to="/auth" />
    ) : (
      <DefaultButton label="Logout" onClick={signOut} />
    );

  return (
    <header>
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="absolute inset-y-0 left-0 flex items-center ">
              <div className="flex-1 flex items-center justify-center items-stretch justify-start">
                <div className="block sm:ml-6">
                  <div className="flex space-x-4">
                    <DefaultButton label="Buttonn 1" />

                    {button}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
