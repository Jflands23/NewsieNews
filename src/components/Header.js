import '@aws-amplify/ui-react/styles.css';
import {  Authenticator} from '@aws-amplify/ui-react';

const Header = () => {
    return (
        <header class="foot">
			<img class="logo" src="https://www.streamscheme.com/wp-content/uploads/2020/04/pepega.png" width="70" height="75"/>
            <nav>
                <ul>
                    <li>Facebook</li>
                    <li>Instagram</li>
                    <li>Twitter</li>
                    <li>Pintrest</li>
                </ul>
			</nav>
            <Authenticator>
      {({ signOut, user }) => (  
          <button onClick={signOut}>Sign out</button>
      )}
    </Authenticator>
            <a href="#"><button>Contact</button></a>
		</header>
    )
}

export default Header