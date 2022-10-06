import { Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
const NavigationMenu = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="navigation-menu">
      <LinkContainer to="/">
        <Navbar.Brand> </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="navigation-menu" />
      <Navbar.Collapse id="navigation-menu">
        <Nav justify className="navigation-menu-links">
          <Nav.Item>
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
          </Nav.Item>

          <Nav.Item>
            <LinkContainer to="/users">
              <Nav.Link>Users</Nav.Link>
            </LinkContainer>
          </Nav.Item>

          <Nav.Item>
            <LinkContainer to="/projects">
              <Nav.Link>Projects</Nav.Link>
            </LinkContainer>
          </Nav.Item>

          <Nav.Item>
            <LinkContainer to="/world-building">
              <Nav.Link>World Building</Nav.Link>
            </LinkContainer>
          </Nav.Item>

          <Nav.Item>
            <LinkContainer to="/time">
              <Nav.Link>Timeline</Nav.Link>
            </LinkContainer>
          </Nav.Item>

          <Nav.Item>
            <LinkContainer to="/analyser">
              <Nav.Link>Analyser</Nav.Link>
            </LinkContainer>
          </Nav.Item>
          <Nav.Item>
            <LinkContainer to="/eximport">
              <Nav.Link>Ex/Import</Nav.Link>
            </LinkContainer>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default NavigationMenu;
