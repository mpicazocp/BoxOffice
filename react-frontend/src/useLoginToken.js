import { useState } from 'react';

export default function useLoginToken() {
  const getLoginToken = () => {
    const tokenString = sessionStorage.getItem('email');
    const userToken = JSON.parse(tokenString);
    return userToken?.token;
  };

  const [loginToken, setLoginToken] = useState(getLoginToken());

  const saveLoginToken = (userToken) => {
    sessionStorage.setItem('email', JSON.stringify(userToken));
    setLoginToken(userToken.email);
  };

  return {
    setLoginToken: saveLoginToken,
    loginToken,
  };
}
