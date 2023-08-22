import { useEffect } from "react";
import { Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { loadFormAttribute, submitButton } from "../../general/Util";
import Axios from "../../axios/index";
import { notificationActions } from "../../store/notificationSlice";
import { userAuthActions } from "../../store/userAuthSlice";
import { projAuthActions } from "../../store/projAuthSlice";
import { worldBuildingActions } from "../../store/worldBuildingSlice";
import { timelineActions } from "../../store/timelineSlice";
import { arcActions } from "../../store/arcSlice";
import { actActions } from "../../store/actSlice";
import { actionActions } from "../../store/actionSlice";
import { bookmarkActions } from "../../store/bookmarkSlice";
const TMArcDelete = () => {
  const accessToken = useSelector((state) => state.user.accessToken);
  const Arc = useSelector((state) => state.arc);
  const formData = { projpass: "" };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!Arc.isInArc) navigate("/time/arcs/list"); //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Col md="12" className="tm-arcs-delete">
      <Formik
        initialValues={formData}
        enableReinitialize
        validationSchema={Yup.object({
          projpass: Yup.string().required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          let formData = new FormData();
          formData.append("action", "deletearc");
          formData.append("access_token", accessToken);
          formData.append("arc_id", Arc.arcId);
          for (let key in values) {
            formData.append(key, values[key]);
          }
          Axios.post("/", formData)
            .then((response) => {
              if (response.status === 200) {
                dispatch(arcActions.close());
                navigate("/time/arcs/list");
              }
            })
            .catch((error) => {
              switch (error.response.data.messageTitle) {
                case "Project Token Check Failure.":
                  dispatch(bookmarkActions.close({}));
                  dispatch(actionActions.close({}));
                  dispatch(actActions.close({}));
                  dispatch(arcActions.close({}));
                  dispatch(timelineActions.close({}));
                  dispatch(worldBuildingActions.close({}));
                  dispatch(projAuthActions.close());
                  navigate("/projects/list");
                  break;
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
        {/*Arc Form*/}
        <Form>
          <div className="form-group">
            <h2>Delete Arc</h2>
            {/*Project Password*/}
            {loadFormAttribute(
              "projpass",
              "Project Password (for confirmation)",
              "********",
              "password"
            )}
          </div>
          {/*Submit Button*/}
          {submitButton("Delete Arc")}
        </Form>
      </Formik>
    </Col>
  );
};
export default TMArcDelete;
