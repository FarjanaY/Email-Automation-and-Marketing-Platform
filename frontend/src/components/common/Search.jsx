import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../features/users/userSlice";

const Search = ({ onSearch, placeholder = "Search..." }) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    onSearch(search);
  }, [search, onSearch]);

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={placeholder}
        className="border p-2 rounded-md"
      />
    </div>
  );
};

export default Search;
