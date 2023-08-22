import { useEffect } from "react";
import { Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { loadFormAttribute, submitButton } from "../general/Util";
import Axios from "../axios/index";
import { userAuthActions } from "../store/userAuthSlice";
import { notificationActions } from "../store/notificationSlice";
const UsersLogin = () => {
  const formData = { username: "", password: "" };
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) navigate("/users/logout"); //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Col md="4" className="users-login">
      <Formik
        initialValues={formData}
        enableReinitialize
        validationSchema={Yup.object({
          username: Yup.string()
            .required("Required")
            .max(24, "Exceeded maximum of 24 digits"),
          password: Yup.string()
            .required("Required")
            .max(24, "Exceeded maximum of 24 digits"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          let formData = new FormData();
          formData.append("action", "login");
          for (let key in values) {
            formData.append(key, values[key]);
          }
          Axios.post("/", formData)
            .then((response) => {
              if (response.status === 202) {
                dispatch(userAuthActions.login(response.data.content));
                navigate("/projects");
              } else if (response.status === 200)
                dispatch(
                  notificationActions.add({
                    Title: response.data.messageTitle,
                    Message: response.data.message,
                    closeButton: "Close",
                  })
                );
            })
            .catch((error) => {
              dispatch(
                notificationActions.add({
                  Title: error.response.data.messageTitle,
                  Message: error.response.data.message,
                  closeButton: "Close",
                })
              );
              console.log(error);
            });
          setSubmitting(false);
        }}
      >
        <Form>
          {/*Login Information*/}
          <div className="form-group">
            <h2>Login</h2>
            <h3>Login Information</h3>
            {/*Username*/}
            {loadFormAttribute("username", "Username", "Username")}
            {/*Password*/}
            {loadFormAttribute("password", "Password", "********", "password")}
          </div>
          {/*Submit Button*/}
          {submitButton("Login")}
          {/*Go to Register Button*/}
          <div className="form-group pb-4">
            <Link to="/users/register">Don't have an account yet?</Link>
          </div>
        </Form>
      </Formik>
    </Col>
  );
};
export default UsersLogin;
