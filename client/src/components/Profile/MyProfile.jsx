import React, { Component } from 'react'
import FortnitePage from '../fortnite/FortnitePage'
import FortniteFriends from '../fortnite/FortniteFriends'
import { Link } from 'react-router-dom'


export default class myProfile extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            user:{}

             
        }
    }
    async componentDidMount(){
        let response =await  fetch (`/users/profile/${this.props.id}`)
        let json = await response.json();
        console.log(json)
        this.setState({user:json})
    }
    
    render() {
        return (
            <div className = "profileContainer">
                <div className = "profileInformation">
                 <h4>My Information</h4>   
                <p>Name:{this.state.user.name}</p>
                <p>Email:{this.state.user.email}</p>
                <p>PSN Name:{this.state.user.psnName}
                </p>
                <p>Steam Name:{this.state.user.steamName}</p>
                <p>Xbox Live Name:{this.state.user.xLiveName}</p>
                </div>
                <div>
                    <Link to ={`/profile/edit/${this.props.id}`}>Edit Profile</Link>
                </div>
                <div className = "fortniteFriends">
                <FortniteFriends xLiveName = {this.state.user.xLiveName} steamName = {this.state.user.steamName} psnName = {this.state.user.psnName} id = {this.props.id}/>
                </div>
                {/* <FortniteFriends xLiveName = {this.state.user.xLiveName} steamName = {this.state.user.steamName} psnName = {this.state.user.psnName} id = {this.props.id}/> */}
            </div>
        )
    }
}
