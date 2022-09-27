import { useState, useEffect } from "react";
import React from "react";
import MemberDataService from "../services/member.service";
import MailDataService from "../services/mail.service";
import { useHistory } from "react-router";
import jwt_decode from "jwt-decode";
require("dotenv").config();

function Google() {
  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );

  window.onload = function () {
    window.google.accounts.id.initialize({
      client_id: "1027276051671-fm9ogp59t3lbmqf8a1gbcq9ojv8lrkl8.apps.googleusercontent.com",
      callback: loginRedirect,
    });
    window.google.accounts.id.renderButton(
      document.getElementById("google-signin-button"),
      { theme: "outline", size: "large" }
    );
  };

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
      validated: false,
      approved: false,
    };

    return new Promise((resolve) => {
      MemberDataService.get(gid)
        .then((response) => {
          if (response.data == "") {
            resolve(MemberDataService.create(member));
            // alert of new member
            MailDataService.sendEmail()
            .then((response) => {
              console.log(response.data);
            })
            .catch((e) => {
              console.log(e);
            });
          } else {
            resolve(response.data);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    });
  };

  function handleFailure(result) {
    alert(result);
  }

  const history = useHistory();

  const handleLogin = async (response) => {
    var credential = jwt_decode(response.credential);
    var gid = credential.sub;
    var name = credential.name;

    const res = await fetch(process.env.REACT_APP_API_BASE_URL + "/google-login", {
      method: "POST",
      body: JSON.stringify({
        token: response.credential,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    setLoginData(data);

    localStorage.setItem("loginData", JSON.stringify(data));

    if (gid == "112570682828656133985") {
      return;
    }

    await saveMember(gid, name);
  };

  const loginRedirect = async (response) => {
    await handleLogin(response); // wait for login backend calls to complete before redirecting
    window.location.href = "/profile"; // send to profile page
  };

  const handleLogout = () => {
    localStorage.removeItem("loginData");
    setLoginData(null);
    history.go(0); // reload the page (refresh)
  };

  return (
    <div>
      {loginData ? (
        <div>
          <button
            class="btn btn-outline-warning btn-logout"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
         <div id="google-signin-button" className="btn btn-google"></div>
      )}
    </div>
  );
}

export default Google;
