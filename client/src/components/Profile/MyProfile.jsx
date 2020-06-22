import React, { Component } from 'react'
import FortnitePage from '../fortnite/FortnitePage'
import FortniteFriends from '../fortnite/FortniteFriends'

export default class myProfile extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            user:{}

             
        }
    }
    async componentDidMount(){
        let response =await  fetch (`/profile/${this.props.id}`)
        let json = await response.json();
        console.log(json)
        this.setState({user:json})
    }
    
    render() {
        return (
            <div>
                <div>
                
                </div>
                <div>
                <FortnitePage id  = {this.props.id}/>
                </div>
                <FortniteFriends id = {this.props.id}/>
            </div>
        )
    }
}
