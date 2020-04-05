import React from "react";
import { Link, Route, Switch, Router, Redirect } from "wouter";

import logo from "./logo.svg";
import "./App.scss";
import UserListView from "./views/user/list";
import HomeView from "./views/home";
import Http404View from "./views/http404";
import useHashLocation from "./router/useHashLocation";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Initial Page of xmjcraft-client-react
        </p>
      </header>
      <main>

        <Router hook={useHashLocation}>
          <Link href="/users">
            Users
          </Link>
          <Switch>
            <Route path="/">
              <Redirect to="/index" />
            </Route>
            <Route path="/index" component={HomeView}></Route>
            <Route path="/users" component={UserListView}></Route>
            <Route path="/:rest*" component={Http404View}></Route>
          </Switch>
        </Router>

      </main>
    </div>
  );
}

export default App;
