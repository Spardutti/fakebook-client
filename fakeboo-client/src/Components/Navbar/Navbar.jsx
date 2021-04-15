import { useState } from "react";
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

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(true);
  return (
    <div>
      <Navbar expand="md" className="bg-dark  justify-content-around" light>
        <NavbarBrand className="col-sm-4 mr-auto text-primary ">
          Dutti Profile
        </NavbarBrand>
        <NavbarToggler onClick={toggle} className="bg-light" />
        <Collapse isOpen={isOpen} navbar>
          <Nav navbar className="">
            <NavItem className="pr-5">
              <NavLink className="text-primary ml-5">Friends</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="text-primary ml-5">Request</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
