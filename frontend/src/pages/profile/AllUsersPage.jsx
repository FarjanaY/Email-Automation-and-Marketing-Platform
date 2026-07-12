import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsers,
  banUser,
  unbanUser,
} from "../../features/users/userSlice";
import SearchUsers from "./SearchUsers";
import AreYouSureModal from "../../components/common/AreYouSureModal";

const AllUsersPage = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(2);

  // which row's ban/unban is pending confirmation
  const [targetUser, setTargetUser] = useState(null);

  const { users, pagination, totalDataCount, isLoading } = useSelector(
    (state) => state.userR,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers({ page, limit, search }));
  }, [search, dispatch, page, limit]);

  const handleConfirm = async () => {
    if (!targetUser) return;
    try {
      if (targetUser.isBanned) {
        await dispatch(unbanUser(targetUser._id));
      } else {
        await dispatch(banUser(targetUser._id));
      }
    } catch (err) {
      console.log(err);
    } finally {
      setTargetUser(null);
    }
  };

  return (
    <div>
      <SearchUsers />
      <table className="border border-black border-collapse ">
        <thead>
          <tr>
            <th className="border border-black p-2">Name</th>
            <th className="border border-black p-2">Email</th>
            <th className="border border-black p-2">Mobile</th>
            <th className="border border-black p-2">Status</th>
            <th className="border border-black p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users?.map((user) => (
            <tr key={user._id}>
              <td className="border border-black p-2">{user.name}</td>
              <td className="border border-black p-2">{user.email}</td>
              <td className="border border-black p-2">{user.mobile}</td>
              <td className="border border-black p-2">
                {user.isBanned ? "Banned" : "Active"}
              </td>
              <td className="border border-black p-2">
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => setTargetUser(user)}
                  className={`px-3 py-1 rounded-md text-white font-bold disabled:opacity-50 ${
                    user.isBanned ? "gn-button-shadow" : "delete-button-shadow"
                  }`}
                >
                  {user.isBanned ? "Unban" : "Ban"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>per page total data = {pagination?.perPageTotalDataCount}</div>
      <div>Total Users = {totalDataCount}</div>
      <div className="mt-6 flex gap-x-2.5 ">
        <button
          disabled={!pagination?.previousPage}
          onClick={() => setPage(pagination?.previousPage)}
          className="px-4 py-2 rounded-md cursor-pointer
             text-white  gn-button-shadow 
             font-bold"
        >
          Previous
        </button>
        <button
          className="px-4 py-0 rounded-md 
          cursor-pointer font-bold
          cancel-button-shadow text-white"
        >
          {pagination?.currentPage}
        </button>
        <button
          disabled={!pagination?.nextPage}
          onClick={() => setPage(pagination?.nextPage)}
          className="px-4 py-2 rounded-md cursor-pointer
             text-white  gn-button-shadow 
             font-bold"
        >
          Next
        </button>
      </div>

      <AreYouSureModal
        isOpen={!!targetUser}
        title={targetUser?.isBanned ? "Unban User" : "Ban User"}
        message={
          targetUser?.isBanned
            ? `Are you sure you want to unban ${targetUser?.name}?`
            : `Are you sure you want to ban ${targetUser?.name}? They won't be able to log in.`
        }
        confirmText={targetUser?.isBanned ? "Unban" : "Ban"}
        cancelText="Cancel"
        variant={targetUser?.isBanned ? "default" : "danger"}
        onConfirm={handleConfirm}
        onCancel={() => setTargetUser(null)}
      />
    </div>
  );
};

export default AllUsersPage;
