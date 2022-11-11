import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import Login from "./Login.jsx";
import LoggedIn from "./LoggedIn.jsx";
import "../styles/header.css";



function Header({setErrorMsg, loggedIn, setLoggedIn}) {


    return (
        <nav className="topnav">

            <div className="topnavLeft">
                <p id="welcomeUser">Welcome</p>
            </div>

            <div className="topnavMid">
                <NavLink className="" to="/"><i className="fa fa-fw fa-home"></i> Hjem</NavLink>
                <NavLink to="/search"><i className="fa fa-fw fa-search"></i> Søg</NavLink>
                <NavLink to="/contact"><i className="fa fa-fw fa-envelope"></i> Kontakt</NavLink>
                <NavLink to="/calendar"><i className="fa fa-fw fa-envelope"></i> Kalender</NavLink>
            </div>

            <div className="topnavRight">
                {!loggedIn ? (<Login setLoggedIn={setLoggedIn} setErrorMsg={setErrorMsg}  />) :
                    (<div>
                        <LoggedIn setLoggedIn={setLoggedIn}/>
                    </div>)}
                <NavLink to="/signup">
                    <button className='signUp'>Sign up</button>
                </NavLink>
             
            </div>

        </nav>
    );
}

export default Header;
