/* eslint-disable */

import React, {useState} from 'react'

import "./AccountCreation.css"

function AccountCreation() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPasword, setConfirmPasword] = useState("");
  const [errors, setErrors] = useState({
    emailInvalid: false,
    passwordsDontMatch: false,
  });

  const checkFieldsValid = () => {return email.length !== 0 || password.length !== 0 || confirmPasword.length !== 0}
  const checkEmailValid = () => /.+@.+\.[A-Za-z]+$/.test(email); // Complicated regex. Don't worry about it...

  const goButtonSubmitted = () => {
    if (!checkFieldsValid()) return;

    // Pulled out err to a seperate variables because setState is async. Causes race condition
    const err = { emailInvalid: false, passwordsDontMatch: false };
    if (!checkEmailValid()) { err.emailInvalid = true;}
    if (password.localeCompare(confirmPasword)) { err.passwordsDontMatch = true; }

    setErrors(err);
    if (err.emailInvalid || err.passwordsDontMatch) { return; }

    console.debug("Congrats!");
    console.debug("email:", email);
    console.debug("password:", password);
    console.debug("confirmPasword:", confirmPasword);
  };

  return (
    <div className="account-creation-page-parent">
      <div className="account-creation-email-input">
        <input className="input-box" type="email" name="email" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
        { errors.emailInvalid && <div>Email is Invalid</div> }
      </div>
      <div className="account-creation-password-input">
        <input className="input-box" type="password" name="password" placeholder="Pasword" onChange={e => setPassword(e.target.value)}/>
        <input className="input-box" type="password" name="confirmPassword" placeholder="Confirm Password" onChange={e => setConfirmPasword(e.target.value)}/>
        { errors.passwordsDontMatch && <div>Passwords don't match</div> }
      </div>
      <button className="submitButton" type="submit" onClick={goButtonSubmitted}>GO</button>
    </div>
  );
};

export default AccountCreation;
