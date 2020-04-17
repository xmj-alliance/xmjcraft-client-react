import React from "react";
import { Route, Switch, Router, Redirect } from "wouter";
import { ApolloProvider } from '@apollo/client';

import UserListView from "./views/user/list";
import UserDetailView from "./views/user/detail";
import HomeView from "./views/home";
import Http404View from "./views/http404";
import useHashLocation from "./router/useHashLocation";
import Navbar from "./components/navbar";

import "./App.scss";
import client from "./services/rootGraph";


const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router hook={useHashLocation}>
        <section className="App">
          <header className="App">
            <nav>
              <Navbar />
            </nav>
          </header>

          <main>
            <Switch>
              <Route path="/">
                <Redirect to="/index" />
              </Route>
              <Route path="/index" component={HomeView}></Route>
              <Route path="/users" component={UserListView}></Route>
              <Route path="/users/:dbname" component={UserDetailView}></Route>
              <Route path="/:rest*" component={Http404View}></Route>
            </Switch>
          </main>
        </section>
      </Router>
    </ApolloProvider>
  );
}

export default App;
