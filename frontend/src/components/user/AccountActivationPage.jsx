//External Imports
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activateUserAccount } from "../../features/auth/authSlice";
import { useNavigate, useSearchParams } from "react-router-dom";

//Internal Imports

const AccountActivationPage = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    isError,
    error,
    forgetPass,
    resetPass,
  } = useSelector((state) => state.authR);
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();
  console.log("searchparams =", searchParams);
  const token = searchParams.get("token");
  console.log(token);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(activateUserAccount(token));
  }, [token, dispatch]);

  // if (!isAuthenticated && !isError && Object.keys(user).length !== 0) {
  //   setTimeout(() => {
  //    // navigate("/login");
  //   }, 5000);
  // }
  return (
    <div>
      <p>Activating your account. Please wait.</p>
    </div>
  );
};

export default AccountActivationPage;
