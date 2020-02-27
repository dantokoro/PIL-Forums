import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Navbar from "./components/navbar.component";
import Home from "./components/home.component";
import Login from "./components/user/login.component";
import Profile from "./components/user/profile.component";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      username: null
    };

    this.getUser = this.getUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    this.getUser();
  }

  updateUser(userObject) {
    this.setState(userObject);
  }

  getUser() {
    axios.get("http://localhost:8000/auth").then(response => {
      console.log("Current user: ", response.data);
      if (response.data.user) {
        this.setState({
          loggedIn: true,
          username: response.data.user.username
        });
      } else {
        this.setState({
          loggedIn: false,
          username: null
        });
      }
    });
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
          {this.state.loggedIn && <p>Join the party, {this.state.username}!</p>}
          <Route exact path="/" component={Home} />
          <Route
            path="/login"
            render={() => <Login updateUser={this.updateUser} />}
          />
          <Route path="/auth/profile" render={() => <Profile />} />
        </div>
      </Router>
    );
  }
}
// function App() {
//   return (
//     <Router>
//       <div className="container">
//         <Navbar />
//         <br/>
//         <Route path="/" exact component={Login} />
//         {/* <Route path="/edit/:id" component={EditExercise} />
//         <Route path="/create" component={CreateExercise} /> */}
//         <Route path="/auth/profile" component={Profile} />
//       </div>
//     </Router>
//   );
// }

export default App;
