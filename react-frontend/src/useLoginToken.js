import { useState } from 'react';

export default function useLoginToken() {
  const getLoginToken = () => {
    const tokenString = sessionStorage.getItem('id');
    const userToken = JSON.parse(tokenString);
    return userToken;
  };

  const [loginToken, setLoginToken] = useState(getLoginToken());

  const saveLoginToken = (userToken) => {
    sessionStorage.setItem('id', JSON.stringify(userToken));
    setLoginToken(userToken.id);
  };

  return {
    getLoginToken,
    setLoginToken: saveLoginToken,
    loginToken,
  };
}
