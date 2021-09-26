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

function App() {
  return (
    <Router>
      <Container>
        <Navbar bg="light" expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} exact to="/">
                Dashboard
              </Nav.Link>
              <Nav.Link as={NavLink} to="/signin">
                Sign in
              </Nav.Link>
              <Nav.Link as={NavLink} to="/signup">
                Sign up
              </Nav.Link>
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
          <Route path="/activation/:jwt">
            <Activation />
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Container>
    </Router>
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
