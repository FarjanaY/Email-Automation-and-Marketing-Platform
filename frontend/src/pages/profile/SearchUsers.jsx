import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../features/users/userSlice";
import Search from "../../components/common/Search";

const SearchUsers = () => {
  const dispatch = useDispatch();

  const handleSearch = useCallback(
    (search) => {
      dispatch(getAllUsers({ page: 1, limit: 2, search }));
    },
    [dispatch],
  );

  return (
    <div>
      <Search
        onSearch={handleSearch}
        placeholder="Search Users"
        className="border p-2 rounded-md"
      />
    </div>
  );
};
export default SearchUsers;
