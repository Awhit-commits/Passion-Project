import React, { Component } from 'react'
import { Link } from 'react-router-dom'




export default class NavBar extends Component {
    logOut = (event)=>{
        window.location='/'
    }
    render() {
        if(this.props.token){
            return(<div>
                <nav className ="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className=" navbar-brand">Get An Edge</Link>
                <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
                <div className ="collapse navbar-collapse" id="navbarNavAltMarkup">
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
                        <li className = "navbar-item"><Link onClick={this.logOut} className = "nav-link">Logout</Link></li>

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
                <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
                <div className ="collapse navbar-collapse" id="navbarNavAltMarkup">
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
