import { Col } from "react-bootstrap";
const UsersUnauthorized = () => {
  return (
    <Col md="6" className="users-unauthorized">
      <h2>User Unauthorized</h2>
      <p>You need to be logged in to access this page.</p>
    </Col>
  );
};
export default UsersUnauthorized;
