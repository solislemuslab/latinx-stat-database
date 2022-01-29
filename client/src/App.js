import React, { Component } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/Styles.css";
import Home from "./components/home.js";
import Table from "./components/table.js";
import Profile from "./components/profile";
import Footer from "./components/footer.js";
import PageNotFound from "./components/page-not-found.js";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="navbar-brand">
            <Link to={"/"} className="navbar-content-link">
              Home
            </Link>
          </div>
          <div className="navbar-content">
            <div className="navbar-content-item">
              <Link to={"/table"} className="navbar-content-link">
                People
              </Link>
            </div>
            <div className="navbar-content-item">
              <Link to={"/profile"} className="navbar-content-link">
                Profile
              </Link>
            </div>
          </div>
        </nav>

        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/table" component={Table} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/404" component={PageNotFound} />
            <Route path="*">
              <Redirect to="/404" />
            </Route>
          </Switch>
        </div>

        <Footer />
      </div>
    );
  }
}

export default App;
