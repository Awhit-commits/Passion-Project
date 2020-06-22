import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export default class fortniteFriends extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            friends:[]
             
        }
    }
    async componentDidMount(){
        let response = await fetch(`/profile/${this.props.id}`);
        let json = await response.json();
        console.log(json);
        this.setState({friends:json.fortniteFriends})
        
    }
    
    render() {
        return (
            <div>
                <div>
                    <h4>Friend's List</h4>
                {this.state.friends.map(friends =>{
                    return <Link to = {`/fortnite/stats/${friends.gamerTag}`}><p>{friends.gamerTag}</p></Link>

                })}
                </div>
            </div>
        )
    }
}
