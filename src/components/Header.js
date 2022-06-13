import React from 'react'
import {  Authenticator} from '@aws-amplify/ui-react';
import './App.css';

const Header = () => {
    return (
        <div>
        <header className="head">
			<img class="logo" src="https://www.streamscheme.com/wp-content/uploads/2020/04/pepega.png" width="70" height="75"/>
            <nav>
                <ul className = "navlink">
                    <li><a href = "#">Settings</a></li>
                    <li><a href = "#">Bookmarks</a></li>
                </ul>
			</nav>
            <Authenticator>
                {({ signOut, user }) => (  
                <button className = "contact" onClick={signOut}>Sign out</button>
                )}
            </Authenticator>
        </header>
        <div className = "slantbg"></div>
        </div>
    )
}

export default Header