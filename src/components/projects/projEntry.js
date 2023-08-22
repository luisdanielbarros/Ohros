import { Card } from "react-bootstrap";
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
import { useNavigate } from "react-router-dom";
const ProjEntry = ({ Id, Title, Description }) => {
  const accessToken = useSelector((state) => state.user.accessToken);
  const formData = { projpass: "" };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const projectId = useSelector((state) => state.project.projectId);
  return (
    <Card
      style={{ width: "18rem" }}
      className={projectId === Id ? `proj-entry active` : `proj-entry`}
    >
      <Card.Body>
        <Card.Title>{Title}</Card.Title>
        <Card.Text>{Description}</Card.Text>
        <Formik
          initialValues={formData}
          enableReinitialize
          validationSchema={Yup.object({
            projpass: Yup.string().required("Required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            //Open Project
            let formData = new FormData();
            formData.append("action", "openproject");
            formData.append("access_token", accessToken);
            formData.append("project_id", Id);
            for (let key in values) {
              formData.append(key, values[key]);
            }
            Axios.post("/", formData)
              .then((response) => {
                if (response.status === 202) {
                  //View project
                  formData = new FormData();
                  formData.append("action", "viewproject");
                  formData.append("access_token", accessToken);
                  formData.append("project_id", Id);
                  Axios.post("/", formData)
                    .then((response) => {
                      if (response.status === 200) {
                        dispatch(
                          projAuthActions.open({
                            projectId: Id,
                            Projname: Title,
                            Summary: response.data.content.Summary,
                            Description: response.data.content.Description,
                          })
                        );
                        navigate("/world-building/list");
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
              {/*Projpass*/}
              {projectId === Id ? (
                <div />
              ) : (
                loadFormAttribute(
                  "projpass",
                  "Projpass",
                  "********",
                  "password"
                )
              )}
            </div>
            {/*Submit Button*/}
            {projectId === Id ? <div /> : submitButton("Open Project")}
          </Form>
        </Formik>
      </Card.Body>
    </Card>
  );
};
export default ProjEntry;
