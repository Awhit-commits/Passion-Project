import React, { Component } from 'react'

export default class StatsPageFortnite extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             firstPlaceDuos:"",
             firstPlaceSquads:"",
             firstPlaceSolo:"",
             killDuo:"",
             killSquad:"",
             killSolo:""

        }

    }
    async componentDidMount(){
        let response = fetch(`https://fortnite-api.p.rapidapi.com/stats-alternative/${this.props.match.params.id}`)
    }
    
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
