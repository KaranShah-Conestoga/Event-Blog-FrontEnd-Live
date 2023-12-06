import React from 'react'
import { Button } from 'react-bootstrap'
import { Auth } from "../../Core/Services/AuthService";
import { Link, useNavigate } from "react-router-dom";
import "./Navigation.scss"

function Navigation() {
  const user = Auth.getUser();
  const navigate = useNavigate();

  const handelAction = () => {
    Auth.logout().then(() => {
      navigate("/login/");
    });
  };
  return (
    <div className="navigation">
      <h4>Admin </h4>

      <div className="nav-item">
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/allusers">AllUsers</Link>
          </li>
          <li>
            <Link to="/request">Request</Link>
          </li>
          <li>
            <Link to="/reports">Reports</Link>
          </li>
        </ul>
      </div>
      <div className="menu">
        <Button onClick={() => handelAction()}>LogOut</Button>
      </div>

    </div>
  )
}

export default Navigation
