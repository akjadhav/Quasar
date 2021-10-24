import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar"
import Home from "./pages/Home";
import About from "./pages/About";
import Account from "./pages/Account";
import ItemDetailDynamic from "./pages/ItemDetailDynamic";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import { Button } from "@mui/material";
import { auth, database } from "./utils/firebase";
import { useCookies } from 'react-cookie';
import Snackbar from '@mui/material/Snackbar';
import Alert from "@mui/material/Alert";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  const [cookies, setCookie] = useCookies(['currItem']);
  const vertical = 'bottom'
  const horizontal = 'center'

  useEffect(() => {
    document.title = "Quasar"
  }); 

  const handleCurrItemChange = (item) => {
    console.log(item)
    setCookie('currItem', item, { path: '/' });
  }

  const [logInSeverity, setLogInSeverity] = useState("error");
  const [logInMessage, setLogInMessage] = useState("Login Failed :(");
  const [isLogInAlert, setIsLogInAlert] = useState(false);

  const [registerSeverity, setRegisterSeverity] = useState("error");
  const [registerMessage, setRegisterMessage] = useState(
    "Registration Failed :("
  );
  const [isRegisterAlert, setIsRegisterAlert] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsRegisterAlert(false);
    setIsLogInAlert(false);
  };



  return (
    <div>
      <div style={{ marginBottom: "150px" }}>
        <NavBar></NavBar>
      </div>

      <Router>
        <div>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/cart">
              <Cart />
            </Route>
            <Route path="/search">
              <Search />
            </Route>
            <Route path="/itemdetail">
              <ItemDetailDynamic currItem={cookies.currItem} handleCurrItemChange={handleCurrItemChange} />
            </Route>
            <Route path="/home">
              <Home handleCurrItemChange={handleCurrItemChange} />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/account">
              <Account />
            </Route>
            <Route path="/">
              <Login setLoginMessage={setLogInMessage} setLoginSeverity={setLogInSeverity} setIsLoginAlert={setIsLogInAlert} setRegisterMessage={setRegisterMessage} setRegisterSeverity={setRegisterSeverity} setIsRegisterAlert={setIsRegisterAlert} />
            </Route>
          </Switch>
        </div>
      </Router>

      <Snackbar
        open={isLogInAlert}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert
          onClose={handleClose}
          severity={logInSeverity}
          sx={{ width: "100%" }}
        >
          {logInMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        open={isRegisterAlert}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert
          onClose={handleClose}
          severity={registerSeverity}
          sx={{ width: "100%" }}
        >
          {registerMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
