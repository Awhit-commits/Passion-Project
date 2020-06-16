import React, { Component } from "react";
import { BrowserRouter as Router,Link,Route} from 'react-router-dom'
import FortnitePage from "./fortnite/FortnitePage";
import ApexPage from "./Apex/ApexPage";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Leaderboard from "./RainbowSix/Leaderboard";

export default class AppContainer extends Component {
  render() {
    return (
      <div>
        <Router>
          <Route path ="/fortnite" exact component ={()=><FortnitePage/>}></Route>
          <Route path = "/apex" exact component = {()=><ApexPage/>}></Route>
          <Route path = "/rainbow/leaderboard" exact component = {() =><Leaderboard/>}></Route>

          <Route path = "/login" exact component = {()=><Login/>}></Route>
          <Route path = "/register" exact component = {()=><Register/>}></Route>
         
        <div className="homepageContainer">
          <Link to = "/fortnite"><div className ="fortnite"><p>Fortnite</p></div></Link>
          <Link to = "/apex"><p className= "apex">Apex Legends</p></Link>
          <Link to ="/rainbow/leaderboard">Rainbow Six Seige</Link>

            
        </div>
        </Router>
      </div>
    );
  }
}
