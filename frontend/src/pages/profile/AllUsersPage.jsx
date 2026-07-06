import React from "react";

const AllUsersPage = () => {
  return <div>
  <tbody>
    {users?.map(user)=>{<tr key={user._id}></tr>}}</tbody></div>;
};

export default AllUsersPage;
