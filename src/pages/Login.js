import React, { useState, useEffect } from "react";
import { auth, database } from "../utils/firebase";
import { Redirect, useHistory } from "react-router";
import { TextField, Button } from "@mui/material";
import NavBar from "../components/NavBar";

export default function Login() {
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
        alert("Account Created, Welcome!");
        clearFields();
        history.push("/home");
        //this gives the user data on Login
        initializeUserData();
      })
      .catch((error) => alert(error.message));
  };

  const handleLogIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        alert("Logged In, Welcome!");
        clearFields();
        history.push("/home");
      })
      .catch((error) => alert(error.message));
  };

  const handleEmailInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordInputChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div >
      <NavBar />

      <div className="bg-gradient-to-b h-screen from-gray-900 to-blue-900 relative z-40">
        <div className="mx-auto mt-24 h-96 w-4/6">
          <h2 className="text-6xl drop-shadow-lg font-extrabold tracking-tight text-center mt-24 mb-8 text-white">
            Login
          </h2>
          <div className="mx-auto rounded-lg w-10/12 bg-white p-10">
            <TextField
              value={email}
              style={{display: "flex", width: "100%"}}
              label="Email"
              onChange={handleEmailInputChange}
            />
            <TextField
              value={password}
              style={{display: "flex", width: "100%"}}
              type="password"
              label="Password"
              onChange={handlePasswordInputChange}
            />
            <div className="right-0 align-right text-right">
            <Button onClick={handleSignUp}>Register</Button>
            <Button onClick={handleLogIn}>Login</Button>
            </div>
            
          </div>
        </div>
      
      </div>
      
    </div>
  );
}
