import { useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Axios from "../axios/index";
import ProjEntry from "./projEntry";
import { notificationActions } from "../store/notificationSlice";
import { userAuthActions } from "../store/userAuthSlice";
import { projAuthActions } from "../store/projAuthSlice";
import { worldBuildingActions } from "../store/worldBuildingSlice";
import { timelineActions } from "../store/timelineSlice";
import { arcActions } from "../store/arcSlice";
import { actActions } from "../store/actSlice";
import { actionActions } from "../store/actionSlice";
const ProjList = () => {
  const accessToken = useSelector((state) => state.user.accessToken);
  const [Projects, setProjects] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //Fetch the data
  useEffect(() => {
    let formData = new FormData();
    formData.append("action", "viewprojects");
    formData.append("access_token", accessToken);
    Axios.post("/", formData)
      .then((response) => {
        if (response.status === 200) {
          setProjects(response.data.content);
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
      }); //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //Convert the data to JSX
  const projectList = () => {
    if (Projects === undefined || !Projects.length)
      return (
        <div>
          <p>No Projects.</p>
        </div>
      );
    else {
      return Projects.map((Project) => (
        <ProjEntry
          key={Project.projectId}
          Id={Project.projectId}
          Title={Project.Projname}
          Description={Project.Summary}
        />
      ));
    }
  };
  return (
    <Col md="12" className="proj-list">
      <h2>Your Projects</h2>
      <div className="proj-list-container">{projectList()}</div>
    </Col>
  );
};
export default ProjList;
