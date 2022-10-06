import { Nav, Navbar } from "react-bootstrap";
const Footer = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="footer">
      <Nav justify className="footer-links">
        <Nav.Item>
          <p>© Ohros 2022</p>
        </Nav.Item>
        <Nav.Item>
          <p>
            Support available at{" "}
            <a href="mailto:OhrosTeam@gmail.com">OhrosTeam@gmail.com</a>
          </p>
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};
export default Footer;
