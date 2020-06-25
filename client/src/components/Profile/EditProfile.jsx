import React, { Component } from "react";

export default class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      psnName: "",
      xLiveName: "",
      steamName: "",
      username: "",
    };
  }
  //Retreiving stored info associated with the user
  async componentDidMount() {
    let response = await fetch(`/users/profile/${this.props.id}`);
    let json = await response.json();

    console.log(json);
    this.setState({
      name: json.name,
      email: json.email,
      username: json.username,
    });
  }

  //Handling input changes
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };


//
  handleSubmission = async (event) => {
    event.preventDefault();
    let updateUser = {
      name: this.state.name,
      email: this.state.email,
      psnName: this.state.psnName,
      xLiveName: this.state.xLiveName,
      steamName: this.state.steamName,
    };
    let response = await fetch(`/users/profile/${this.props.id}`, {
      method: "put",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateUser),
    });

    let json = await response.json();

    console.log(json);

    window.history.back();
  };
  render() {
    return (
      <div>
        <form className="form-horizontal" action="" method="">
          <fieldset>
            <div id="legend">
              <legend className="">Edit Information</legend>
            </div>
            <div className="control-group">
              {/* <!-- Name --> */}
              <label className="control-label" htmlFor="name">
                Name
              </label>
              <div className="controls">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder=""
                  class="input-xlarge"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="control-group">
              {/* <!-- Username --> */}
              <label className="control-label" htmlFor="username">
                Username
              </label>
              <div className="controls">
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder=""
                  class="input-xlarge"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="control-group">
              {/* <!-- E-mail --> */}
              <label className="control-label" htmlFor="email">
                E-mail
              </label>
              <div className="controls">
                <input
                  type="text"
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
              {/* <!-- Playstation Name --> */}
              <label className="control-label" htmlFor="username">
                Playstation Network Name
              </label>
              <div className="controls">
                <input
                  type="text"
                  id="psnName"
                  name="psnName"
                  placeholder=""
                  class="input-xlarge"
                  value={this.state.psnName}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="control-group">
              {/* <!-- Xbox Live Name --> */}
              <label className="control-label" htmlFor="XLiveName">
                Xbox Live Name
              </label>
              <div className="controls">
                <input
                  type="text"
                  id="xLiveName"
                  name="xLiveName"
                  placeholder=""
                  class="input-xlarge"
                  value={this.state.xLiveName}
                  onChange={this.handleChange}
                />
              </div>
            </div>{" "}
            <div className="control-group">
              {/* <!-- Steam Name --> */}
              <label className="control-label" htmlFor="steamName">
                Steam Name
              </label>
              <div className="controls">
                <input
                  type="text"
                  id="steamName"
                  name="steamName"
                  placeholder=""
                  class="input-xlarge"
                  value={this.state.steamName}
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
                  Update
                </button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}
