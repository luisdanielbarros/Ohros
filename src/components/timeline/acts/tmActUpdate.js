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
const TMActUpdate = () => {
  const accessToken = useSelector((state) => state.user.accessToken);
  const Act = useSelector((state) => state.act);
  const formData = {
    actname: Act.Actname,
    summary: Act.Summary,
    description: Act.Description,
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (Act.actId === 0 || Act.actId === undefined)
    return (
      <Col md="12">
        <h2>You must select an act first.</h2>
      </Col>
    );
  return (
    <Col md="12" className="tm-acts-update">
      <Formik
        initialValues={formData}
        enableReinitialize
        validationSchema={Yup.object({
          actname: Yup.string()
            .required("Required")
            .max(64, "Exceeded maximum of 64 digits"),
          summary: Yup.string().max(128, "Exceeded maximum of 128 digits"),
          description: Yup.string(),
        })}
        onSubmit={(values, { setSubmitting }) => {
          let formData = new FormData();
          formData.append("action", "updateact");
          formData.append("access_token", accessToken);
          formData.append("act_id", Act.actId);
          formData.append("realtime", Act.Time);
          formData.append("screentime", Act.Time);
          for (let key in values) {
            formData.append(key, values[key]);
          }
          let reduxDispatchObject = {};
          formData.forEach((value, key) =>
            value === undefined
              ? (reduxDispatchObject[key] = "")
              : (reduxDispatchObject[key] = value)
          );
          Axios.post("/", formData)
            .then((response) => {
              if (response.status === 200) {
                dispatch(actActions.update(reduxDispatchObject));
                navigate("/time/acts/list");
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
        {/*Act Form*/}
        <Form>
          <div className="form-group">
            <h2>Update Act</h2>
            {/*Act Name*/}
            {loadFormAttribute("actname", "Act Name", "My Act")}
            {/*Summary*/}
            {loadFormAttribute("summary", "Summary", "My Summary")}
            {/*Description*/}
            {loadFormAttribute("description", "Description", "My Description")}
          </div>
          <div className="form-group">
            {/*Submit Button*/}
            {submitButton("Update Act")}
          </div>
        </Form>
      </Formik>
    </Col>
  );
};
export default TMActUpdate;
