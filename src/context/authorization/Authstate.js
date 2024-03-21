import React from "react";
import authcontext from "./Authcontext";
import { useNavigate } from "react-router-dom";

const Authstate = (props) => {
  const host = "http://localhost:5000";
  const navigate = useNavigate();

  // To login the website
  const login = async (email, password) => {
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect to home page
      localStorage.setItem("token", json.authtoken);
      localStorage.setItem("loginId", json?.data?.user?.id)
      navigate("/");
      alert("Succefully Logged In");
    } else {
      //           Show error message
      alert("Invalid Credentials");
    }
  };

  // To Sigup new user
  const signup = async (name, email, password, number) => {
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, number }),
    });
    const json = await response.json();
    console.log(json);

    if (json.success) {
      // Save the auth token and redirect to home page
      localStorage.setItem("token", json.authtoken);
      navigate("/");
      alert("You have signed up succefully");
    } else {
      //Show error message
      alert("Invalid Credentials");
    }
  };

  return (
    <authcontext.Provider value={{ login, signup }}>
      {props.children}
    </authcontext.Provider>
  );
};

export default Authstate;
