import React, { useRef, useState } from "react";
import logo from "./redsandblack.png";
import "./App.css";
import { withAuthenticationRequired, useAuth0 } from "@auth0/auth0-react";

function App() {
  const [buttonValue, setButtonValue] = useState("Submit");
  const { user, loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const username = useRef(null);
  const publicity = useRef(null);
  const email = useRef(null);
  const submitForm = (e) => {
    e.preventDefault();
    if (username.current.value === "") return;
    setButtonValue("Loading..");
    console.log(email.current.value);
    fetch(
      "https://script.google.com/macros/s/AKfycbxubSkF_t2CVStLPmk7ZbgdJDlefVJtlDy99rG7-Gd3klrh0x1jsDnL9RIdlzgo8gLd-A/exec",
      {
        method: "POST",
        body: JSON.stringify({
          Username: username.current.value,
          publicity: publicity.current.value,
          Email: email.current.value,
        }),
      }
    )
      .then((res) => res.json())
      .then((response) => {

        if (response.result === "success") {
          console.log(response.result);
          setIsRegistered(1);
          setIsValidUName(1);
        } else if (response.result === "error") {
          console.log(response);
          if (response.error === "conflicting_uname") setIsValidUName(0);
          else if (response.error === "conflicting_email") {
            alert("Email is already registered!");
            setButtonValue("Submit")
            logout();
          }
        }
      })
      
  };

  const [isValidUName, setIsValidUName] = useState(1);
  const [isRegistered, setIsRegistered] = useState(0);
  return (
    <div className="main-block">
      <div className="left-part">
        <img
          className="logo"
          src={logo}
          width="50%"
          height="50%"
          alt="cryptex logo"
        />
        <h1>CRYPTEX 2022</h1>
        <p>18:00 IST | April 1 | 2022</p>
        <p>
          <a href="mailto: cryptex@elan.org.in">Mail</a> |{" "}
          <a href="https://www.instagram.com/cryptex.iith/">Instagram</a>
        </p>
      </div>
      {!isAuthenticated && (
        <div
          className="title"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <h2> Pre-register for the event here!</h2>
          <button
            onClick={(e) => {
              e.preventDefault();
              loginWithRedirect();
            }}
          >
            Sign In
          </button>
        </div>
      )}
      {isAuthenticated && isRegistered === 0 && (
        <form id="my-form">
          <div className="title">
            <h2> Enter your preferred username for the event!</h2>
          </div>
          <div className="info">
            <input
              type="text"
              name="Username"
              id="name"
              ref={username}
              placeholder="Username"
              required
            />
            <input
              type="email"
              name="Email"
              id="email"
              value={user.email}
              ref={email}
              placeholder="Email-id"
              required
              disabled
              readOnly
            />

            <label htmlFor="publicity">Where did you hear about Cryptex?</label>
            <select name="publicity" id="publicity" ref={publicity}>
              <option value="select" selected disabled>
                Select
              </option>
              <option value="email">Email</option>
              <option value="socials">Social Media</option>
              <option value="friends">Friends</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="data-text">
            <p>The Cryptic Overlords will never sell your data. Or spam.</p>
          </div>
          <button type="submit" onClick={submitForm}>
            {buttonValue}
          </button>
          {!isValidUName && (
            <p>Registration Unsuccessful. Please use a different username</p>
          )}
        </form>
      )}
      {isRegistered === 1 && (
        <div class="right-part">
          <h1>Thank you! You'll be added to our leaderboard.</h1>
          <h3>
            We'll drop a reminder email before the event starts. Stay tuned.
          </h3>
          <button
            onClick={(e) => {
              e.preventDefault();
              logout();
            }}
            style={{ maxWidth: "90%" }}
          >
            {" "}
            Logout{" "}
          </button>
        </div>
      )}
    </div>
  );
}

// export default withAuthenticationRequired(App);
export default App;
