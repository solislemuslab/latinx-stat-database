import GoogleLogin from "react-google-login";
import { useState } from "react";
import React, { Component } from "react";
import MemberDataService from "../services/member.service"; // me

function Google() {
  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );

  // me
  const saveMember = (gid) => {
    var member = {
      gid: gid,
      name: " ",
      email: " ",
      institution: " ",
      position: " ",
      website: "",
      twitter: "",
      keywords: " ",
    };

    if (MemberDataService.get(gid) !== null) {
      // pretty sure this doesn't work as intended
      // me2
      console.log("nonunique!!!");
      console.log(MemberDataService.get(gid));
    } else {
      MemberDataService.create(member); // (me)
      // send user to their profile page
      // document.location.hash = '/profile/[id]';
    }
  };

  const handleFailure = (result) => {
    alert(result);
  };

  const handleLogin = async (googleData) => {
    console.log(googleData); // test
    const res = await fetch("http://localhost:6868/api/google-login", {
      method: "POST",
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    setLoginData(data);
    console.log(data); // test
    localStorage.setItem("loginData", JSON.stringify(data));
    saveMember(googleData.googleId); // me
  };

  const handleLogout = () => {
    localStorage.removeItem("loginData");
    setLoginData(null);
  };

  return (
    <div>
      {loginData ? (
        <div>
          <h3>You logged in as {loginData.email}</h3>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <GoogleLogin
          clientId={process.env.GOOGLE_CLIENT_ID}
          buttonText="Log in with Google"
          onSuccess={handleLogin}
          onFailure={handleFailure}
          cookiePolicy={"single_host_origin"}
        ></GoogleLogin>
      )}
    </div>
  );
}

export default Google;
