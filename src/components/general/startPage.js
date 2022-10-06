import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import mainImage from "../../media/logo-background.jpg";
const StartPage = () => {
  return (
    <Row className="startPage">
      <Col>
        <img src={mainImage} alt="Main Image" />
        <div className="startPage-content">
          <h1>Welcome to Ohros!</h1>
          <h6>A story-writing platform.</h6>
          <Link to="/users/register">New here?</Link>
        </div>
      </Col>
    </Row>
  );
};
export default StartPage;
