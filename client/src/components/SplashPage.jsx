import React, { Component } from 'react'

export default class SplashPage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        return (
            <div>
                <img src="./CompetitiveGaming.jpg" class="img-fluid" alt="Responsive image"></img>
                    <div className= "welcomeText"><h1>Welcome to Get an Edge</h1></div>
                    <button className = "welcomeButton">Enter</button>
                
                
            </div>
        )
    }
}
