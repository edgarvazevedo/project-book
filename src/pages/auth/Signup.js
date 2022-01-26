import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../apis/api";
import Navbar from "../../components/Navbar";

function Signup(props) {
  const [state, setState] = useState({ name: "", password: "", email: "" });
  const [errors, setErrors] = useState({
    name: null,
    email: null,
    password: null,
  });

  const navigate = useNavigate();

  function handleChange(event) {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      // eslint-disable-next-line no-unused-vars
      const response = await api.post("/signup", state);
      setErrors({ name: "", password: "", email: "" });
      navigate("/login");
    } catch (err) {
      if (err.response) {
        console.error(err.response);
        return setErrors({ ...err.response.data.errors });
      }

      console.error(err);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Navbar />
      <div className="container">
        <h1 className="pb-3">Signup!</h1>

        <div className="ms-5 pb-3">
          <label htmlFor="signupFormName"></label>
          <input
            type="text"
            placeholder="Name"
            name="name"
            id="signupFormName"
            value={state.name}
            error={errors.name}
            onChange={handleChange}
          />
        </div>

        <div className="ms-5 pb-3">
          <label htmlFor="signupFormEmail"></label>
          <input
            type="email"
            placeholder="E-mail Address"
            name="email"
            id="signupFormEmail"
            value={state.email}
            error={errors.email}
            onChange={handleChange}
          />
        </div>

        <div className="ms-5 pb-3">
          <label htmlFor="signupFormPassword"></label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            id="signupFormPassword"
            value={state.password}
            error={errors.password}
            onChange={handleChange}
          />
        </div>

        <div>
          <button className="btn btn-primary" type="submit">
            Signup!
          </button>
        </div>
        <Link to="/login">Already have an account? Click here to login.</Link>
      </div>
    </form>
  );
}

export default Signup;
