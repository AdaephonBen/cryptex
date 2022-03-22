import React, { useRef, useState } from "react";
import logo from "./redsandblack.png";
import "./App.css";

function App() {
  const username = useRef(null);
  const publicity = useRef(null);
  const email = useRef(null);
  const submitForm = (e) => {
    e.preventDefault();
    console.log(email.current.value);
    fetch(
      "https://script.google.com/macros/s/AKfycbxKZzN7baLK6HhN2epwkYCk2nkvIbIODsDIZYnTjJ4FAzX5gZ6JrchYWtv66pcBzV3W/exec",
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
          setIsValid(1);
        } else {
          alert("Registration Unsuccessful. Please use a different username");
        }
      });
  };

  const [isvalid, setIsValid] = useState(0);
  return (
    <div class="main-block">
      <div class="left-part">
        <img
          class="logo"
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
      {isvalid === 0 && (
        <form id="my-form">
          <div className="title">
            <h2> Pre-register for the event here!</h2>
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
              ref={email}
              placeholder="Email-id"
              required
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
            Submit
          </button>
        </form>
      )}
      {isvalid === 1 && (
        <div class="right-part">
          <h1>Thank you! You'll be added to our leaderboard.</h1>
          <h3>
            We'll drop a reminder email before the event starts. Stay tuned.
          </h3>
        </div>
      )}
    </div>
  );
}

export default App;
