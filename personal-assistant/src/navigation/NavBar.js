import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar, DropdownButton, Nav, Row, Col, Container, Dropdown, NavbarCollapse } from 'react-bootstrap';
import UserContext from "../authentication/UserContext";
import "./Navbar.css";


function NavBar({ logout }) {
  const { currentUser } = useContext(UserContext);

  function loggedInNav() {
    return (
      <DropdownButton title="PAM" id="responsive-navbar-nav">
        <Dropdown.Item >
          <NavLink className="nav-link" to="/profile">
            {currentUser.username}'s Schedule
          </NavLink>
        </Dropdown.Item >
        <Dropdown.Item >
          <NavLink className="nav-link" to="/profile/edit">
            Edit Profile
          </NavLink>
        </Dropdown.Item>

        <Dropdown.Item>
          <NavLink className="nav-link" to="/" onClick={logout}>
            Log out {currentUser.username}
          </NavLink>
        </Dropdown.Item>
      </DropdownButton>
    );
  }

  function loggedOutNav() {
    return (
      <DropdownButton title="PAM" id="responsive-navbar-nav">
        <Dropdown.Item >
          <NavLink className="nav-link" to="/login">
            LogIn
          </NavLink>
        </Dropdown.Item>
        <Dropdown.Item>
          <NavLink className="nav-link" to="/signup">
            SignUp
          </NavLink>
        </Dropdown.Item>
      </DropdownButton>
    );
  }


  return (
    <Container>
      <Row className="navbar-section">

        <Col md={3}>
        </Col >

        <Col md={6}>
          <center>
            <Link className="navbar-brand" to={currentUser ? `/${currentUser.username}` : "/"}>
              <img className="navbar-icon" src="https://www.kindpng.com/picc/m/66-663423_virtual-assistant-png-transparent-png.png" alt="personal assistants drawing" />
            </Link>
          </center>
        </Col>




        <Col md={3}>
          <Container>
            <Navbar className="Navigation navbar" sticky="top" >
              <NavbarCollapse>
                <Nav>

                  {currentUser ? loggedInNav() : loggedOutNav()}

                </Nav>
              </NavbarCollapse>
            </Navbar>

          </Container>
        </Col>


      </Row>
    </Container>
  );
}

export default NavBar;