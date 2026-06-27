//Internal Imports
import api from "../app/api";

//register user api - Verify account
export const getOneUserAPI = async (userId) => {
  const res = await api.get("/api/users/one", userId);
  console.log("getOneUserAPI=======");
  console.log(res.data);
  return res.data;
};
