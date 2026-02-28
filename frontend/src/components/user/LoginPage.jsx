//External Imports
import React from "react";
import { useNavigate } from "react-router-dom";

//Internal Imports

const LoginPage = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const goToRegistration = () => {
    navigate("/registration");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="text" placeholder="Enter your email" />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="text" placeholder="Enter your password" />
        </div>
        <div>
          <button type="submit">Login</button>
          <button type="submit" onClick={goToRegistration}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
