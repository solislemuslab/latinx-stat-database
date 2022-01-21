import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Home from "./components/home.js";
import Table from "./components/table.js";
import Profile from "./components/profile";
import Footer from "./components/footer.js";
import PageNotFound from "./components/page-not-found.js";
// import MembersList from "./components/members-list.component";
// import AddMember from "./components/add-member.component";
// import Google from "./components/google.js";
import "./Styles.css";
import "./css/Styles.css";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar Content">
          <Link to={"/"} className="navbar-brand">
            Home
          </Link>
          <div className="navbar-content">
            <div className="navbar-content-item">
              <Link to={"/table"} className="navbar-content-link">
                Table
              </Link>
            </div>
            <div className="navbar-content-item">
              <Link to={"/profile"} className="navbar-content-link">
                Profile
              </Link>
            </div>
            {/* <div className="navbar-content-item">
              <Link to={"/members"} className="navbar-content-link">
                Members
              </Link>
            </div> */}
            {/* <div className="navbar-content-item">
              <Link to={"/add"} className="navbar-content-link">
                Add
              </Link>
            </div> */}
          </div>
        </nav>

        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/table" component={Table} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/profile/:gid" component={Profile} />
            <Route exact path="/404" component={PageNotFound} />
            {/* <Route exact path="/add" component={AddMember} /> */}
            {/* <Route exact path="/members" component={MembersList} /> */}
            {/* <Route exact path="/google" component={Google} /> */}
          </Switch>
        </div>

        <Footer />
      </div>
    );
  }
}

export default App;
