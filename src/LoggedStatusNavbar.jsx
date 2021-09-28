import { useContext } from "react";
import { UserContext } from "./context";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function LoggedStatusNavbar() {
  const { isLogged } = useContext(UserContext);
  if (isLogged) {
    return (
      <Nav.Link as={NavLink} to="/signout">
        Sign out
      </Nav.Link>
    );
  } else {
    return (
      <>
        <Nav.Link as={NavLink} to="/signin">
          Sign in
        </Nav.Link>
        <Nav.Link as={NavLink} to="/signup">
          Sign up
        </Nav.Link>
      </>
    );
  }
}
