import React, { Component } from "react";

export default class FortnitePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      platform: "",
      players:{}
    };
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmission = async (event) => {
    event.preventDefault();
    console.log(this.state);
    let response = await fetch(
      `https://api.fortnitetracker.com/v1/profile/${this.state.platform}/${this.state.username}`,
      {
        headers: {
          "TRN-Api-Key": "c34e46e3-3441-4b17-a71e-85abd1c54b94",
          "Access-Control-Allow-Origin": "*",
          "Content-type": "application/json; charset=UTF-8",
        },
        
      }
    );
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
          
        </div>
      </div>
    );
  }
}
