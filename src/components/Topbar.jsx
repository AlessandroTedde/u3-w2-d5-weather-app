import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const Topbar = ({ brand, claim }) => (
  <Navbar expand="lg" className="navbar">
    <Container fluid="xl justify-content-center">
      <Link to={"/"}>
        <Navbar.Brand className="lead fs-2 fw-semibold">
          {brand} — {claim}
        </Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
    </Container>
  </Navbar>
);

export default Topbar;
