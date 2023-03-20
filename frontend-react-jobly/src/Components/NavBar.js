import React from 'react';
import './NavBar.css';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

/** Displays dynamic navbar components.
 * 
 * -props: user and logout, passed down from the App component.
 * -user represents current user.
 * -logout is a function that logs out the user when called.
 * 
*/

function NavBar({ user, logout }) {
  return (
    <div>
      <Navbar bg="dark" expand="md" className="navbar-dark">
        <Navbar.Brand as={NavLink} to="/">
          Jobly
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
          <Nav className="ml-auto" navbar>
            {/* if user is not logged in, render /login, /signup */}
            {!user ? (
              <>
                <Nav.Item>
                  <Nav.Link as={NavLink} to="/login">
                    Log in
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link as={NavLink} to="/signup">
                    Sign Up
                  </Nav.Link>
                </Nav.Item>
              </>
            ) : (
              // user is logged in, show all links in navbar.
              <>
                <Nav.Item>
                  <Nav.Link as={NavLink} activeclassname="active" to="/companies">
                    Companies
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link as={NavLink} activeclassname="active" to="/jobs">
                    Jobs
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link as={NavLink} activeclassname="active" to="/profile">
                    Profile
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link as={NavLink} activeclassname="active" to="/" onClick={logout}>
                    Log out
                  </Nav.Link>
                </Nav.Item>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;
