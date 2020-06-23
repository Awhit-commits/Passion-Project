import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export default class fortniteFriends extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            friends:[],
            stats:{},
            firstSolo:"",
            firstDuo:"",
            firstSquad:""
             
        }
    }
    async componentDidMount(){
        let response = await fetch(`/profile/${this.props.id}`);
        let json = await response.json();
        console.log(json);
        this.setState({friends:json.fortniteFriends})

        //function for dynamically sorting through array of objects 
        function compareValues(key, order = 'asc') {
            return function innerSort(a, b) {
              if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                // property doesn't exist on either object
                return 0;
              }
          //ignoring casing and setting value of key parameter to a string
              const varA = (typeof a[key] === 'string')
                ? a[key].toUpperCase() : a[key];
              const varB = (typeof b[key] === 'string')
                ? b[key].toUpperCase() : b[key];
          
              //if a > b, it will descend
                let comparison = 0;
              if (varA > varB) {
                comparison = 1;
              } else if (varA < varB) {
                comparison = -1;
              }
              return (
                (order === 'desc') ? (comparison * -1) : comparison
              );
            };
          }
          
        console.log(this.state.friends.sort(compareValues('wins','desc')));
        
    }
    getFriendsStats = async()=>{
        let response = await fetch(
            `https://fortnite-api.p.rapidapi.com/stats-alternative/${this.props.id}`,
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
    }
    
    render() {
        return (
            <div>
                <div>
                    <h4>Friend's List</h4>
                {this.state.friends.map(friends =>{
                    return<div> <Link to = {`/fortnite/stats/${friends.gamerTag}`}><p>{friends.gamerTag}</p></Link>
                    <p>{friends.wins} Solo Wins</p></div>
                    

                })}
                </div>
            </div>
        )
    }
}
