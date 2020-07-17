import React, { Component } from "react";
import { store } from 'react-notifications-component';


export default class StatsPageFortnite extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstPlaceDuos: "",
      firstPlaceSquads: "",
      firstPlaceSolo: "",
      killDuo: "",
      killSquad: "",
      killSolo: "",
      name: "",
      stats: { lifetime: { all: { defaultsolo: { placetop1: "" } } } },
    };
  }
  async componentDidMount() {
    let response = await fetch(
      `https://fortnite-api.p.rapidapi.com/stats/${this.props.match.params.id}`,
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
    // this.setState({
    //   name: json.name,
    //   firstPlaceDuos: this.state.stats.global_stats.duo.placetop1,
    //   firstPlaceSquads: json.global_stats.squad.placetop1,
    //   firstPlaceSolo: this.state.stats.global_stats.solo.placetop1,
    //   killDuo: this.state.stats.global_stats.duo.kills,
    //   killSquad: this.state.stats.global_stats.squad.kills,
    //   killSolo: json.global_stats.solo.kills,
    // });
    // if (this.state.stats.global_stats.solo == undefined) {
    //   this.setState({
    //     name: this.state.stats.name,
    //     firstPlaceSolo: 0,
    //     killSolo: 0,
    //     firstPlaceDuos: this.state.stats.global_stats.duo.placetop1,
    //     killDuo: this.state.stats.global_stats.duo.kills,
    //     killSquad: this.state.stats.global_stats.squad.kills,
    //     firstPlaceSquads: this.state.stats.global_stats.squad.placetop1,
    //   });
    // } else if (this.state.stats.global_stats.duo == undefined) {
    //   this.setState({
    //     name: json.name,
    //     firstPlaceDuos: 0,
    //     killDuo: 0,
    //     firstPlaceSquads: json.global_stats.squad.placetop1,
    //     firstPlaceSolo: this.state.stats.global_stats.solo.placetop1,
    //     killSquad: this.state.stats.global_stats.squad.kills,
    //     killSolo: json.global_stats.solo.kills,
    //   });
    // } else if (this.state.stats.global_stats.squad == undefined) {
    //   this.setState({
    //     name: json.name,
    //     firstPlaceSquads: 0,
    //     killSquad: 0,
    //     firstPlaceDuos: this.state.stats.global_stats.duo.placetop1,
    //     firstPlaceSolo: this.state.stats.global_stats.solo.placetop1,
    //     killDuo: this.state.stats.global_stats.duo.kills,
    //     killSolo: json.global_stats.solo.kills,
    //   });
    // } else {
    //     this.setState({
    //       name: json.name,
    //       firstPlaceDuos: json.global_stats.duo.placetop1,
    //       firstPlaceSquads: json.global_stats.squad.placetop1,
    //       firstPlaceSolo: json.global_stats.solo.placetop1,
    //       killDuo: json.global_stats.duo.kills,
    //       killSquad: json.global_stats.squad.kills,
    //       killSolo: json.global_stats.solo.kills,
    //     });
    // }
    this.setState({
      name: json.user.displayName,
      firstPlaceDuos: json.lifetime.all.defaultduo.placetop1,
      firstPlaceSquads: json.lifetime.all.defaultsquad.placetop1,
      firstPlaceSolo: json.lifetime.all.defaultsolo.placetop1,
      killDuo: json.lifetime.all.defaultduo.kills,
      killSquad: json.lifetime.all.defaultsquad.kills,
      killSolo: json.lifetime.all.defaultsolo.kills,
    });
    console.log(this.state);
  }
  saveFriend = async (event) => {
    event.preventDefault();
    // let friend = {
    //   gamerTag: this.state.username,
    //   firstPlaceSolo: this.state.players.global_stats.solo.placetop1,
    //   firstPlaceSquads: this.state.players.global_stats.squad.placetop1,
    //   firstPlaceDuo: this.state.players.global_stats.duo.placetop1,
    //   killSolo: this.state.players.global_stats.solo.kills,
    //   killSquad: this.state.players.global_stats.squad.kills,
    //   killDuo: this.state.players.global_stats.duo.kills,
    //   level: this.state.players.level,
    // };
    let response = await fetch(`/fortnite/${this.props.userID}`, {
      method: "put",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        gamerTag: this.state.name,
        firstPlaceSolo: this.state.firstPlaceSolo,
        firstPlaceSquads: this.state.firstPlaceSquads,
        firstPlaceDuo: this.state.firstPlaceDuos,
        killSolo: this.state.killSolo,
        killSquad: this.state.killSquad,
        killDuo: this.state.killDuo,
        // level: this.state.players.level
      }),
    });
    
    let json = await response.json();
    console.log(json);
    if(json.message){
      store.addNotification({
        title: "Error!",
        message: "Friend Already Exist",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 1000,
          onScreen: true
        }
      });
    }
    else{
    store.addNotification({
      title: "Wonderful!",
      message: "Friend Added",
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 1000,
        onScreen: true
      }
    });
  }
}

  render() {
    if (this.props.token) {
      return (
        <div>
          <h1 className="profileName">{this.props.match.params.id}'s Stats</h1>
          <div className="container">
            <div className="row">
              <div className="col">
                <h3>Wins</h3>
                <p>1st Place Wins (Squads):{this.state.firstPlaceSquads}</p>
                <p>1st Place Wins (Duos):{this.state.firstPlaceDuos}</p>
                <p>1st Place Wins (Solo):{this.state.firstPlaceSolo}</p>
              </div>

              <div>
                <h3>Kills</h3>
                <p>Total Kills (Squads):{this.state.killSquad}</p>
                <p>Total Kills (Duos):{this.state.killDuo}</p>
                <p>Total Kills (Solo):{this.state.killSolo}</p>
              </div>
            </div>
            <div>
              <button className="btn btn-primary saveStatsBtn" onClick = {this.saveFriend}>Save!</button>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <h1 className="profileName">{this.props.match.params.id}'s Stats</h1>
        <div className="container">
          <div className="row">
            <div className="col">
              <h3>Wins</h3>
              <p>1st Place Wins (Squads):{this.state.firstPlaceSquads}</p>
              <p>1st Place Wins (Duos):{this.state.firstPlaceDuos}</p>
              <p>1st Place Wins (Solo):{this.state.firstPlaceSolo}</p>
            </div>

            <div>
              <h3>Kills</h3>
              <p>Total Kills (Squads):{this.state.killSquad}</p>
              <p>Total Kills (Duos):{this.state.killDuo}</p>
              <p>Total Kills (Solo):{this.state.killSolo}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
