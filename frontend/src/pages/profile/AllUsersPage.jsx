import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../features/users/userSlice";
import SearchUsers from "./SearchUsers";

const AllUsersPage = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(2);

  const { users, pagination, totalDataCount, isLoading } = useSelector(
    (state) => state.userR,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers({ page, limit, search }));
  }, [search, dispatch, page, limit]);
  console.log("ALL USERS" + users);
  return (
    <div>
      <SearchUsers />
      <table className="border border-black border-collapse ">
        <thead>
          <tr>
            <th className="border border-black p-2">Name</th>
            <th className="border border-black p-2">Email</th>
            <th className="border border-black p-2">Mobile</th>
          </tr>
        </thead>

        <tbody>
          {users?.map((user) => (
            <tr key={user._id}>
              <td className="border border-black p-2">{user.name}</td>
              <td className="border border-black p-2">{user.email}</td>
              <td className="border border-black p-2">{user.mobile}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>per page total data = {pagination?.perPageTotalDataCount}</div>
      <div>Total Users = {totalDataCount}</div>
      <div>
        <button
          disabled={!pagination?.previousPage}
          onClick={() => setPage(pagination?.previousPage)}
        >
          Previous
        </button>
        <button>{pagination?.currentPage}</button>
        <button
          disabled={!pagination?.nextPage}
          onClick={() => setPage(pagination?.nextPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllUsersPage;
