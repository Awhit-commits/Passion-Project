import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import FortnitePage from "./fortnite/FortnitePage";
import ApexPage from "./Apex/ApexPage";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Leaderboard from "./RainbowSix/Leaderboard";
import MyProfile from "./Profile/MyProfile";
import StatsPageFortnite from "./fortnite/StatsPageFortnite";
import NavBar from "./NavBar/NavBar";
import EditProfile from "./Profile/EditProfile";

export default class AppContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      token: "",
      friends: [],
    };
  }
  getToken = async (token) => {
    this.setState({ token: token });
    console.log(this.state.token);
    let response = await fetch("/users/verify", {
      method: "post",
      headers: {
        Authorization: this.state.token,
      },
    });
    let json = await response.json();
    console.log(json);
    this.setState({ id: json.message.id });
  };
  //load the fortnite friends collection
  async componentDidMount() {
    let response = await fetch("/fortnite/friends");
    let json = await response.json();

    console.log(json);
    this.setState({ friends: json });
    // this.updateFriends()
  }

  //   updateFriends = async()=>{
  //  this.state.friends.map( async (friends)=>{

  //       let response = await fetch(
  //         `https://fortnite-api.p.rapidapi.com/stats-alternative/${friends.gamerTag}`,
  //         {
  //           method: "GET",
  //           headers: {
  //             "x-rapidapi-host": "fortnite-api.p.rapidapi.com",
  //             "x-rapidapi-key":
  //               "93f6c763eemsh380fea2491e5c03p19eb58jsn907193954f9d",
  //           },
  //         }
  //       );
  //       let json =  await response.json()
  //       console.log(json);
  //     })
  //   }

  render() {
    let login, register;
    if (this.state.token) {
    }
    return (
      <div>
        <Router>
          <NavBar id={this.state.id} token={this.state.token} />
          {/* Fortnite Routes */}
          <Route
           exact path="/fortnite"
            exact
            component={(props) => (
              <FortnitePage
                {...props}
                token={this.state.token}
                id={this.state.id}
              />
            )}
          ></Route>
          <Route
           exact path="/"
            exact
            component={(props) => (
              <FortnitePage
                {...props}
                token={this.state.token}
                id={this.state.id}
              />
            )}
          ></Route>
          <Route
            path="/fortnite/stats/:id"
            exact
            component={(props) => <StatsPageFortnite {...props} userID = {this.state.id} token = {this.state.token} />}
          ></Route>

          {/* Apex Routes */}
          <Route path="/apex" exact component={() => <ApexPage />}></Route>

          {/* <Route path = "/rainbow/leaderboard" exact component = {() =><Leaderboard/>}></Route> */}

          {/* Login/Register Routes */}
          <Route
            path="/login"
            exact
            component={(props) => <Login {...props} getToken={this.getToken} />}
          ></Route>
          <Route path="/register" exact component={() => <Register />}></Route>

          {/* Profile Routes */}

          <Route
            path="/profile/:id"
            exact
            component={(props) => <MyProfile {...props} id={this.state.id} />}
          ></Route>

          <Route
            path="/profile/edit/:id"
            exact
            component={(props) => <EditProfile {...props} id={this.state.id} />}
          ></Route>
         
          {/* <div className="homepageContainer">
          <Link to = "/fortnite"><div className ="fortnite"><p>Fortnite</p></div></Link>
          <Link to = "/apex"><p className= "apex">Apex Legends</p></Link>
          {/* <Link to ="/rainbow/leaderboard">Rainbow Six Seige</Link> */}
          {/* <Link to = "/login"><p>Login</p></Link>
          <Link to = "/register"><p>Register</p></Link> */}
          {/* <Link to = {`/profile/${this.state.id}`}><p>My Profile</p></Link> */}

          {/* </div> */}
          {/* <FortnitePage/> */}
        </Router>
      </div>
    );
  }
}
