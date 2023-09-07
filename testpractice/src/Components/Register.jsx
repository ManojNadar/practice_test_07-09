import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MyUserContext } from "./AuthContext";
import { toast } from "react-hot-toast";
import api from "./ApiConfig/index";

const Register = () => {
  const [regData, setRegData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Buyer",
    number: "",
  });

  const route = useNavigate();
  const { state } = useContext(MyUserContext);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setRegData({ ...regData, [name]: value });
  };

  //   console.log(regData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword, role, number } = regData;

    if (name && email && password && confirmPassword && role && number) {
      if (password === confirmPassword) {
        const response = await api.post("/register", {
          regData,
        });

        if (response.data.success) {
          toast.success(response.data.message);
          setRegData({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: "Buyer",
            number: "",
          });

          route("/login");
        } else {
          toast.error(response.data.message);
        }
      } else {
        toast.error("password doesnot match");
      }
    } else {
      toast.error("All fields are mandatory");
    }
  };

  useEffect(() => {
    if (state?.currentuser) {
      route("/");
    }
  }, [state, route]);

  return (
    <>
      <h2>Regsiter</h2>

      <form className="formContainer" onSubmit={handleSubmit}>
        <div className="allInputDivs">
          <label>Name</label> <br />
          <input
            type="text"
            onChange={handleChange}
            name="name"
            value={regData.name}
          />
        </div>
        <div className="allInputDivs">
          <label>Email</label> <br />
          <input
            type="email"
            onChange={handleChange}
            name="email"
            value={regData.email}
          />
        </div>
        <div className="allInputDivs">
          <label>Phone</label> <br />
          <input
            type="number"
            onChange={handleChange}
            name="number"
            value={regData.number}
          />
        </div>
        <div className="allInputDivs">
          <label>Role</label> <br />
          <select name="role" onChange={handleChange} value={regData.role}>
            <option value="Buyer">Buyer</option>
            <option value="Seller">Seller</option>
          </select>
        </div>
        <div className="allInputDivs">
          <label>password</label> <br />
          <input
            type="password"
            onChange={handleChange}
            name="password"
            value={regData.password}
          />
        </div>
        <div className="allInputDivs">
          <label>confirm password</label> <br />
          <input
            type="password"
            onChange={handleChange}
            name="confirmPassword"
            value={regData.confirmPassword}
          />
        </div>

        <div className="allInputDivs">
          <input type="submit" value="Register" />
        </div>

        <p>
          Already an User ? <NavLink to="/login">LOGIN</NavLink>
        </p>
      </form>
    </>
  );
};

export default Register;
