import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class NavBar extends Component {
    render() {
        return (
            <div>
                <nav className ="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className=" navbar-brand">ExercTracker</Link>
                <div className ="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/" className ="nav-link">Get An Edge</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/fortnite" className="nav-link">Fortnite</Link>
                        </li>

                        <li className ="navbar-item">
                            <Link to={`/profile/${this.state.id}`}className="nav-link">My Profile</Link>

                        </li>
                    </ul>
                </div>

            </nav>
            </div>
        )
    }
}
