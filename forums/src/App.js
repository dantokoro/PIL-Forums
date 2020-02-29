import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Navbar from "./components/navbar.component";
import Home from "./components/home.component";
import Login from "./components/user/login.component";
import Profile from "./components/user/profile.component";

axios.defaults.withCredentials = true;
class App extends Component {
  constructor() {
    super();
    this.state = {
      current_user: null
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
      console.log("Current user(app): ", response.data);
      if (response.data.user) {
        this.setState({
          current_user: response.data.user.username
        });
      } else {
        this.setState({
          current_user: null
        });
      }
    });
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Navbar updateUser={this.updateUser} current_user={this.state.current_user} />
          {this.state.current_user && <p>Join the party, {this.state.current_user}!</p>}
          <Route exact path="/" component={Home} />
          <Route
            path="/login"
            render={() => <Login updateUser={this.updateUser} />}
          />
          <Route path="/auth/profile" render={() => <Profile current_user={this.state.current_user} />} />
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
