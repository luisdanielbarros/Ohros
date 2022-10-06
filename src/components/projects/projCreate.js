import { Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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
const ProjCreate = () => {
  const accessToken = useSelector((state) => state.user.accessToken);
  const formData = { projname: "", summary: "", description: "", projpass: "" };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Col md="12" className="proj-create">
      <Formik
        initialValues={formData}
        enableReinitialize
        validationSchema={Yup.object({
          projname: Yup.string()
            .required("Required")
            .max(64, "Exceeded maximum of 64 digits"),
          summary: Yup.string().max(128, "Exceeded maximum of 128 digits"),
          description: Yup.string(),
          projpass: Yup.string().required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          var formData = new FormData();
          formData.append("action", "createproject");
          formData.append("access_token", accessToken);
          for (var key in values) {
            formData.append(key, values[key]);
          }
          Axios.post("/", formData)
            .then(
              (response) =>
                response.status === 201 && navigate("/projects/list")
            )
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
        {/*Project Form*/}
        <Form>
          <div className="form-group">
            <h2>Create Project</h2>
            {/*Project Name*/}
            {loadFormAttribute("projname", "Project Name", "My New Project")}
            {/*Project Summary*/}
            {loadFormAttribute("summary", "Summary", "My Summary")}
            {/*Project Description*/}
            {loadFormAttribute("description", "Description", "My Description")}
            {/*Project Password*/}
            {loadFormAttribute(
              "projpass",
              "Project Password",
              "********",
              "password"
            )}
          </div>
          {/*Submit Button*/}
          {submitButton("Create Project")}
        </Form>
      </Formik>
    </Col>
  );
};
export default ProjCreate;
