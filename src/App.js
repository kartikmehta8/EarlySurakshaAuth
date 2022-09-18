import React, { useState, useEffect } from "react";
import { ColorRing } from "react-loader-spinner";
import "./App.css";

import useArcanaAuth from "./useArcanaAuth";

function App() {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [account, setAccount] = useState("");

  const {
    initializeAuth,
    isLoggedIn,
    getAccounts,
    login,
    loginWithLink,
    logout,
    initialized,
  } = useArcanaAuth();

  const initialize = async () => {
    await initializeAuth();
  };

  const handleLogout = async () => {
    setLoggedIn(false);
    await logout();
  };

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    const loadDetails = async () => {
      if (initialized) {
        const isLogged = await isLoggedIn();
        if (isLogged) {
          setLoggedIn(true);
          const acc = await getAccounts();
          setAccount(acc[0]);
          setLoading(false);
        } else {
          setLoading(false);
        }
      }
    };
    loadDetails();
  }, [initialized]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <div className="container center mt-24">
      <div className="mt-16">&nbsp;</div>
      <div className="flex justify-center bgc py-4 px-6 mt-40 border border-b-0 border-black mukta text-lg font-bold text-white">
        ARCANA AUTHENTICATION
      </div>
      <div className="">
        {loading ? (
          <div className="loading">
            <ColorRing
              visible={true}
              height="100"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={["#000000"]}
            />
          </div>
        ) : !loading && loggedIn ? (
          <div className="border-2 border border-black">
            <h2 className="sub-heading">Logged In</h2>
            <h3 className="mukta">
              Welcome, <span className="font-bold text-sm">{account}</span>
            </h3>
            <h3>You're logged in successfully.</h3>
            <div className="text-md py-2 border-black border border-r-0 border-l-0 bo">
              <a
                href="https://htm-frontend-pp1t9.spheron.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Go to Dashboard
              </a>
            </div>
            <button className="big-button text-red-500" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div className="box">
            <h2 className="sub-heading border-b border-black">
              Select a login
            </h2>
            <div className="options">
              <button className="big-button" onClick={() => login("google")}>
                Google Login
              </button>
              {/* <button className="big-button" onClick={() => login("twitch")}>
                Twitch Login
              </button>
              <button className="big-button" onClick={() => login("discord")}>
                Discord Login
              </button>
              <button className="big-button" onClick={() => login("twitter")}>
                Twitter Login
              </button> */}
            </div>
            <div className="form">
              <input
                value={email}
                type="text"
                className="pl-4 border border-2 border-black border-l-0 border-b-0"
                placeholder="Enter email"
                onChange={handleEmailChange}
              />
              <button
                className="big-button border border-2 border-r-0 border-b-0 border-l-0"
                onClick={() => loginWithLink(email)}
              >
                Login with email
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
