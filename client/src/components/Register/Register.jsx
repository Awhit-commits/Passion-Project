import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { store } from 'react-notifications-component';

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      password_confirm: "",
      email: "",
      name:"",
      redirect:false
    };
  }

handleChange = (event)=>{
    this.setState({[event.target.name]:event.target.value})
}
handleSubmission = async (event)=>{
    event.preventDefault();
    if(this.state.password != this.state.password_confirm){
      store.addNotification({
        title: "Error!",
        message: "Passwords do not match",
        type: "warning",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 2000,
          onScreen: false
        }
      });
    }
    else{
        let newUser= {
            name:this.state.name,
            username:this.state.username,
            password:this.state.password,
            email:this.state.email
  
        }
        let response = await fetch('/users/register',{
            method:"post",
            headers:{
                "content-type":"application/json"
                
            },
            body:JSON.stringify(newUser)
        })
        console.log(this.state);
        let json = await response.json();
        console.log(json);
        this.setState({redirect:true})


    }
}

  render() {
    if(this.state.redirect){
      return <Redirect to = "/login"/>
    }
    return (
      <div className =" registrationPage">
        <form className="form-horizontal" action="" method="">
          <fieldset>
            <div id="legend">
              <legend className="">Register</legend>
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
                  onChange= {this.handleChange}
                />
                <p className="help-block">
                  Please enter your name
                </p>
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
                  onChange = {this.handleChange}
                />
                <p className="help-block">
                  Username can contain any letters or numbers, without spaces
                </p>
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
                  onChange = {this.handleChange}
                />
                <p className="help-block">Please provide your E-mail</p>
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
                  onChange = {this.handleChange}
                />
                <p className="help-block">
                  Password should be at least 4 characters
                </p>
              </div>
            </div>

            <div className="control-group">
              {/* <!-- Password --> */}
              <label className="control-label" htmlFor="password_confirm">
                Password (Confirm)
              </label>
              <div className="controls">
                <input
                  type="password"
                  id="password_confirm"
                  name="password_confirm"
                  placeholder=""
                  class="input-xlarge"
                  value={this.state.password_confirm}
                  onChange = {this.handleChange}
                />
                <p className="help-block">Please confirm password</p>
              </div>
            </div>

            <div className="control-group">
              {/* <!-- Button --> */}
              <div className="controls">
                <button className="btn btn-success" onClick = {this.handleSubmission}>Register</button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}
