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

import "./styles.css";

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState();
  const [friendRequest, setFriendRequest] = useState();

  //TODO FIGURE HOW TO UDPATE PROFILE PIC

  const toggle = () => setIsOpen(!isOpen);

  let history = useHistory();

  useEffect(() => {
    let userData = localStorage.getItem("user");

    const getRequestUsers = async () => {
      const response = await fetch("/users/" + userData._id + "/requesting");
      const data = await response.json();
      setFriendRequest(data);
    };

    if (userData) {
      userData = JSON.parse(userData);
      setUser(userData);
      if (userData.request.length > 0) {
        getRequestUsers();
      }
    }
  }, []);

  const logout = async () => {
    await fetch("/users/logout", {
      method: "POST",
    });
    history.push("/");
    localStorage.clear();
    props.setToken();
  };

  return user ? (
    <div>
      <Navbar expand="md" className="navbar-dark bg-dark">
        <NavbarBrand className="">
          <img
            className="profile-pic rounded-circle"
            src={user.profilePic}
            alt="user profile pic"
          />
          <NavbarText className="mb-0">{user.username}</NavbarText>
        </NavbarBrand>

        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav navbar className="ml-auto">
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Friends
              </DropdownToggle>
            </UncontrolledDropdown>
            {friendRequest ? (
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Request
                </DropdownToggle>
                <DropdownMenu>
                  {friendRequest.map((request) => {
                    return (
                      <DropdownItem>
                        <p>{request.username}</p>
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </UncontrolledDropdown>
            ) : (
              <NavItem>
                <NavLink className="">Request</NavLink>
              </NavItem>
            )}

            <NavItem>
              <NavLink onClick={logout}>Log out</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  ) : null;
};

export default NavBar;
