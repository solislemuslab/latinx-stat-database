import GoogleLogin from "react-google-login";
import { useState } from "react";
import React from "react";
import MemberDataService from "../services/member.service";
import { useHistory } from "react-router";

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

    return new Promise((resolve) => {
      // Create record only if such a record does not already exist for given gid
      MemberDataService.get(gid)
        .then((response) => {
          if (response.data == "") {
            console.log("create!");
            resolve(MemberDataService.create(member));
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

  const handleLogin = async (googleData) => {
    // console.log("googleData: " + googleData); // debug
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
    await saveMember(googleData.googleId, googleData.profileObj.name);
  };

  const loginRedirect = async (googleData) => {
    await handleLogin(googleData); // wait for login backend calls to complete before redirecting
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
        <GoogleLogin
          className="hide"
          clientId={process.env.GOOGLE_CLIENT_ID}
          buttonText="Log in with Google"
          onSuccess={loginRedirect}
          onFailure={handleFailure}
          cookiePolicy={"single_host_origin"}
        >
          <button class="btn btn-outline-primary btn-google">
            Log in with Google
          </button>
        </GoogleLogin>
      )}
    </div>
  );
}

export default Google;
