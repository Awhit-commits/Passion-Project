import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class FortnitePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      platform: "",
      players: {
        account: { level: "", progress_pct: "" },
        global_stats: {
          duo: { placetop1: "", kills: "" },
          solo: { placetop1: "", kills: "" },
          sqaud: { placetop1: "", kills: "" },
        },
      },
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
    let json = await response.json();
    console.table(json);
    this.setState({ players: json });
    if (this.state.players.global_stats.duo.placetop1 == undefined) {
      this.setState({ players: { global_stats: { duo: { placetop1: 0 } } } });
    }
  };

  saveFriend = async (event) => {
    event.preventDefault();
    let friend = {
      gamerTag: this.state.username,
      wins: this.state.players.global_stats.duo.placetop1,
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
    );
  }
}
