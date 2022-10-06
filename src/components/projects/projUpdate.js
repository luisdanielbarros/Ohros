import { useEffect } from "react";
import { Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
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
const ProjUpdate = () => {
  const accessToken = useSelector((state) => state.user.accessToken);
  const Project = useSelector((state) => state.project);
  const formData = {
    projname: Project.Projname,
    summary: Project.Summary,
    description: Project.Description,
    projpass: "",
    new_projpass: "",
  };
  const dispatch = useDispatch();
  const isInProject = useSelector((state) => state.project.isInProject);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isInProject) navigate("/projects/list"); //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Col md="12" className="proj-update">
      <Formik
        initialValues={formData}
        enableReinitialize
        validationSchema={Yup.object({
          projpass: Yup.string().required("Required"),
          projname: Yup.string()
            .required("Required")
            .max(64, "Exceeded maximum of 64 digits"),
          summary: Yup.string().max(128, "Exceeded maximum of 128 digits"),
          description: Yup.string(),
          new_projpass: Yup.string().required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          var formData = new FormData();
          formData.append("action", "updateproject");
          formData.append("access_token", accessToken);
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
                dispatch(projAuthActions.update(reduxDispatchObject));
                navigate("/projects/list");
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
        {/*Project Form*/}
        <Form>
          <div className="form-group">
            <h2>Update Project</h2>
            {/*Old Project Password*/}
            {loadFormAttribute(
              "projpass",
              "Previous Project Password",
              "********",
              "password"
            )}
            {/*Project Name*/}
            {loadFormAttribute("projname", "Project Name", "My Project")}
            {/*Project Summary*/}
            {loadFormAttribute("summary", "Summary", "My Summary")}
            {/*Project Description*/}
            {loadFormAttribute("description", "Description", "My Description")}
            {/*New Project Password*/}
            {loadFormAttribute(
              "new_projpass",
              "New Project Password",
              "********",
              "password"
            )}
          </div>
          {/*Submit Button*/}
          {submitButton("Update Project")}
        </Form>
      </Formik>
    </Col>
  );
};
export default ProjUpdate;
