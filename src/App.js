import React, {useState, useEffect} from 'react'
import Home from './pages/Home'
import About from './pages/About'
import Users from './pages/Users'
import ItemDetail from './pages/ItemDetail'
import ItemDetailDynamic from './pages/ItemDetailDynamic'
import ItemDetailChair from './pages/ItemDetailChair'
import Search from './pages/Search'
import Login from './pages/Login'
import { Button } from '@mui/material'
import {auth, database} from './utils/firebase'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  const [currItem, setCurrItem] = useState({})
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
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/itemdetail">
            <ItemDetailDynamic currItem={currItem}/>
          </Route>
          <Route path="/itemdetailchair">
            <ItemDetailChair />
          </Route>
          <Route path="/home">
            <Home setCurrItem={setCurrItem}/> 
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
