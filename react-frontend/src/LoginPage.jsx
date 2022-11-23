import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import "./LoginPage.css"

function UserLogin({ setLoginToken }) {
  
  // initialize states for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);           // this will hold all the users
  const [errors, setErrors] = useState({
    emailInvalid: false, emailNotFound: false, incorrectPassword: false,
  }); 
    const navigate = useNavigate();
  
  // check to ensure the values are legitimate
  const checkFieldsValid = () => email.length !== 0 && password.length !== 0;
  const checkEmailValid = () => /.+@.+\.[A-Za-z]+$/.test(email); // Complicated regex. Don't worry about it...

    // useEffect block to update the error variables
    useEffect(() => {
    if (!checkFieldsValid()) return;

    // Pulled out err to a seperate variables because setState is async. Causes race condition
    const err = { emailInvalid: false, emailNotFound: false, incorrectPassword: false, wrongLogin: true};
      if (email !== "" && !checkEmailValid()) { err.emailInvalid = true; }
      
    setErrors(err);
    }, [email, password])
  
  // use axios to fetch all users from the backend->database
  async function fetchUsers() {
    try {
      const response = await axios.get('http://localhost:5000/users');
      return response.data.users_list;
    }
    catch (error) {
      console.log(error);
      return false;
    }
  };

  // this is used to fetch all the users into an array to be used to check later
  useEffect(() => {
        fetchUsers().then( result => {
           if (result)
              setUsers(result);
         });
     }, [] );

  const loginButtonSubmitted = () => {
    // ensure submitted characters are legitimate
    if (!checkFieldsValid() || errors.emailInvalid) { ; }
  
    else {
      // set email to lower case as it does not need be case sensitive
      email.toLowerCase();
      // iterate through each user and check emails and passwords with submitted
      users.forEach((user) => {
      
        if (user.email.toLowerCase() === email) {
          if (user.password === password) {
            
            // this ensures that the user's data is accesible from other paths 
            setLoginToken(email);
            navigate('/');
          }
        }
      });
    }
  }

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

UserLogin.propTypes = {
  setLoginToken: PropTypes.func.isRequired
}

export default UserLogin;
