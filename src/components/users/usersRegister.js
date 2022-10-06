import { useEffect } from "react";
import { Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { loadFormAttribute, submitButton } from "../general/Util";
import Axios from "../axios/index";
import { useDispatch } from "react-redux";
import { userAuthActions } from "../store/userAuthSlice";
import { notificationActions } from "../store/notificationSlice";
const UsersRegister = () => {
  const formData = { email: "", username: "", password: "" };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  useEffect(() => {
    if (isLoggedIn) navigate("/users/profile"); //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Col md="4" className="users-register">
      <Formik
        initialValues={formData}
        enableReinitialize
        validationSchema={Yup.object({
          email: Yup.string()
            .required("Required")
            .max(128, "Exceeded maximum of 128 digits"),
          username: Yup.string()
            .required("Required")
            .max(24, "Exceeded maximum of 24 digits"),
          password: Yup.string()
            .required("Required")
            .max(24, "Exceeded maximum of 24 digits"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          var formData = new FormData();
          formData.append("action", "register");
          for (var key in values) {
            formData.append(key, values[key]);
          }
          Axios.post("/", formData)
            .then(function (response) {
              if (response.status === 201) {
                console.log(response.data.message);
                dispatch(userAuthActions.register());
                navigate("/users/post-register");
              }
            })
            .catch(function (error) {
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
          {/*Register Information*/}
          <div className="form-group">
            <h2>Register</h2>
            <h3>Register Information</h3>
            {/*Email*/}
            {loadFormAttribute("email", "Email", "Your Email")}
            {/*Username*/}
            {loadFormAttribute("username", "Username", "Your Username")}
            {/*Password*/}
            {loadFormAttribute("password", "Password", "********", "password")}
          </div>
          {/*Submit Button*/}
          {submitButton("Register")}
          {/*Go to Login Button*/}
          <div className="form-group pb-4">
            <Link to="/users/login">Already have an account?</Link>
          </div>
        </Form>
      </Formik>
    </Col>
  );
};
export default UsersRegister;
