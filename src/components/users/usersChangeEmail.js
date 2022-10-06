import { useEffect } from "react";
import { Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { loadFormAttribute, submitButton } from "../general/Util";
import Axios from "../axios/index";
import { notificationActions } from "../store/notificationSlice";
import { userAuthActions } from "../store/userAuthSlice";
import { projAuthActions } from "../store/projAuthSlice";
import { worldBuildingActions } from "../store/worldBuildingSlice";
import { timelineActions } from "../store/timelineSlice";
import { arcActions } from "../store/arcSlice";
import { actActions } from "../store/actSlice";
import { actionActions } from "../store/actionSlice";
const UsersChangeEmail = () => {
  const accessToken = useSelector((state) => state.user.accessToken);
  const User = useSelector((state) => state.user);
  const formData = {
    password: "",
    new_email: "",
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!User.isLoggedIn) {
      dispatch(notificationActions.needLoggedIn());
      navigate("/users/login");
    } //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Col md="4" className="users-changeemail">
      <Formik
        initialValues={formData}
        enableReinitialize
        validationSchema={Yup.object({
          password: Yup.string()
            .required("Required")
            .max(24, "Exceeded maximum of 24 digits"),
          new_email: Yup.string()
            .required("Required")
            .max(128, "Exceeded maximum of 128 digits"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          var formData = new FormData();
          formData.append("action", "change_email");
          formData.append("access_token", accessToken);
          formData.append("user_id", User.userId);
          for (var key in values) {
            formData.append(key, values[key]);
          }
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
                navigate("/users/profile");
              }
            })
            .catch((error) => {
              switch (error.response.data.messageTitle) {
                case "Project Token Check Failure.":
                  dispatch(actionActions.close({}));
                  dispatch(actActions.close({}));
                  dispatch(arcActions.close({}));
                  dispatch(timelineActions.close({}));
                  dispatch(worldBuildingActions.close({}));
                  dispatch(projAuthActions.close());
                  navigate("/projects/list");
                  break;
                case "User Token Check Failure.":
                  dispatch(actionActions.close({}));
                  dispatch(actActions.close({}));
                  dispatch(arcActions.close({}));
                  dispatch(timelineActions.close({}));
                  dispatch(worldBuildingActions.close({}));
                  dispatch(projAuthActions.close());
                  dispatch(userAuthActions.logout());
                  navigate("/users/login");
                  break;
                default:
                  dispatch(
                    notificationActions.add({
                      Title: error.response.data.messageTitle,
                      Message: error.response.data.message,
                      closeButton: "Close",
                    })
                  );
                  break;
              }
              console.log(error);
            });
          setSubmitting(false);
        }}
      >
        <Form>
          {/*New Email Information*/}
          <div className="form-group">
            <h2>Change Email</h2>
            <h3>New Email Information</h3>
            {/*Password*/}
            {loadFormAttribute("password", "Password", "********", "password")}
            {/*New Email*/}
            {loadFormAttribute("new_email", "New Email")}
          </div>
          {/*Submit Button*/}
          {submitButton("Change Email")}
        </Form>
      </Formik>
      {/*Back to Profile Button*/}
      <div className="form-group">
        <Link to="/users/profile">Back to Profile</Link>
      </div>
    </Col>
  );
};
export default UsersChangeEmail;
