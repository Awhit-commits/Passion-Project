import React, { Component } from "react";

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
    };
  }
  async componentDidMount() {
    let response = await fetch(
      `https://fortnite-api.p.rapidapi.com/stats-alternative/${this.props.match.params.id}`,
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
    this.setState({
      name: json.name,
      firstPlaceDuos: json.global_stats.duo.placetop1,
      firstPlaceSquads: json.global_stats.squad.placetop1,
      firstPlaceSolo: json.global_stats.solo.placetop1,
      killDuo:json.global_stats.duo.kills,
      killSquad:json.global_stats.squad.kills,
      killSolo:json.global_stats.solo.kills
    });

  }

  render() {
    return (
      <div>
        <h1>{this.props.match.params.id}'s Stats</h1>
        <div>
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
    );
  }
}
