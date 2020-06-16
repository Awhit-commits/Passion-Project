import React, { Component } from 'react'

export default class Leaderboard extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            players:{}
             
        }
    }
   async componentDidMount(){
      let response = await fetch('https://r6.apitab.com/leaderboards/playstation/america');
      let json = await response.json();
      console.table(json);
      this.setState({players:json})

    }
    render() {
        {Object.values(this.state.players).forEach((value)=>
            console.log(value))}
        return (
            <div>
                {/* <p>{Object.values(this.state.players).forEach((value)=>
                console.log(value))}</p> */}
            </div>
        )
    }
}
