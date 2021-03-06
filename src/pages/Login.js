import React, { useState, useEffect } from "react";
import { auth, database } from "../utils/firebase";
import { Redirect, useHistory } from "react-router";
import { TextField, Button } from "@mui/material";
import NavBar from "../components/NavBar";


export default function Login(props) {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        history.push("/home");
      }
    });
    return unsubscribe;
  }, []);

  const clearFields = () => {
    setEmail("");
    setPassword("");
  };

  const initializeUserData = () => {
    const unsubscribe = database
      .ref("users/" + auth.currentUser.uid + "/scans/")
      .set({ numScans: 0 });
    return unsubscribe;
  };

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        props.setRegisterMessage("Successfully Registered!");
        props.setRegisterSeverity("success");
        props.setIsRegisterAlert(true);
        clearFields();
        history.push("/home");
        //this gives the user data on Login
        initializeUserData();
      })
      .catch((error) => {
        props.setRegisterMessage(error.message);
        props.setRegisterSeverity("error");
        props.setIsRegisterAlert(true);
      });
  };

  const handleLogIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        props.setLoginMessage("Successfully Logged In!");
        props.setLoginSeverity("success");
        props.setIsLoginAlert(true);
        clearFields();
        history.push("/home");
      })
      .catch((error) => {
        props.setLoginMessage(error.message);
        props.setLoginSeverity("error");
        props.setIsLoginAlert(true);
      });
  };

  const handleEmailInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordInputChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <NavBar />

      <div className="bg-gradient-to-b h-screen from-gray-900 to-blue-900 relative z-40">
        <div className="mx-auto mt-24 h-96 w-4/6">
          <h1 className="text-6xl drop-shadow-lg font-extrabold tracking-tight text-center mt-30 mb-20 text-white">
            LOGIN
          </h1>
          <div className="mx-auto rounded-lg w-10/12 bg-gradient-to-b from-yellow-300 to-green-300 p-10">
            <TextField
              variant="standard"
              value={email}
              style={{ display: "flex", width: "100%" }}
              label="Email"
              onChange={handleEmailInputChange}
            />
            <TextField
              variant="standard"
              value={password}
              style={{ display: "flex", width: "100%", marginTop: "20px" }}
              type="password"
              label="Password"
              onChange={handlePasswordInputChange}
            />
            <div className="right-0 my-3 mt-12 text-2xl text-center">
              <Button onClick={handleSignUp}>Register</Button>
              <Button onClick={handleLogIn}>Login</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
