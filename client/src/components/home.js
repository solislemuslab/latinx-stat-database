// home.js
import React, { Component } from "react";
import asa from "./../img/asa-logo.png";
// import wid from "./../img/wid-logo.png"; // is png?
import Google from "./google.js";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div className="Content home">
        <div class="row">
          <div class="col-sm-7">
            <a
              href="https://www.amstat.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img class="home-img" src={asa} alt="ASA Logo"></img>
            </a>
            {/* <a
              href="https://wid.wisc.edu/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img class="home-img" src={wid} alt="WID Logo"></img>
            </a> */}

            <h3 class="home-heading">
              Welcome to the database for Latinx Statisticians and Data
              Scientists
            </h3>

            <p class="home-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          <div class="col-sm-5">
            <div class="btn-container-home">
              {/* {if (localStorage.getItem("loginData")) {
                if (JSON.parse(localStorage.getItem("loginData")).visible) {
                  (<a
                    class="btn btn-outline-primary btn-lg btn-people"
                    href="/profile"
                  >
                    COMPLETE PROFILE SETUP
                  </a>)
                }
              }} */}
              <a
                class="btn btn-outline-primary btn-lg btn-people"
                href="/table"
              >
                Find People
              </a>
              <Google></Google>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
