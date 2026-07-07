import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../features/users/userSlice";

const SearchUsers = () => {
  const [search, setSearch] = useState("");
  const { users, pagination, totalDataCount, isLoading } = useSelector(
    (state) => state.userR,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers({ search }));
  }, [search, dispatch]);

  return (
    <div>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Users"
      />
    </div>
  );
};

export default SearchUsers;
