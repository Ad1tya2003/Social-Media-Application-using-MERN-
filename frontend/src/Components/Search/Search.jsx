import React from "react";
import "./Search.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../Actions/UserAction";
import User from "../User/User";

const Search = () => {
  const { loading, users } = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();

  const [name, setName] = useState(" ");

  const searchHandler = (e) => {
    e.preventDefault();
    dispatch(getAllUsers(name));
  };
  return (
    <div>
      <div className="search">
        <h2>Search</h2>
        <form className="loginform" onSubmit={searchHandler}>
          <input
            type="text"
            required
            placeholder="Seach By Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>

          <div className="search-2">
            {users &&
              users.map((user) => (
                <User
                  key={user._id}
                  userId={user._id}
                  name={user.name}
                  avatar={user.avatar.url}
                />
              ))}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Search;
