import React, { useEffect } from "react";
import "./utils.scss";
import User from "../Components/User/User";
import { suggestedUser } from "../Actions/UserAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Components/Loader/Loader";

const Suggested = () => {
  const dispatch = useDispatch();

  const { loading, users } = useSelector((state) => state.like);

  useEffect(() => {
    dispatch(suggestedUser());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : (
    <div className="suggest" style={{
      borderLeft: "1px solid #e6e6e6",
      height: "100%",
      padding:"1rem 2rem"
    }}>
      <h3>Suggested User</h3>
      {users && users.length > 0 ? (
        users.map((user) => (
          <User
            key={user._id}
            userId={user._id}
            name={user.name}
            avatar={user.avatar.url}
          />
        ))
      ) : (
        <h4>No User Found</h4>
      )}
    </div>
  );
};

export default Suggested;
