import React, {useState, useEffect} from 'react'

import "./AccountCreation.css"

function AccountCreation() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPasword, setConfirmPasword] = useState("");
  const [errors, setErrors] = useState({
    emailInvalid: false,
    passwordsDontMatch: false,
  });

  const checkFieldsValid = () => email.length !== 0 && password.length !== 0 && confirmPasword.length !== 0
  const checkEmailValid = () => /.+@.+\.[A-Za-z]+$/.test(email); // Complicated regex. Don't worry about it...

  useEffect(() => {
    if (!checkFieldsValid()) return;

    // Pulled out err to a seperate variables because setState is async. Causes race condition
    const err = { emailInvalid: false, passwordsDontMatch: false };
    if (email !== "" && !checkEmailValid()) { err.emailInvalid = true;}
    if (password !== "" && confirmPasword !== "" && password.localeCompare(confirmPasword)) { err.passwordsDontMatch = true; }

    setErrors(err);
  }, [email, password, confirmPasword])

  const goButtonSubmitted = () => {
    if (errors.emailInvalid || errors.passwordsDontMatch) { return; }

    // DO SOMETHING
  };

  return (
    <div className="account-creation-page-parent">
      <div className="title"><span className="test">Box</span>Office</div>
      <div className="account-creation-email-input">
        <input className={!errors.emailInvalid ? "input-box" : "input-box-error"} type="email" name="email" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
        { errors.emailInvalid && 
          <div className="invalid">Email is Invalid</div>
        }
      </div>
      <div className="account-creation-password-input">
        <input className={!errors.passwordsDontMatch ? "input-box" : "input-box-error"} type="password" name="password" placeholder="Pasword" onChange={e => setPassword(e.target.value)}/>
        <input className={!errors.passwordsDontMatch ? "input-box" : "input-box-error"} type="password" name="confirmPassword" placeholder="Confirm Password" onChange={e => setConfirmPasword(e.target.value)}/>
        { errors.passwordsDontMatch &&
          <div className="invalid">Passwords don&apos;t match</div>
      }
      </div>
      <button className="submitButton" type="submit" onClick={goButtonSubmitted}>GO</button>
    </div>
  );
};

export default AccountCreation;
