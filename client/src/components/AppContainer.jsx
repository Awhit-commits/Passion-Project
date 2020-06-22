import React, { Component } from "react";
import { BrowserRouter as Router,Link,Route} from 'react-router-dom'
import FortnitePage from "./fortnite/FortnitePage";
import ApexPage from "./Apex/ApexPage";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Leaderboard from "./RainbowSix/Leaderboard";
import MyProfile from "./Profile/MyProfile";
import StatsPageFortnite from "./fortnite/StatsPageFortnite";

export default class AppContainer extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       id:"",
       token:""
    }
  }
  getToken = async(token)=>{
    this.setState({token:token})
    console.log(this.state.token);
    let response = await fetch('/users/verify',{
      method:"post",
      headers:{
        "Authorization":this.state.token
      }
    })
    let json  = await response.json();
    console.log(json);
    this.setState({id:json.message.id})
  }
  
  render() {
    return (
      <div>
        <Router>
          {/* Fortnite Routes */}
          <Route path ="/fortnite" exact component ={(props)=><FortnitePage {...props} id = {this.state.id}/>}></Route>
          <Route path ="/fortnite/stats/:id" exact component = {(props)=><StatsPageFortnite {...props}/>}></Route>


          {/* Apex Routes */}
          <Route path = "/apex" exact component = {()=><ApexPage/>}></Route>



          {/* <Route path = "/rainbow/leaderboard" exact component = {() =><Leaderboard/>}></Route> */}



          <Route path = "/login" exact component = {(props)=><Login {...props} getToken = {this.getToken}/>}></Route>
          <Route path = "/register" exact component = {()=><Register/>}></Route>

          <Route path = "/profile/:id" exact component = {(props)=><MyProfile {...props} id = {this.state.id}/>}></Route>
         
        <div className="homepageContainer">
          <Link to = "/fortnite"><div className ="fortnite"><p>Fortnite</p></div></Link>
          <Link to = "/apex"><p className= "apex">Apex Legends</p></Link>
          {/* <Link to ="/rainbow/leaderboard">Rainbow Six Seige</Link> */}
          <Link to = "/login"><p>Login</p></Link>
          <Link to = "/register"><p>Register</p></Link>
          <Link to = {`/profile/${this.state.id}`}><p>My Profile</p></Link>

            
        </div>
        </Router>
      </div>
    );
  }
}
