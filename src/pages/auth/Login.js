import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../apis/api";
import Navbar from "../../components/Navbar"

import { AuthContext } from "../../contexts/authContext";


function Login(props) {
  const authContext = useContext(AuthContext);

  const [state, setState] = useState({ password: "", email: "" });
  const [errors] = useState({
    email: null,
    password: null,
  });

  const navigate = useNavigate();

  const { loggedInUser, setLoggedInUser } = authContext;

  

  if (loggedInUser.token && loggedInUser.user.role === "ADMIN") {
    navigate("/criar-produto");
  } else if (loggedInUser.token && loggedInUser.user.role === "USER") {
    navigate("/");
  }

  function handleChange(event) {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await api.post("/login", state);
      console.log("erro", response);
      console.log("errando", setLoggedInUser);

      authContext.setLoggedInUser({ ...response.data });
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ ...response.data })
      );
      console.log(loggedInUser.token, loggedInUser.user.role)
      
    } catch (err) {
      console.error(err);
      console.log(1234);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Navbar />
      
<div className="container">
<h1>Login</h1>
      
      <div className="ms-5 pb-3">
        <label htmlFor="signupFormEmail"></label>
        <input
          placeholder="E-mail"
          type="email"
          name="email"
          id="signupFormEmail"
          value={state.email}
          error={errors.email}
          onChange={handleChange}
        />
      </div>

      <div className="ms-5">
        <label htmlFor="signupFormPassword"></label>
        <input
          placeholder="Password"
          type="password"
          name="password"
          id="signupFormPassword"
          value={state.password}
          error={errors.password}
          onChange={handleChange}
        />
      </div>

      <div className="pt-5">
        <button type="submit" className="btn btn-primary">
          Login!
        </button>
        <div>
          <Link to="/signup">Don't have an account? Click here!</Link>
        </div>
      </div>

</div>
      
    </form>
  );
}

export default Login;