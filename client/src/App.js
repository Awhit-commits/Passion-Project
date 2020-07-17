import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppContainer from './components/AppContainer';
import NavBar from './components/NavBar/NavBar';
import SplashPage from './components/SplashPage';
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import FortnitePage from './components/fortnite/FortnitePage';
import BackgroundImagePage from './components/BackGroundImagePage';


function App() {
  return (
    <div className= "appContainer">
      {/* <NavBar/> */}
      <ReactNotification />
      
      
      <AppContainer/>
      
      {/* <SplashPage/> */}
     
    </div>
  );
}

export default App;
