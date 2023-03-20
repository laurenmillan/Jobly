import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Home.css'

/** Displays homepage.
 * 
 * -If a user is logged out, the page displays a Login and Sign Up button.
 * -If a user is logged in, the page renders a message welcoming the user.
 * -props: user
 *
 */


const Home = ({user}) => {
  console.debug("Homepage", "currentUser=", user);
    
  const navigate = useNavigate();
    return (
      <div className="Home-container">
          {user && <>
            <h1 style={{ color: 'white', textShadow: '1px 1px black' }}>Jobly</h1>
            <p style={{ color: 'white', textShadow: '1px 1px black' }}>All the jobs in one, convenient place.</p>
            <p style={{ color: 'white', textShadow: '1px 1px black' }}>Welcome back, {user.firstName}!</p>
            </>}

          {!user && <>
            <h1 style={{ color: 'white', textShadow: '1px 1px black' }}>Jobly</h1>
            <p style={{ color: 'white', textShadow: '1px 1px black' }}>Your new job starts here.</p>
            <div className="Home-button-div">
              <Button variant="primary" type="submit" onClick={() => navigate("/login", {replace: true})}>Login</Button>
              <Button variant="primary" type="submit"onClick={() => navigate("/signup", {replace: true})}>Sign Up</Button>
            </div>
            </>}
      </div>
    )
}


export default Home;
