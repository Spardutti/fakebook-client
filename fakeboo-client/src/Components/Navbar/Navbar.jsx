import { useState, useEffect } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";
import { useHistory } from "react-router-dom";

import "./navbar.css";

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  //TODO FIGURE HOW TO UDPATE PROFILE PIC

  const toggle = () => setIsOpen(!isOpen);

  let history = useHistory();

  const logout = async () => {
    const response = await fetch("/users/logout", {
      method: "POST",
    });
    history.push("/");
    localStorage.clear();
    props.setToken();
  };

  return (
    <div>
      <Navbar expand="md" className="navbar-dark bg-dark">
        <NavbarBrand className="">
          <img
            className="profile-pic rounded-circle"
            src={props.token.profilePic}
            alt="user profile pic"
          />
          <p className="mb-0">{props.token.username}</p>
        </NavbarBrand>

        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav navbar className="ml-auto">
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Friends
              </DropdownToggle>
            </UncontrolledDropdown>
            <NavItem>
              <NavLink className="">Request</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={logout}>Log out</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
