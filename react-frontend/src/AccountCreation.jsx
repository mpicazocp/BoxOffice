import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import "./AccountCreation.css"

function AccountCreation({ setLoginToken }) {
  // create states for all necessary variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPasword, setConfirmPasword] = useState("");
  const [users, setUsers] = useState([]);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [errors, setErrors] = useState({
    emailInvalid: false,
    passwordsDontMatch: false,
  });


  const navigate = useNavigate();
  
  // validity functions
  const checkFieldsValid = () => email.length !== 0 && password.length !== 0 && confirmPasword.length !== 0
  const checkEmailValid = () => /.+@.+\.[A-Za-z]+$/.test(email); // Complicated regex. Don't worry about it...

  // use axios to fetch all users from the backend->database
  async function fetchUsers() {
    try {
      const response = await axios.get('http://localhost:7777/users');
      return response.data.users_list;
    }
    catch (error) {
      console.log(error);
      return false;
    }
  };

  useEffect(() => {
    if (!checkFieldsValid()) return;

    // Pulled out err to a seperate variables because setState is async. Causes race condition
    const err = { emailInvalid: false, passwordsDontMatch: false };
    if (email !== "" && !checkEmailValid()) { err.emailInvalid = true;}
    if (password !== "" && confirmPasword !== "" && password.localeCompare(confirmPasword)) { err.passwordsDontMatch = true; }

    setErrors(err);
  }, [email, password, confirmPasword])

   // use axios to post to the backend
  async function addUser(userToPost) {
    try {
      const response = await axios.post('http://localhost:7777/users', userToPost);
      return response;
    }
    catch (error) {
      console.error(error.response.data);
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

  let isDuplicateAccount = 0;
  const goButtonSubmitted = () => {
    if (errors.emailInvalid || errors.passwordsDontMatch) { ; }

    // consider doing a check here to see if email already exists
    else {
      // set the current inputted email to lower case for comparison
      // compare email and if it is the same, set isDuplicateAccount
      users.forEach((user) => {
        if (user.email.toLowerCase() === email.toLowerCase()) {
          isDuplicateAccount = 1;
          console.log("same email");
        }
      });
      
      if (isDuplicateAccount === 0) {
        // send a post request to add the new user
        addUser({ email, password }).then(result => {
          if (result && result.status === 201) {
            /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
            setLoginToken(result.data._id); 
            navigate('/');
          }
          // Add a route to the my shows page here **********************
          else {
            console.log("Account Creation Failed");
          }
        });
      }
      else {
        console.log("username already in use");
        setIsDuplicate(true);
      }
    }
  };

  return (
    <div className="account-creation-page-parent">
      <button type="button" className="account-creation-title" onClick={() => navigate("/")}><span className="test">Box</span>Office</button>
      <div className="account-creation-email-input">
        <input className={!errors.emailInvalid ? "input-box-new-account" : "input-box-error-new-account"} type="email" name="email" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
        { errors.emailInvalid && 
          <div className="invalid">Email is Invalid</div>
        }
      </div>
      <div className="account-creation-password-input">
        <input className={!errors.passwordsDontMatch ? "input-box-new-account" : "input-box-error-new-account"} type="password" name="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
        <input className={!errors.passwordsDontMatch ? "input-box-new-account" : "input-box-error-new-account"} type="password" name="confirmPassword" placeholder="Confirm Password" onChange={e => setConfirmPasword(e.target.value)}/>
        { errors.passwordsDontMatch &&
          <div className="invalid">Passwords don&apos;t match</div>
      }
      </div>
      <button className="submitButton" type="submit" onClick={goButtonSubmitted}>GO</button>
      {isDuplicate &&
        <div className="invalid">Username Already in Use</div>
      }
    </div>
  );
};

export default AccountCreation;
