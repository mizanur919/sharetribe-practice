/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import sdkProvider from "./sdk";

const isUser = () => {
  const sdk = sdkProvider();
  const [authUser, setAuthUser] = useState(false);
  const [loading, setLoading] = useState(true);

  sdk.authInfo().then((authInfo) => {
    if (authInfo && authInfo.isAnonymous === false) {
      // console.log("User is logged in.");
      setAuthUser(true);
    } else {
      // console.log("User is NOT logged in.")
      setAuthUser(false);
    }
    setLoading(false);
  });

  // console.log('authUser', authUser)
  return { authUser, loading };
};

export default isUser;
