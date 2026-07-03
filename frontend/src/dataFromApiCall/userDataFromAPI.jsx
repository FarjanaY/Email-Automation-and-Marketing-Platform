//Internal Imports
import api from "../app/api";

//=================Get One user api by ID================
export const getOneUserByIdAPI = async (userId) => {
  const res = await api.get(`/api/users/one/${userId}`);
  console.log("getOneUserAPI=======");
  console.log(res.data);
  return res.data;
};

//=================Get One user api by email with search ================
export const getOneUserByEmailAPI = async (search) => {
  const res = await api.get("/api/users/one", {
    params: { search },
  });

  console.log("getOneUserBy Email API=======");
  console.log(res.data);

  return res.data;
};

//=================Get all users api  ================
export const getAllUsersAPI = async (page = 1, limit = 5, search = "") => {
  const res = await api.get("/api/users/all-users", {
    params: { page, limit, search },
  });

  console.log("get All users API=======");
  console.log(res.data);
  return res.data;
};
