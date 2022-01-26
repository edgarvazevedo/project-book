import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

import iconUser from "../assets/noun-user-3184169.png";

function Navbar() {
  const { loggedInUser, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Home
        </Link>

        <Link className="navbar-brand" to="/book/create">Create a new book</Link>

        <div>
          {loggedInUser.user._id ? (
            <>
              <span>Bem-vindo, {loggedInUser.user.name}</span>

              <button onClick={() => logout()} className="btn btn-link">
                Sair
              </button>
            </>
          ) : (
            <NavLink
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
              to="/login"
            >
              <img src={iconUser} alt="" style={{ width: "2rem" }} />
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
