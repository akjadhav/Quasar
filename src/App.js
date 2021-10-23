import React, { useState, useEffect } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Users from "./pages/Users";
import ItemDetailDynamic from "./pages/ItemDetailDynamic";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import { Button } from "@mui/material";
import { auth, database } from "./utils/firebase";
import { useCookies } from 'react-cookie';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  const [cookies, setCookie] = useCookies(['currItem']);

  const handleCurrItemChange = (item) => {
    console.log(item)
    setCookie('currItem', item, { path: '/' });
  }

  return (
    <div>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
              <li>
                <Link to="/itemdetail">detail</Link>
              </li>
              <li>
                <Link to="/search">Search</Link>
              </li>
              <li>
                <Link to="/cart">cart</Link>
              </li>
            </ul>
          </nav>

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
              <ItemDetailDynamic currItem={cookies.currItem} />
            </Route>
            <Route path="/home">
              <Home handleCurrItemChange={handleCurrItemChange} />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
