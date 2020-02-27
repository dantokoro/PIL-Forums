import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../css/navbar.css";
import axios from "axios";

export default class Navbar extends Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
  }

  logout(event) {
    event.preventDefault();
    console.log("logging out");
    axios
      .get("/auth/logout")
      .then(response => {
        console.log(response.data);
        if (response.status === 200) {
          this.props.updateUser({
            loggedIn: false,
            username: null
          });
        }
      })
      .catch(error => {
        console.log("Logout error");
      });
  }

  render() {
    const loggedIn = this.props.loggedIn;
    console.log("navbar render, props: ", this.props);

    return (
      <div>
        <header className="top-black-style">
          <nav>
            <ul>
              <li className="special title"><img src="https://res.cloudinary.com/dbzfjnlhl/image/upload/v1582727690/2700638601_f82112e0-f68e-402c-8433-174222f676ca_jagmso.png" alt="logo" /></li>
              <div className="separation"></div>
              <li><Link to="/" className="menu">Home</Link></li>
              <li><Link to="auth/profile" className="menu">Profile</Link></li>
              <li>Work</li>
              <li>Portfolio</li>
              <li>Contact</li>
              <div className="separation"></div>
              <li ><Link to="/login" className="special">LOGIN</Link></li>
              {/* <li class="special">New User</li> */}
            </ul>
          </nav>
        </header>
      </div>
    );
  }
}
