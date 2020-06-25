import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class NavBar extends Component {
    render() {
        if(this.props.token){
            return(<div>
                <nav className ="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className=" navbar-brand">Get An Edge</Link>
                <div className ="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                       
                        <li className="navbar-item">
                            <Link to="/fortnite" className="nav-link">Fortnite</Link>
                        </li>

                        <li className ="navbar-item">
                            <Link to={`/profile/${this.props.id}`}className="nav-link">My Profile</Link>

                        </li>
                        <li hidden className ="navbar-item">
                            <Link to='/login' className="nav-link">Login</Link>

                        </li>

                        <li hidden className ="navbar-item">
                            <Link to='/Register' className="nav-link">Register</Link>

                        </li>

                    </ul>
                </div>

            </nav>

            </div>)
        }
        else{
        return (
            <div>
                <nav className ="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className=" navbar-brand">Get An Edge</Link>
                <div className ="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                       
                        <li className="navbar-item">
                            <Link to="/fortnite" className="nav-link">Fortnite</Link>
                        </li>

                        <li className ="navbar-item">
                            <Link to={`/profile/${this.props.id}`}className="nav-link">My Profile</Link>

                        </li>
                        <li className ="navbar-item">
                            <Link to='/login' className="nav-link">Login</Link>

                        </li>

                        <li className ="navbar-item">
                            <Link to='/Register' className="nav-link">Register</Link>

                        </li>

                    </ul>
                </div>

            </nav>
            </div>
        )
    }
}
}
