import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MyUserContext } from "./AuthContext";

const Navbar = () => {
  const { state, logout } = useContext(MyUserContext);
  const route = useNavigate();
  return (
    <>
      <div
        className="navContainer"
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-around",
        }}
      >
        <div className="navLogo">
          <NavLink to="/">
            <h2>Logo</h2>
          </NavLink>
        </div>
        {state?.currentuser?.name && (
          <div
            className="navigations"
            style={{
              display: "flex",
              width: "30%",
              justifyContent: "space-around",
            }}
          >
            <h3 onClick={() => route("/newsfeed")}>News Feeds</h3>
            <h3 onClick={() => route("/yourpost")}>Your Post</h3>
            <h3 onClick={() => route("/addpost")}>Add Post</h3>
          </div>
        )}

        {state?.currentuser?.name ? (
          <div
            className="profilenav"
            style={{
              display: "flex",
              width: "40%",
              justifyContent: "space-around",
            }}
          >
            <h3 onClick={() => route("/profile")}>
              Profile ({state?.currentuser?.name})
            </h3>
            <h3 onClick={logout}>Logout</h3>
          </div>
        ) : (
          <h3 onClick={() => route("/login")}>Login/Register</h3>
        )}
      </div>
    </>
  );
};

export default Navbar;
