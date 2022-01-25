import GoogleLogin from "react-google-login";
import { useState } from "react";
import React, { Component } from "react";
import MemberDataService from "../services/member.service";

function Google() {
  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );

  // Save member to table
  const saveMember = (gid, name) => {
    var member = {
      gid: gid,
      name: name,
      email: "",
      institution: "",
      position: "",
      website: "",
      twitter: "",
      keywords: "",
      visible: false,
    };

    // Create record only if such a record does not already exist for given gid
    MemberDataService.get(gid)
      .then((response) => {
        if (response.data == "") {
          MemberDataService.create(member);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleFailure = (result) => {
    alert(result);
  };

  const handleLogin = async (googleData) => {
    console.log(googleData); // debug
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
    // console.log(data); // debug
    localStorage.setItem("loginData", JSON.stringify(data));
    saveMember(googleData.googleId, googleData.profileObj.name);
    // .then(() => {
    //   // Redirect newly logged in user to their profile page
    //   window.location.href = "/profile";
    // })
    // .catch((e) => {
    //   console.log(e);
    // });
  };

  const handleLogout = () => {
    localStorage.removeItem("loginData");
    setLoginData(null);
  };

  return (
    <div>
      {loginData ? (
        <div>
          {/* <p>You're logged in as {loginData.name}</p> */}
          <button
            class="btn btn-outline-warning btn-logout"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <GoogleLogin
          className="hide"
          clientId={process.env.GOOGLE_CLIENT_ID}
          buttonText="Log in with Google"
          onSuccess={handleLogin}
          onFailure={handleFailure}
          cookiePolicy={"single_host_origin"}
        >
          <button
            class="btn btn-outline-primary btn-google"
            onClick={handleLogout}
          >
            Log in with Google
          </button>
        </GoogleLogin>
      )}
    </div>
  );
}

export default Google;
