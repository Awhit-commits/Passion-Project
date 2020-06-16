import React, { Component } from "react";

class apexPage extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          username: "",
          platform: "",
          players:{players:{global:{name:""}}}
        };
      }
      handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
      };
      handleSubmission = async (event) => {
        event.preventDefault();
        console.log(this.state);
        let response = await fetch(
          `https://api.mozambiquehe.re/bridge?version=4&platform=${this.state.platform}&player=${this.state.username}&auth=FkSyxvRQhUX1ijcJGGKb`,
          
        );
        let json = await response.json();
        console.table(json);
        console.log(json.global.name);
      };
  render() {
    return (
      <div>
          <h1>Apex Legends</h1>
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
                <option value="PC">PC</option>
                <option value="X1">XBOX</option>
                <option value="PS4">PS4</option>
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
        {/* <p>{this.state.players.global.name}</p> */}
        </div>
      </div>
    );
  }
}
export default apexPage;
