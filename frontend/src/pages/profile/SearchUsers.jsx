import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../features/users/userSlice";
import Search from "../../components/common/Search";

const SearchUsers = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <Search
        onSearch={(search) => {
          dispatch(getAllUsers({ page: 1, limit: 2, search }));
        }}
        placeholder="Search Users"
        className="border p-2 rounded-md"
      />
    </div>
  );
};
export default SearchUsers;
