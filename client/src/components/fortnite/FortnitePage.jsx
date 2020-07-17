import React, { Component } from "react";
import { Link } from "react-router-dom";
import { store } from 'react-notifications-component';
import FortniteFriends from "./FortniteFriends";
import BackgroundImagePage from "../BackGroundImagePage";

export default class FortnitePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      platform: "",
      players: { lifetime: {all:{defaultduo:{placetop1:0},defaultsolo:{placetop1:0},defaultsquad:{placetop1:0}}}, user: {displayName:""} },
      firstPlaceDuo: "",
      firstPlaceSquads: "",
      firstPlaceSolo: "",
      killDuo: "",
      killSquad: "",
      killSolo: "",
      minutesSolo: "",
      minutesDuo: "",
      minutesSquad: "",
      invalidAccount: false,
      existingUser: false,
    };
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmission = async (event) => {
    event.preventDefault();
    console.log(this.state);
    //Retrieveing fortnite api data
    let response = await fetch(
      `https://fortnite-api.p.rapidapi.com/stats/${this.state.username}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "fortnite-api.p.rapidapi.com",
          "x-rapidapi-key":
            "93f6c763eemsh380fea2491e5c03p19eb58jsn907193954f9d",
        },
      }
    );
    // .then(response => {
    //     console.log(response);
    // })
    // .catch(err => {
    //     console.log(err);
    // });

    //setting response to json format
    let json = await response.json();
    console.table(json);
    if (json.error) {
      this.setState({ invalidAccount: true });
    } else if (json.message) {
      this.setState({ existingUser: true, invalidAccount: false });

    } else {
      this.setState({ players: json });
      this.setState({ invalidAccount: false });

      //Error Handling if property doesn't exist

      // if (this.state.players.account == undefined) {
      //   this.setState({ players: { account: { level: 0 } } });
      // }
      // if (this.state.players.global_stats.solo == undefined) {
      //   this.setState({
      //     name: this.state.players.name,
      //     firstPlaceSolo: 0,
      //     killSolo: 0,
      //     firstPlaceDuo: this.state.players.global_stats.duo.placetop1,
      //     killDuo: this.state.players.global_stats.duo.kills,
      //     killSquad: this.state.players.global_stats.squad.kills,
      //     firstPlaceSquads: this.state.players.global_stats.squad.placetop1,
      //     minutesSolo: 0,
      //     minutesDuo: this.state.players.global_stats.duo.minutesplayed,
      //   });
      // } else if (this.state.players.global_stats.duo == undefined) {
      //   this.setState({
      //     name: json.name,
      //     firstPlaceDuo: 0,
      //     killDuo: 0,
      //     firstPlaceSquads: json.global_stats.squad.placetop1,
      //     firstPlaceSolo: this.state.players.global_stats.solo.placetop1,
      //     killSquad: this.state.players.global_stats.squad.kills,
      //     killSolo: json.global_stats.solo.kills,
      //   });
      // } else if (this.state.players.global_stats.squad == undefined) {
      //   this.setState({
      //     name: json.name,
      //     firstPlaceSquads: 0,
      //     killSquad: 0,
      //     firstPlaceDuo: this.state.players.global_stats.duo.placetop1,
      //     firstPlaceSolo: this.state.players.global_stats.solo.placetop1,
      //     killDuo: this.state.players.global_stats.duo.kills,
      //     killSolo: json.global_stats.solo.kills,
      //   });
      // } else {
      //   this.setState({
      //     name: json.name,
      //     firstPlaceDuo: json.global_stats.duo.placetop1,
      //     firstPlaceSquads: json.global_stats.squad.placetop1,
      //     firstPlaceSolo: json.global_stats.solo.placetop1,
      //     killDuo: json.global_stats.duo.kills,
      //     killSquad: json.global_stats.squad.kills,
      //     killSolo: json.global_stats.solo.kills,
      //   });
      // }
    }
    // console.log(this.state);
    if(json.error){
      this.setState({ invalidAccount: true });
      // Notification for player not existing
      store.addNotification({
        title: "Error!",
        message: "Player doesn't exist",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 1000,
          onScreen: false
        }

    })
  }
    else{
    this.setState({players:{user:{displayName:json.user.displayName}}})
    this.setState({
      name: json.user.displayName,
      firstPlaceDuos: json.lifetime.all.defaultduo.placetop1,
      firstPlaceSquads: json.lifetime.all.defaultsquad.placetop1,
      firstPlaceSolo: json.lifetime.all.defaultsolo.placetop1,
      killDuo: json.lifetime.all.defaultduo.kills,
      killSquad: json.lifetime.all.defaultsquad.kills,
      killSolo: json.lifetime.all.defaultsolo.kills,
    });
  }
  };

  //Save Friend function
  saveFriend = async (event) => {
    event.preventDefault();
    // let friend = {
    //   gamerTag: this.state.username,
    //   firstPlaceSolo: this.state.players.global_stats.solo.placetop1,
    //   firstPlaceSquads: this.state.players.global_stats.squad.placetop1,
    //   firstPlaceDuo: this.state.players.global_stats.duo.placetop1,
    //   killSolo: this.state.players.global_stats.solo.kills,
    //   killSquad: this.state.players.global_stats.squad.kills,
    //   killDuo: this.state.players.global_stats.duo.kills,
    //   level: this.state.players.level,
    // };
    let response = await fetch(`/fortnite/${this.props.id}`, {
      method: "put",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        gamerTag: this.state.username,
        firstPlaceSolo: this.state.firstPlaceSolo,
        firstPlaceSquads: this.state.firstPlaceSquads,
        firstPlaceDuo: this.state.firstPlaceDuos,
        killSolo: this.state.killSolo,
        killSquad: this.state.killSquad,
        killDuo: this.state.killDuo,
        // level: this.state.players.level
      }),
    });
    
    let json = await response.json();
    console.log(json);
    if(json.message){
      // Notification for is the player is already a friend
      store.addNotification({
        title: "Error!",
        message: "Friend Already Exist",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 1000,
          onScreen: true
        }
      });
    }
    else{
      // Notification for friend was added
    store.addNotification({
      title: "Wonderful!",
      message: "Friend Added",
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 1000,
        onScreen: true
      }
    });
  }
  };

  render() {
    // Page for if user doesn't exist
    if (this.state.invalidAccount) {
      return (
        
        <div className="fortnitePage">
          <div>
          {/* <BackgroundImagePage/> */}

            <h1>Fortnite Page</h1>
            <form action="">
              <fieldset>
                <label htmlFor=" Username">
                  {/* <select
                name="platform"
                id=""
                onChange={this.handleChange}
                value={this.state.platform}
              >
                <option value="">Please Select a platform</option>
                <option value="pc">PC</option>
                <option value="xb1">XBOX</option>
                <option value="psn">PS4</option>
              </select> */}
              {/* <p>Find Your Fortnite Competition</p> */}
                  <input
                    type="text"
                    name="username"
                    className = "form-control"
                    id="searchBar"
                    value={this.state.username}
                    placeholder="Username"
                    onChange={this.handleChange}
                  />
                  <button className = "searchButton searchContainer btn btn-primary" onClick={this.handleSubmission}>Search</button>
                  <div>
                    {/* <small className="text-danger">Person doesn't exist</small> */}
                  </div>
                </label>
              </fieldset>
            </form>
          </div>
          <div className = "resultsContainer">
            <p className = "text-danger">Name: Invalid Username</p>
            {/* <p>First Place in Duo game mode:{this.state.players.global_stats.duo.placetop1}</p>  */}
            <p>Level:0 </p>
            <div>{/* <button onClick={this.saveFriend}>Save!</button> */}</div>
          </div>
        </div>
      );
    } else if (this.props.token) {
      return (
        <div className="fortnitePage">
          <h1>Fortnite Page</h1>
          <form action="">
            <fieldset>
              <label htmlFor=" Username">
                {/* <select
                name="platform"
                id=""
                onChange={this.handleChange}
                value={this.state.platform}
              >
                <option value="">Please Select a platform</option>
                <option value="pc">PC</option>
                <option value="xb1">XBOX</option>
                <option value="psn">PS4</option>
              </select> */}
                <input
                  type="text"
                  className = "form-control"
                  name="username"
                  id="searchBar"
                  value={this.state.username}
                  placeholder="Please Enter Epic Username"
                  onChange={this.handleChange}
                />
                <button className = "searchButton btn btn-primary searchContainer" onClick={this.handleSubmission}>Search</button>
              </label>
            </fieldset>
          </form>
          <div className = "resultsContainer">
            <p>
              Name:{" "}
              <Link to={`/fortnite/stats/${this.state.username}`}>
                {this.state.players.user.displayName}
              </Link>
            </p>
            {/* <p>First Place in Duo game mode:{this.state.players.global_stats.duo.placetop1}</p>  */}
            {/* <p>Level:{this.state.players.account.level} </p> */}
            <div>
              {/* <button className = "btn btn-primary saveButton" onClick={this.saveFriend}>Save!</button> */}
            </div>
            <div>
          
            {/* <FortniteFriends id = {this.props.id}/> */}
        </div>
          </div>
        </div>
        
      );
    } else if (this.state.existingUser && this.props.token) {
      return (
        <div className="fortnitePage">
          <h1>Fortnite Page</h1>
          <form action="">
            <fieldset>
              <label htmlFor=" Username">
                {/* <select
                name="platform"
                id=""
                onChange={this.handleChange}
                value={this.state.platform}
              >
                <option value="">Please Select a platform</option>
                <option value="pc">PC</option>
                <option value="xb1">XBOX</option>
                <option value="psn">PS4</option>
              </select> */}
                <input
                  type="text"
                  className = "form-control searchContainer"
                  name="username"
                  id="searchBar"
                  value={this.state.username}
                  placeholder="Please Enter Epic Username"
                  onChange={this.handleChange}
                />
                <small className="text-danger">User is already a friend</small>
                <button className = "searchButton searchContainer" onClick={this.handleSubmission}>Search</button>
              </label>
            </fieldset>
          </form>
          <div>
            <p>
              Name:{" "}
              <Link to={`/fortnite/stats/${this.state.username}`}>
                {this.state.players.user.displayName}
              </Link>
            </p>
            {/* <p>First Place in Duo game mode:{this.state.players.global_stats.duo.placetop1}</p>  */}
            {/* <p>Level:{this.state.players.account.level} </p> */}
            <div>
              <button className = "saveButton btn btn-primary" onClick={this.saveFriend}>Save!</button>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="fortnitePage">
        <h1>Fortnite Page</h1>
       
        <form action="">
        
          <fieldset>
            <label htmlFor=" Username">
              {/* <select
                name="platform"
                id=""
                onChange={this.handleChange}
                value={this.state.platform}
              >
                <option value="">Please Select a platform</option>
                <option value="pc">PC</option>
                <option value="xb1">XBOX</option>
                <option value="psn">PS4</option>
              </select> */}
              {/* <p className = "competitionTag">Find your Fortnite Competition</p> */}
              
              <input
                className="form-control searchContainer"
                id="searchBar"
                type="text"
                name="username"
                value={this.state.username}
                placeholder="Please Enter Epic Username"
                onChange={this.handleChange}
              />
              <button className = "searchButton btn btn-primary searchContainer" onClick={this.handleSubmission}>Search</button>
              
            </label>
          </fieldset>
          
        </form>
        
        <div className = "resultsContainer">
          <p>
            Name:{" "}
            <Link className = "text-dark" to={`/fortnite/stats/${this.state.username}`}>
              {this.state.players.user.displayName}
            </Link>
          </p>
          {/* <p>First Place in Duo game mode:{this.state.players.global_stats.duo.placetop1}</p>  */}
          {/* <p>Level:{this.state.players.account.level} </p> */}
          <div>{/* <button onClick={this.saveFriend}>Save!</button> */}</div>
        </div>
      </div>
    );
  }
}
