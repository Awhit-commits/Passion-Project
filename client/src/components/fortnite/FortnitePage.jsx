import React, { Component } from "react";

export default class FortnitePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      platform: "",
      players:{global_stats:{duo:{},solo:{},sqaud:{}}}
    };
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmission = async (event) => {
    event.preventDefault();
    console.log(this.state);
    let response = await fetch(`https://fortnite-api.p.rapidapi.com/stats-alternative/${this.state.username}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "fortnite-api.p.rapidapi.com",
            "x-rapidapi-key": "93f6c763eemsh380fea2491e5c03p19eb58jsn907193954f9d"
        }
    })
    // .then(response => {
    //     console.log(response);
    // })
    // .catch(err => {
    //     console.log(err);
    // });
    let json = await response.json();
    console.table(json);
    this.setState({players:json})
  };

  render() {
    return (
      <div>
          <h1>Fortnite Page</h1>
        <form action="">
          <fieldset>
            <label htmlFor=" Username">
              <select
                name="platform"
                id=""
                onChange={this.handleChange}
                value={this.state.platform}
              >
                <option value="">Please Select a platform</option>
                <option value="pc">PC</option>
                <option value="xb1">XBOX</option>
                <option value="psn">PS4</option>
              </select>
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
            <p>Name: {this.state.players.name}</p>
           <p>First Place in Duo game mode:{this.state.players.global_stats.duo.placetop1}</p> 
           
          
        </div>
      </div>
    );
  }
}
