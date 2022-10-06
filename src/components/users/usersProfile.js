import { useEffect } from "react";
import { Col, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { notificationActions } from "../store/notificationSlice";
const UsersProfile = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(notificationActions.needLoggedIn());
      navigate("/users/login");
    } //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Col md="4" className="users-profile">
      <Form>
        <div className="form-group">
          <h2>Profile</h2>
          <div className="form-attribute">
            <Link to="/users/change-password">Change Password</Link>
          </div>
          <div className="form-attribute">
            <Link to="/users/change-email">Change Email</Link>
          </div>
          <div className="form-attribute">
            <Link to="/users/change-username">Change Username</Link>
          </div>
          <div className="form-attribute">
            <Link to="/users/logout">Logout</Link>
          </div>
        </div>
      </Form>
    </Col>
  );
};
export default UsersProfile;
