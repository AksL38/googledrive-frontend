import "./App.css";
import {
  HashRouter as Router,
  NavLink,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import Dashboard from "./Dashboard";
import Signin from "./Signin";
import Signup from "./Signup";
import Activation from "./Activation";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import { UserContext } from "./context";
import Signout from "./Signout";
import LoggedStatusNavbar from "./LoggedStatusNavbar";
import { useState } from "react";

function App() {
  const [isLogged, setLogged] = useState(false);
  const [authorization, setAuthorization] = useState("");
  return (
    <Container>
      <UserContext.Provider
        value={{
          authorization,
          isLogged,
          setAuthorization,
          setLogged,
        }}
      >
        <Router>
          <Navbar bg="light" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={NavLink} exact to="/">
                  Dashboard
                </Nav.Link>
                <LoggedStatusNavbar />
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Switch>
            <Route exact path="/">
              <Dashboard />
            </Route>
            <Route path="/signin">
              <Signin />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/signout">
              <Signout />
            </Route>
            <Route path="/activation/:jwt">
              <Activation />
            </Route>
            <Route path="/forgotPassword">
              <ForgotPassword />
            </Route>
            <Route path="/resetPassword/:jwt">
              <ResetPassword />
            </Route>
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </Router>
      </UserContext.Provider>
    </Container>
  );
}

function NoMatch() {
  let location = useLocation();

  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

export default App;
