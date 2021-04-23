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
  NavbarText,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import DropdownRequests from "./DropdownRequest";
import FriendsList from "./FriendsList";
import ChangeProPicModal from "./ChangeProPicModal";

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [friendRequest, setFriendRequest] = useState();
  const [friendList, setFriendList] = useState();
  const [modal, setModal] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const toggleModal = () => setModal(!modal);

  let history = useHistory();

  useEffect(() => {
    //GET FRIEND REQUEST
    const getRequestUsers = async () => {
      const response = await fetch(
        "/users/" + props.currentUser._id + "/requesting"
      );
      const data = await response.json();
      setFriendRequest(data);
    };

    //GETFRIEND LIST
    const getFriendList = async () => {
      const response = await fetch(
        "/users/" + props.currentUser._id + "/friends"
      );
      const data = await response.json();
      setFriendList(data);
    };

    if (props.currentUser) {
      if (props.currentUser.request.length > 0) {
        getRequestUsers();
      }
      if (props.currentUser.friends.length > 0) {
        getFriendList();
      }
    }
  }, [props.currentUser]);

  //LOGOUT
  const logout = async () => {
    await fetch("/users/logout", {
      method: "POST",
    });
    history.push("/");
    localStorage.clear();
    props.setToken();
  };

  return props.currentUser ? (
    <div>
      <Navbar expand="md" className="navbar-dark bg-dark">
        <NavbarBrand className="">
          <img
            className="profile-pic rounded-circle"
            src={props.currentUser.profilePic}
            alt="user profile pic"
            style={{ cursor: "pointer" }}
            onClick={toggleModal}
          />
          <NavbarText className="mb-0">{props.currentUser.username}</NavbarText>
        </NavbarBrand>

        <NavbarToggler onClick={toggleDropdown} />
        <Collapse isOpen={isOpen} navbar>
          <Nav navbar className="ml-auto">
            {friendList ? (
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret className="test">
                  Friends
                </DropdownToggle>
                <DropdownMenu className="bg-dark animate__animated animate__fadeIn ">
                  {friendList
                    ? friendList.map((friend, index) => {
                        return (
                          <FriendsList
                            friend={friend}
                            key={friend._id}
                            id={props.currentUser._id}
                            index={index}
                          />
                        );
                      })
                    : null}
                </DropdownMenu>
              </UncontrolledDropdown>
            ) : (
              <NavItem>No Friends</NavItem>
            )}

            {friendRequest ? (
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Requests
                </DropdownToggle>
                <DropdownMenu className="bg-dark">
                  {friendRequest.map((request, index) => {
                    return (
                      <DropdownRequests
                        index={index}
                        user={request}
                        id={props.currentUser._id}
                        key={request._id}
                      />
                    );
                  })}
                </DropdownMenu>
              </UncontrolledDropdown>
            ) : (
              <NavItem>
                <NavLink className="">No Requests</NavLink>
              </NavItem>
            )}

            <NavItem>
              <NavLink
                style={{ cursor: "pointer" }}
                className="text-danger font-weight-bold"
                onClick={logout}
              >
                Log out
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      {modal ? (
        <ChangeProPicModal
          modal={modal}
          toggleModal={toggleModal}
          id={props.currentUser._id}
          username={props.currentUser.username}
        />
      ) : null}
    </div>
  ) : null;
};

export default NavBar;
