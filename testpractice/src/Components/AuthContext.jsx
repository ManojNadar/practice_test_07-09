import React, { createContext, useEffect, useReducer } from "react";
import api from "./ApiConfig/index";

const initialState = { currentuser: null };

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        currentuser: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        currentuser: null,
      };
    default:
      return state;
  }
};

export const MyUserContext = createContext();

const MyContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //   console.log("userDetails - ", state.currentuser, "token - ", state?.token);

  const login = (userData, token) => {
    localStorage.setItem("userToken", JSON.stringify(token));
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };

  const logout = () => {
    localStorage.removeItem("userToken");
    dispatch({
      type: "LOGOUT",
    });
  };

  useEffect(() => {
    async function getCurrentUseData() {
      const token = JSON.parse(localStorage.getItem("userToken"));

      if (token) {
        const response = await api.post("/currentuser", {
          token,
        });

        if (response.data.success) {
          dispatch({
            type: "LOGIN",
            payload: response.data.user,
          });
        } else {
          dispatch({
            type: "LOGOUT",
          });
        }
      }
    }

    getCurrentUseData();
  }, []);

  return (
    <>
      <MyUserContext.Provider value={{ login, logout, state }}>
        {children}
      </MyUserContext.Provider>
    </>
  );
};

export default MyContext;
