/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import "./App.css";

import { useSelector, useDispatch } from "react-redux";
import {
  isUserLoggedIn,
  logIn,
  logOut,
  verifyUserRegistration,
} from "./features/auth/authSlice";
function App() {
  const { user } = useSelector((state) => state.authR);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logIn({ email: "", password: "Alex@12345" }));
  }, [dispatch]);

  return (
    <>
      <h1 className="text-3xl font-bold bg-red-400">Hello world!</h1>
      <h1 className="text-3xl font-bold"></h1>
    </>
  );
}

export default App;
