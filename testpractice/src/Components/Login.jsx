import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MyUserContext } from "./AuthContext";
import { toast } from "react-hot-toast";
import api from "./ApiConfig/index";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const route = useNavigate();

  const { login, state, logout } = useContext(MyUserContext);

  const handleChange = (e) => {
    const { value, name } = e.target;

    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = loginData;

    if (email && password) {
      try {
        const response = await api.post("/login", {
          loginData,
        });

        if (response.data.success) {
          const token = response.data.token;
          const userData = response.data.userData;

          await login(userData, token);

          toast.success(response.data.message);
          setLoginData({
            email: "",
            password: "",
          });
          route("/");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        logout();
      }
    } else {
      toast.error("All fileds are mandatory");
    }
  };

  useEffect(() => {
    if (state?.currentuser) {
      route("/");
    }
  }, [state]);
  return (
    <>
      <div>
        <h2>Login</h2>
        <form className="formContainer" onSubmit={handleSubmit}>
          <div className="allInputDivs">
            <label>Email</label> <br />
            <input
              type="email"
              onChange={handleChange}
              name="email"
              value={loginData.email}
            />
          </div>

          <div className="allInputDivs">
            <label>password</label> <br />
            <input
              type="password"
              onChange={handleChange}
              name="password"
              value={loginData.password}
            />
          </div>

          <div className="allInputDivs">
            <input type="submit" value="Login" />
          </div>

          <p>
            New User ? <NavLink to="/register">Register</NavLink>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
