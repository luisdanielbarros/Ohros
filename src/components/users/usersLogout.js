import { useEffect } from "react";
import { Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { submitButton } from "../general/Util";
import Axios from "../axios/index";
import { useDispatch, useSelector } from "react-redux";
import { notificationActions } from "../store/notificationSlice";
import { userAuthActions } from "../store/userAuthSlice";
import { projAuthActions } from "../store/projAuthSlice";
import { worldBuildingActions } from "../store/worldBuildingSlice";
import { timelineActions } from "../store/timelineSlice";
import { arcActions } from "../store/arcSlice";
import { actActions } from "../store/actSlice";
import { actionActions } from "../store/actionSlice";
import { bookmarkActions } from "../store/bookmarkSlice";
const UsersLogout = () => {
  const accessToken = useSelector((state) => state.user.accessToken);
  const formData = {};
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) navigate("/users/login"); //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Col md="4" className="users-logout">
      <Formik
        initialValues={formData}
        enableReinitialize
        validationSchema={Yup.object({})}
        onSubmit={(values, { setSubmitting }) => {
          var formData = new FormData();
          formData.append("action", "logout");
          formData.append("access_token", accessToken);
          Axios.post("/", formData)
            .then(function (response) {
              if (response.status === 200) {
                dispatch(timelineActions.close({}));
                dispatch(worldBuildingActions.close({}));
                dispatch(projAuthActions.close());
                dispatch(userAuthActions.logout());
                navigate("/users/login");
              }
            })
            .catch(function (error) {
              switch (error.response.data.messageTitle) {
                case "User Token Check Failure.":
                  dispatch(bookmarkActions.close({}));
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
          <h2>Logout</h2>
          {/*Submit Button*/}
          {submitButton("Logout")}
        </Form>
      </Formik>
    </Col>
  );
};
export default UsersLogout;
