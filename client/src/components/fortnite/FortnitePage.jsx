import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class FortnitePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      platform: "",
      players: { account: {}, global_stats: {} },
      firstPlaceDuos: "",
      firstPlaceSquads: "",
      firstPlaceSolo: "",
      killDuo: "",
      killSquad: "",
      killSolo: "",
      minutesSolo:"",
      minutesDuo:"",
      minutesSquad:"",
      invalidAccount:false
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
      `https://fortnite-api.p.rapidapi.com/stats-alternative/${this.state.username}`,
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
    if(json.error){
      this.setState({invalidAccount:true})
    }
    else{
      this.setState({players:json})
      this.setState({invalidAccount:false})
    
    
   

    //Error Handling if property doesn't exist

    if (this.state.players.account == undefined){
      this.setState({players:{account:{level:0}}})
    }
    if (this.state.players.global_stats.solo == undefined) {
      this.setState({
        name: this.state.players.name,
        firstPlaceSolo: 0,
        killSolo: 0,
        firstPlaceDuos: this.state.players.global_stats.duo.placetop1,
        killDuo: this.state.players.global_stats.duo.kills,
        killSquad: this.state.players.global_stats.squad.kills,
        firstPlaceSquads: this.state.players.global_stats.squad.placetop1,
        minutesSolo:0,
        minutesDuo:this.state.players.global_stats.duo.minutesplayed
      });
    } else if (this.state.players.global_stats.duo == undefined) {
      this.setState({
        name: json.name,
        firstPlaceDuos: 0,
        killDuo: 0,
        firstPlaceSquads: json.global_stats.squad.placetop1,
        firstPlaceSolo: this.state.players.global_stats.solo.placetop1,
        killSquad: this.state.players.global_stats.squad.kills,
        killSolo: json.global_stats.solo.kills,
      });
    } else if (this.state.players.global_stats.squad == undefined) {
      this.setState({
        name: json.name,
        firstPlaceSquads: 0,
        killSquad: 0,
        firstPlaceDuos: this.state.players.global_stats.duo.placetop1,
        firstPlaceSolo: this.state.players.global_stats.solo.placetop1,
        killDuo: this.state.players.global_stats.duo.kills,
        killSolo: json.global_stats.solo.kills,
      });
    } else {
      this.setState({
        name: json.name,
        firstPlaceDuos: json.global_stats.duo.placetop1,
        firstPlaceSquads: json.global_stats.squad.placetop1,
        firstPlaceSolo: json.global_stats.solo.placetop1,
        killDuo: json.global_stats.duo.kills,
        killSquad: json.global_stats.squad.kills,
        killSolo: json.global_stats.solo.kills,
      });
    }}
    console.log(this.state);
  };


  //Save Friend function
  saveFriend = async (event) => {
    event.preventDefault();
    let friend = {
      gamerTag: this.state.username,
      firstPlaceSolo: this.state.players.global_stats.solo.placetop1,
      firstPlaceSquads: this.state.players.global_stats.squad.placetop1,
      firstPlaceDuo: this.state.players.global_stats.duo.placetop1,
      killSolo: this.state.players.global_stats.solo.kills,
      killSquad: this.state.players.global_stats.squad.kills,
      killDuo: this.state.players.global_stats.duo.kills,
      level: this.state.players.level,
    };
    let response = await fetch(`/fortnite/${this.props.id}`, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(friend),
    });
    let json = await response.json();
    console.log(json);
  };

  render() {
    if(this.state.invalidAccount){
      return (
        <div>
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
                name="username"
                id=""
                value={this.state.username}
                placeholder="Username"
                onChange={this.handleChange}
              />
              <button onClick={this.handleSubmission}>Search</button>
              <div>
                <small className = "text-danger">Person doesn't exist</small>
              </div>
            </label>
          </fieldset>
        </form>
        <div>
          <p>
            Name:{" "}
            Invalid Username
          </p>
          {/* <p>First Place in Duo game mode:{this.state.players.global_stats.duo.placetop1}</p>  */}
          <p>Level:0 </p>
          <div>
            {/* <button onClick={this.saveFriend}>Save!</button> */}
          </div>
        </div>
      </div>
      )
    }
    else if (this.props.token){
      return (
        <div>
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
                name="username"
                id=""
                value={this.state.username}
                placeholder="Username"
                onChange={this.handleChange}
              />
              <button onClick={this.handleSubmission}>Search</button>
            </label>
          </fieldset>
        </form>
        <div>
          <p>
            Name:{" "}
            <Link to={`/fortnite/stats/${this.state.username}`}>
              {this.state.players.name}
            </Link>
          </p>
          {/* <p>First Place in Duo game mode:{this.state.players.global_stats.duo.placetop1}</p>  */}
          <p>Level:{this.state.players.account.level} </p>
          <div>
            <button onClick={this.saveFriend}>Save!</button>
          </div>
        </div>
      </div>
      )


    }
    return (
      <div>
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
                name="username"
                id=""
                value={this.state.username}
                placeholder="Username"
                onChange={this.handleChange}
              />
              <button onClick={this.handleSubmission}>Search</button>
            </label>
          </fieldset>
        </form>
        <div>
          <p>
            Name:{" "}
            <Link to={`/fortnite/stats/${this.state.username}`}>
              {this.state.players.name}
            </Link>
          </p>
          {/* <p>First Place in Duo game mode:{this.state.players.global_stats.duo.placetop1}</p>  */}
          <p>Level:{this.state.players.account.level} </p>
          <div>
            {/* <button onClick={this.saveFriend}>Save!</button> */}
          </div>
        </div>
      </div>
    );
  }
}
