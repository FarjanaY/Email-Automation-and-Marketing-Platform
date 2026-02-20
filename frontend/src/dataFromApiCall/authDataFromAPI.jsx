//Internal Imports
import api from "../app/api";

//register user api - Verify account
export const registerUserAPI = async (userData) => {
  const res = await api.post("/api/users/sign-up/verify", userData);
  console.log("registerUserAPI=======");
  console.log(res.data);
  return res.data;
};

//activate user account after registration
export const activateUserAccountAPI = async ({ token }) => {
  const res = await api.post("/api/users/sign-up/activate_user_acc", { token });
  console.log("activateUserAccountAPI=======");
  console.log(res.data);
  return res.data;
};

//Log in
export const logInAPI = async (userData) => {
  const res = await api.post("/api/login", userData);
  console.log("logInAPI=======");
  console.log(res.data);
  return res.data;
};

//Check Login
export const isUserLoggedInAPI = async () => {
  const res = await api.get("/api/check-login");
  console.log("isUserLoggedIn=======");
  console.log(res.data);
  return res.data;
};

//Log out
export const logOutAPI = async () => {
  const res = await api.post("/api/logout");
  console.log("logOutAPI=======");
  console.log(res.data);
  return res.data;
};

//Forget password
export const forgetPasswordAPI = async ({ email }) => {
  const res = await api.post("/api/forgot-pass", { email });
  console.log("forgetPasswordAPI=======");
  console.log(res.data);
  return res.data;
};

//Reset password
export const resetPasswordAPI = async ({ password }) => {
  const res = await api.put("/api/reset-pass", { password }); 
  console.log("resetPasswordAPI=======");
  console.log(res.data);
  return res.data;
};
