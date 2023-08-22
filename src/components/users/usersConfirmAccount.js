import { useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../axios/index";
import { notificationActions } from "../store/notificationSlice";
const UsersConfirmAccount = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const navigate = useNavigate();
  const { id, code } = useParams();
  const [hasRequested, setHasRequested] = useState(false);
  useEffect(() => {
    if (isLoggedIn) navigate("/users/logout");
    if (id === undefined || code === undefined || hasRequested) return;
    console.log("ran");
    let formData = new FormData();
    formData.append("action", "confirm_account");
    formData.append("user_id", id);
    formData.append("code", code);
    Axios.post("/", formData)
      .then((response) => {
        if (response.status === 200) {
          dispatch(
            notificationActions.add({
              Title: response.data.messageTitle,
              Message: response.data.message,
              closeButton: "Close",
            })
          );
          setHasRequested(true);
          navigate("/users/login");
        }
      })
      .catch((error) => {
        dispatch(
          notificationActions.add({
            Title: error.response.data.messageTitle,
            Message: error.response.data.message,
            closeButton: "Close",
          })
        );
        setHasRequested(true);
        navigate("/users/login");
        console.log(error);
      }); //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Col md="4" className="users-confirmaccount">
      <h2>Confirm Account</h2>
      <p>Processing your request...</p>
    </Col>
  );
};
export default UsersConfirmAccount;
