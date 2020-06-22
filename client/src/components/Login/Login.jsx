import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      redirect: false,
    };
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmission = async (event) => {
    event.preventDefault();
    let newUser = {
      password: this.state.password,
      email: this.state.email,
    };
    let response = await fetch("/users/login", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    console.log(this.state);
    let json = await response.json();
    console.log(json);
    this.setState({ redirect: true });
    this.props.getToken(json.token);
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <form action="">
          <div className="control-group">
            {/* <!-- E-mail --> */}
            <label className="control-label" htmlFor="email">
              E-mail
            </label>
            <div className="controls">
              <input
                type="email"
                id="email"
                name="email"
                placeholder=""
                class="input-xlarge"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="control-group">
            {/* <!-- Password--> */}
            <label className="control-label" htmlFor="password">
              Password
            </label>
            <div className="controls">
              <input
                type="password"
                id="password"
                name="password"
                placeholder=""
                class="input-xlarge"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="control-group">
            {/* <!-- Button --> */}
            <div className="controls">
              <button
                className="btn btn-success"
                onClick={this.handleSubmission}
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
