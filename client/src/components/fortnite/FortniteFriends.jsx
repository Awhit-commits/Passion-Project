import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class fortniteFriends extends Component {
  constructor(props) {
    super(props);

    this.state = {
      friends: [],
      stats: {},
      firstSolo: "",
      firstDuo: "",
      firstSquad: "",
      sortKills: false,
      sortPlay: false,
      sortWins:true
    };
  }
  //Lifecycle method to fetch user friends from the database to populate leaderboard
  async componentDidMount() {
    let response = await fetch(`/users/profile/${this.props.id}`);
    let json = await response.json();
    console.log(json);
    this.setState({ friends: json.fortniteFriends });
    console.log(this.state.friends);
    console.log(this.state);

    //function for dynamically sorting through array of objects
    function compareValues(key, order = "asc") {
      return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
          // property doesn't exist on either object
          return 0;
        }
        //ignoring casing and setting value of key parameter to a string
        const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
        const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

        //if a > b, it will descend
        let comparison = 0;
        if (varA > varB) {
          comparison = 1;
        } else if (varA < varB) {
          comparison = -1;
        }
        return order === "desc" ? comparison * -1 : comparison;
      };
    }

    console.log(this.state.friends.sort(compareValues("firstPlaceSolo", "desc")));
  }

  //Use live data instead of stored to to be more accurate when showing info under the friend name (TODO)
  getFriendsStats = async (gamerTag) => {
    let response = await fetch(
      `https://fortnite-api.p.rapidapi.com/stats-alternative/${gamerTag}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "fortnite-api.p.rapidapi.com",
          "x-rapidapi-key":
            "93f6c763eemsh380fea2491e5c03p19eb58jsn907193954f9d",
        },
      }
    );

    let json = await response.json();
    console.log(json);
    this.setState({ stats: json });

    //Error handling if a property is undefined
    if (this.state.stats.global_stats.solo == undefined) {
      this.setState({
        name: this.state.stats.name,
        firstSolo: 0,
        killSolo: 0,
        firstDuo: this.state.stats.global_stats.duo.placetop1,
        killDuo: this.state.stats.global_stats.duo.kills,
        killSquad: this.state.stats.global_stats.squad.kills,
        firstSquad: this.state.stats.global_stats.squad.placetop1,
      });
    } else if (this.state.stats.global_stats.duo == undefined) {
      this.setState({
        name: json.name,
        firstDuo: 0,
        killDuo: 0,
        firstSquad: json.global_stats.squad.placetop1,
        firstSolo: this.state.stats.global_stats.solo.placetop1,
        killSquad: this.state.stats.global_stats.squad.kills,
        killSolo: json.global_stats.solo.kills,
      });
    } else if (this.state.stats.global_stats.squad == undefined) {
      this.setState({
        name: json.name,
        firstSquad: 0,
        killSquad: 0,
        firstDuo: this.state.stats.global_stats.duo.placetop1,
        firstSolo: this.state.stats.global_stats.solo.placetop1,
        killDuo: this.state.stats.global_stats.duo.kills,
        killSolo: json.global_stats.solo.kills,
      });
    } else {
      this.setState({
        name: json.name,
        firstDuo: json.global_stats.duo.placetop1,
        firstSquad: json.global_stats.squad.placetop1,
        firstSolo: json.global_stats.solo.placetop1,
        killDuo: json.global_stats.duo.kills,
        killSquad: json.global_stats.squad.kills,
        killSolo: json.global_stats.solo.kills,
      });
    }
  };
// componentDidUpdate(prevState){
//   if(prevState.friends !== this.state.friends){
//     this.setState({friends:this.state.friends})
//   }
// }
  //Deleting a friend from the array using the id index and splice method (TODO)
  removeFriend = async (id) => {
    this.state.friends.splice(
      this.state.friends.findIndex((i) => {
        return i._id === id;
      }),
      1
    );
    console.log(this.state.friends);
    let fortniteFriends = {
      fortniteFriends: this.state.friends,
    };
    let response = await fetch(`/users/profile/${this.props.id}`, {
      method: "put",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(fortniteFriends),
    });
    let json = await response.json();
    console.log(json);
    // this.componentDidUpdate(json)
    this.componentDidMount()
    
  };
  sortKills = () => {
    this.setState({sortKills:true,sortWins:false,sortPlay:false})
    function compareValues(key, order = "asc") {
      return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
          // property doesn't exist on either object
          return 0;
        }
        //ignoring casing and setting value of key parameter to a string
        const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
        const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

        //if a > b, it will descend
        let comparison = 0;
        if (varA > varB) {
          comparison = 1;
        } else if (varA < varB) {
          comparison = -1;
        }
        return order === "desc" ? comparison * -1 : comparison;
      };
    
    }
    this.state.friends.sort(compareValues('kills','desc'))
  };

  sortWins = ()=>{
    this.setState({sortKills:false,sortWins:true,sortPlay:false})
    function compareValues(key, order = "asc") {
      return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
          // property doesn't exist on either object
          return 0;
        }
        //ignoring casing and setting value of key parameter to a string
        const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
        const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

        //if a > b, it will descend
        let comparison = 0;
        if (varA > varB) {
          comparison = 1;
        } else if (varA < varB) {
          comparison = -1;
        }
        return order === "desc" ? comparison * -1 : comparison;
      };
    
    }
    this.state.friends.sort(compareValues('firstPlaceSolo','desc'))

  }

  sortPlay = ()=>{
    this.setState({sortKills:false,sortWins:true,sortPlay:false})
    function compareValues(key, order = "asc") {
      return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
          // property doesn't exist on either object
          return 0;
        }
        //ignoring casing and setting value of key parameter to a string
        const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
        const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

        //if a > b, it will descend
        let comparison = 0;
        if (varA > varB) {
          comparison = 1;
        } else if (varA < varB) {
          comparison = -1;
        }
        return order === "desc" ? comparison * -1 : comparison;
      };
    
    }
    this.state.friends.sort(compareValues('firstPlaceSolo','desc'))

  }

  render() {
    if(this.state.sortKills){
      return <div>
        <div>
          <h4>Friend's List</h4>
          {this.state.friends.map((friends) => {
            if(this.props.psnName == friends.gamerTag){
             return <Link to={`/fortnite/stats/${friends.gamerTag}`}>
             <p>{friends.gamerTag } <b>(you)</b></p>
           </Link>

            }
            return (
              <div>
                {" "}
                <Link to={`/fortnite/stats/${friends.gamerTag}`}>
                  <p>{friends.gamerTag}</p>
                </Link>
                <p>{friends.killSolo} Solo Kills</p>
                <button onClick={() => this.removeFriend(friends._id)}>
                  Remove
                </button>
              </div>
            );
          })}
          <div>
            {" "}
            {/* <button onClick={this.sortKills}>Sort by Kills</button> */}
            <button onClick={this.sortWins}>Sort by Wins</button>
          </div>
        </div>
      </div>

    }
    else if (this.state.sortWins){
      return <div>
      <div>
        <h4>Friend's List</h4>
        {this.state.friends.map((friends) => {
          if(this.props.psnName == friends.gamerTag){
            return (<Link to={`/fortnite/stats/${friends.gamerTag}`}>
            <p>{friends.gamerTag } <b>(you)</b></p>
          </Link>
          // <div> <p>{friends.firstPlaceSolo} Solo Wins</p></div>)

            )}
          return (
            <div>
              {" "}
              <Link to={`/fortnite/stats/${friends.gamerTag}`}>
                <p>{friends.gamerTag}</p>
              </Link>
              <p>{friends.firstPlaceSolo} Solo Wins</p>
              <button onClick={() => this.removeFriend(friends._id)}>
                Remove
              </button>
            </div>
          );
        })}
        <div>
          {" "}
          <button onClick={this.sortKills}>Sort by Kills</button>
          {/* <button onClick={this.sortPlay}>Sort by Playtime</button> */}
        </div>
      </div>
    </div>


    }
    return (
      <div>
        <div>
          <h4>Friend's List</h4>
          {this.state.friends.map((friends) => {
            if(this.props.psnName == friends.gamerTag){
              return (<Link to={`/fortnite/stats/${friends.gamerTag}`}>
              <p>{friends.gamerTag } <b>(you)</b></p>
            </Link>
            //  <p>{friends.firstPlaceSolo} Solo Wins</p>)
 
              )}
            return (
              <div>
                {" "}
                <Link to={`/fortnite/stats/${friends.gamerTag}`}>
                  <p>{friends.gamerTag}</p>
                </Link>
                <p>{friends.firstPlaceSolo} Solo Wins</p>
                <button onClick={() => this.removeFriend(friends._id)}>
                  Remove
                </button>
              </div>
            );
          })}
          <div>
            {" "}
            <button onClick={this.sortKills}>Sort by Kills</button>
            {/* <button onClick={this.sortPlay}>Sort by Playtime</button> */}
          </div>
        </div>
      </div>
    );
  }
}
