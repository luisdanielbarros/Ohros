import { useEffect } from "react";
import { Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const UsersPostRegister = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) navigate("/users/profile"); //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Col md="4" className="users-postregister">
      <form>
        <h2>Post-Register</h2>
        <p>Thank you for registering with us!</p>
        <p>
          Please check your email for to confirm your account before logging in.
        </p>
        {/*Go to Login Button*/}
        <p>
          <Link to="/users/login">Go to the Login page</Link>
        </p>
      </form>
    </Col>
  );
};
export default UsersPostRegister;
