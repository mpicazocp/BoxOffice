import { useState } from 'react';

export default function useLoginToken() {
  // function to retrieve the login ID from session storage
  const getLoginToken = () => {
    const tokenString = sessionStorage.getItem('id');
    const userToken = JSON.parse(tokenString);
    return userToken;
  };

  // useState to hold the login token and set it to the current id
  const [loginToken, setLoginToken] = useState(getLoginToken());

  // function to set the ID into the session storage
  const saveLoginToken = (userToken) => {
    sessionStorage.setItem('id', JSON.stringify(userToken));
    setLoginToken(userToken.id);
  };

  // return all three components to be used in other files
  return {
    getLoginToken,
    setLoginToken: saveLoginToken,
    loginToken,
  };
}
