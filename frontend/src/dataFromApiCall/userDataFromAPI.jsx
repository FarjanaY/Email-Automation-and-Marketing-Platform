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

//=========Update/Edit user data API =======
export const updateUserAPI = async (id, data) => {
  const res = await api.put(`/api/users/edit/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  
  console.log("get All users API=======");
  console.log(res.data);
  return res.data;
};

//=========Delete user data  API=======
export const deleteUserAPI = async (id) => {};

//=========Banned A User by Admin API=======
export const banUserAPI = async (id) => {};

//=========Banned A User by Admin API =======
export const unbanUserAPI = async (id) => {};

//=========Change role  API =======
export const changeRoleAPI = async (id) => {};
