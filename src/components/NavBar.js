import React, { useState, useEffect } from "react";
import { auth, database } from "../utils/firebase";
import { useHistory } from "react-router";

/* This example requires Tailwind CSS v2.0+ */
const navigation = [
  { name: "Solutions", href: "#" },
  { name: "Pricing", href: "#" },
  { name: "Docs", href: "#" },
  { name: "Company", href: "#" },
];

  export default function Header(props) {
    const [isAuth, setIsAuth] = useState(false);
    const history = useHistory();
    
    useEffect(() => {
  
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          setIsAuth(true);
        }
        return unsubscribe;
      });
    }, []);

    const handleSignOut = () => {
      if (isAuth) {
        auth
          .signOut()
          .then(() => {
            history.replace("/");
          })
          .catch((error) => alert(error.message));
      }
    };

    return (
      <header className="absolute inset-y-0 top-0 w-screen bg-gray-900 h-96 z-0">
        <nav className="max-w-7xl mx-auto mt-4 px-4 sm:px-6 lg:px-8" aria-label="Top">
          <div className="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none">
            <div className="flex items-center">
              <a href="/">
                <span className="sr-only">Workflow</span>
                <img
                  style={{height:"90px", width:"500px"}}
                  src='/quasar4.png'
                  alt=""
                />
              </a>
            </div>
            <div className="flex mx-auto w-full px-24">
            </div>
            <div className="ml-10 flex space-x-4">
              <a
                href="../search"
                className="inline-block bg-indigo-900 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"
              >
                Search
              </a>
              <a
                href="../account"
                className="inline-block bg-pink-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"
              >
                Account
              </a>
              <a
                href="#"
                className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-indigo-900 hover:bg-indigo-50"
                onClick={handleSignOut}
              >
                Leave
              </a>
            </div>
          </div>
        <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
          {navigation.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-base font-medium text-white hover:text-indigo-50"
            >
              {link.name}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
