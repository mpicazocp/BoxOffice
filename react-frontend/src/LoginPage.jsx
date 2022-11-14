import React, { useState } from 'react'
import "./LoginPage.css"

function UserLogin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    emailInvalid: false,
  });

  const checkFieldsValid = () => email.length !== 0 && password.length !== 0;
  const checkEmailValid = () => /.+@.+\.[A-Za-z]+$/.test(email); // Complicated regex. Don't worry about it...
  
  const loginButtonSubmitted = () => {
    if (!checkFieldsValid()) return;

    // Pulled out err to a seperate variables because setState is async. Causes race condition
    const err = { emailInvalid: false};
    if (!checkEmailValid()) { err.emailInvalid = true;}

    setErrors(err);
    if (err.emailInvalid) { return; }
    console.debug("logged in");

    // DO SOMETHING
  };

  return (
    <div className="login-page-parent">
      <div className="title"><span className="test">Box</span>Office</div>
      <div className="login-page-email-input">
        <input className="input-box" type="email" name="email" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
        { errors.emailInvalid && <div>Email is Invalid</div> }
      </div>
      <div className="login-page-password-input">
        <input className="input-box" type="password" name="password" placeholder="Pasword" onChange={e => setPassword(e.target.value)}/>
      </div>
      <button className="loginButton" type="submit" onClick={loginButtonSubmitted}>Login</button>
    </div>
  );
};

export default UserLogin;
