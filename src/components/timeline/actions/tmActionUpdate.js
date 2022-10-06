import { Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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
const TMActionUpdate = () => {
  const accessToken = useSelector((state) => state.user.accessToken);
  const Action = useSelector((state) => state.action);
  const formData = {
    actionname: Action.Actionname,
    summary: Action.Summary,
    description: Action.Description,
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (Action.actionId === 0 || Action.actionId === undefined)
    return (
      <Col md="12">
        <h2>You must select an action first.</h2>
      </Col>
    );
  return (
    <Col md="12" className="tm-actions-update">
      <Formik
        initialValues={formData}
        enableReinitialize
        validationSchema={Yup.object({
          actionname: Yup.string()
            .required("Required")
            .max(64, "Exceeded maximum of 64 digits"),
          summary: Yup.string().max(128, "Exceeded maximum of 128 digits"),
          description: Yup.string(),
        })}
        onSubmit={(values, { setSubmitting }) => {
          var formData = new FormData();
          formData.append("action", "updateaction");
          formData.append("access_token", accessToken);
          formData.append("action_id", Action.actionId);
          formData.append("realtime", Action.Time);
          formData.append("screentime", Action.Time);
          for (var key in values) {
            formData.append(key, values[key]);
          }
          var reduxDispatchObject = {};
          formData.forEach((value, key) =>
            value === undefined
              ? (reduxDispatchObject[key] = "")
              : (reduxDispatchObject[key] = value)
          );
          Axios.post("/", formData)
            .then((response) => {
              if (response.status === 200) {
                dispatch(actionActions.update(reduxDispatchObject));
                navigate("/time/actions/list");
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
        {/*Action Form*/}
        <Form>
          <div className="form-group">
            <h2>Update Action</h2>
            {/*Action Name*/}
            {loadFormAttribute("actionname", "Action Name", "My Action")}{" "}
            {/*Summary*/}
            {loadFormAttribute("summary", "Summary", "My Summary")}
            {/*Description*/}
            {loadFormAttribute(
              "description",
              "Description",
              "My Description",
              "textarea"
            )}
          </div>
          <div className="form-group">
            {/*Submit Button*/}
            {submitButton("Update Action")}
          </div>
        </Form>
      </Formik>
    </Col>
  );
};
export default TMActionUpdate;
