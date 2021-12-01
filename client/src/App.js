import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddMember from "./components/add-member.component";
import Profile from "./components/profile";
import MembersList from "./components/members-list.component";
import Table from "./components/table.js";
import Home from "./components/home.js";
import Footer from "./components/footer.js";
import "./Styles.css";
import "./css/Styles.css";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar Content">
          <Link to={"/"} className="navbar-brand">
            LSD
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
            <div className="navbar-content-item">
              <Link to={"/members"} className="navbar-content-link">
                Members
              </Link>
            </div>
            <div className="navbar-content-item">
              <Link to={"/add"} className="navbar-content-link">
                Add
              </Link>
            </div>
          </div>
        </nav>

        <div>
          <Switch>
            <Route exact path="/table" component={Table} />
            <Route exact path="/add" component={AddMember} />
            <Route path="/profile/:id" component={Profile} />
            <Route exact path="/" component={Home} />
            <Route exact path="/members" component={MembersList} />
            <Route exact path="/profile" component={Profile} />
          </Switch>
        </div>

        <Footer/>        

      </div>
    );
  }
}

export default App;
