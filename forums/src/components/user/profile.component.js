import React, { Component } from "react";
import "../../css/profile.css";
import axios from 'axios'

export default class Profile extends Component {
  componentDidMount(){
    axios.get("http://localhost:8000/auth/profile").then(response => {
      console.log("Current user (profile page): ", response.data);
      // if (response.data.user) {
      //   this.setState({
      //     loggedIn: true,
      //     username: response.data.user.username
      //   });
      // } else {
      //   this.setState({
      //     loggedIn: false,
      //     username: null
      //   });
      // }
    });
  }

  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="profile-card js-profile-card">
            <div className="profile-card__img">
              <img
                src="https://res.cloudinary.com/muhammederdem/image/upload/v1537638518/Ba%C5%9Fl%C4%B1ks%C4%B1z-1.jpg"
                alt="profile card"
              />
            </div>

            <div className="profile-card__cnt js-profile-cnt">
              <div className="profile-card__name">Muhammed Erdem</div>

              <span className="profile-card-loc__txt">Istanbul, Turkey</span>
            </div>

            <div className="profile-card-inf">
              <div className="profile-card-inf__item">
                <div className="profile-card-inf__title">1598</div>
                <div className="profile-card-inf__txt">Followers</div>
              </div>

              <div className="profile-card-inf__item">
                <div className="profile-card-inf__title">65</div>
                <div className="profile-card-inf__txt">Following</div>
              </div>

              <div className="profile-card-inf__item">
                <div className="profile-card-inf__title">123</div>
                <div className="profile-card-inf__txt">Articles</div>
              </div>

              <div className="profile-card-inf__item">
                <div className="profile-card-inf__title">85</div>
                <div className="profile-card-inf__txt">Works</div>
              </div>
            </div>

            <div className="profile-card-ctr">
              <button className="profile-card__button button--blue js-message-btn">
                Message
              </button>
              <button className="profile-card__button button--orange">
                Follow
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
