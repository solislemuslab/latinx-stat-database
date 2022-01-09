// home.js
import React, { Component } from "react";
import Button from "./button.js";
import asa from "./../img/asa-logo.png";
import Google from "./google.js";

export default class MembersList extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  onSignIn(googleUser) {
    console.log("fuck");
    //console.log(googleUser.getBasicProfile()); // tut
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log("Name: " + profile.getName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
  }

  // componentDidMount() {
  //   gapi.load('auth2', function() {
  //       gapi.auth2.isSignedIn.listen(function(isSignedIn) {
  //           console.log('user signed in ', isSignedIn)
  //           this.setState({status: isSignedIn})
  //       })
  //   })
  // }

  fuck() {
    console.log("fuck2");
  }

  componentDidMount() {}

  render() {
    return (
      <div className="Content home">
        <div class="row">
          <div class="col-sm-8">
            <div class="">
              <img class="home-img" src={asa} alt="ASA Logo"></img>
            </div>

            <h3 class="home-heading">In the bleak midwinter.</h3>

            <p class="home-text">
              In the bleak midwinter Frosty wind made moan Earth stood hard as
              iron Water like a stone Snow had fallen Snow on snow on snow In
              the bleak midwinter Long, long ago
            </p>
          </div>
          <div class="col-sm-4">
            <Button label="View Database" link="/"/>
            <Button label="something" link="/" />
            <button type="button" onClick={this.onSignIn}>click</button>
            {/* <div
              id="g_id_onload"s
              data-client_id="1027276051671-fm9ogp59t3lbmqf8a1gbcq9ojv8lrkl8.apps.googleusercontent.com"
              data-login_uri="http://localhost:8888"
              data-auto_prompt="false"
            ></div>
            <div
              class="g_id_signin"
              data-type="standard"
              data-size="large"
              data-theme="outline"
              data-text="sign_in_with"
              data-shape="rectangular"
              data-logo_alignment="left"
              // data-onsuccess="onSignIn"
            ></div> */}
            {/* <div class="g-signin2" data-onsuccess={this.onSignIn}></div> */}
            <Google></Google>
          </div>
        </div>
      </div>
    );
  }
}
