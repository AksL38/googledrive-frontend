import "./App.css";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Navbar from "./Navbar";

function App() {
  return (
    <Router>
      <Container>
        <Navbar></Navbar>
      </Container>
    </Router>
  );
}

export default App;
