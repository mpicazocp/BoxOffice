import React, { useState, useEffect } from 'react'
import "./LoginPage.css"
import axios from 'axios'

function UserLogin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    emailInvalid: false, emailNotFound: false, incorrectPassword: false
  });
  
  const checkFieldsValid = () => email.length !== 0 && password.length !== 0;
  const checkEmailValid = () => /.+@.+\.[A-Za-z]+$/.test(email); // Complicated regex. Don't worry about it...
  
    useEffect(() => {
    if (!checkFieldsValid()) return;

    // Pulled out err to a seperate variables because setState is async. Causes race condition
    const err = { emailInvalid: false, emailNotFound: false, incorrectPassword: false};
      if (email !== "" && !checkEmailValid()) { err.emailInvalid = true; }
      
    setErrors(err);
  }, [email, password])


  // use axios to fetch all users, maybe should fetch only what we need?
  async function fetchUsers() {
    try {
      const response = await axios.get('http//localhost:5000/users');
      return response.data.users_list;
    }
    catch (error) {
      console.log(error);
      return false;
    }
  };

  const loginButtonSubmitted = () => {
    if (!checkFieldsValid()) return;
    if (errors.emailInvalid) return;

    // make a get request then filter the users for the inputted email
    const AllUsers = fetchUsers();
    console.debug("email being compared: ", email.toLowerCase);
    const requestedUser = AllUsers.filter(user => user.email.toLowerCase === email.toLowerCase);

    // if array is empty, user does not exist
    // consider settting a variable here to let ui know to display message
    if (requestedUser.length <= 0) return;

    if (requestedUser.password !== password) return;

    // submit login and move to next page?
    // might also need to send login data over to the next page somehow?
    console.debug("email:", email);
    console.debug("password:", password);
  };

  


  return (
    <div className="login-page-parent">
      <div className="title"><span className="test">Box</span>Office</div>
      <div className="login-page-email-input">
        <input className={!errors.emailInvalid ? "input-box" : "input-box-error"} type="email" name="email" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
        { errors.emailInvalid && 
          <div className="invalid">Email is Invalid</div>
        }
      </div>
      <div className="login-page-password-input">
        <input className="input-box" type="password" name="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
      </div>
      <button className="loginButton" type="submit" onClick={loginButtonSubmitted}>Login</button>
    </div>
  );
};

export default UserLogin;