import { useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Axios from "../../axios/index";
import TMEntry from "../tmEntry";
import { notificationActions } from "../../store/notificationSlice";
import { userAuthActions } from "../../store/userAuthSlice";
import { projAuthActions } from "../../store/projAuthSlice";
import { worldBuildingActions } from "../../store/worldBuildingSlice";
import { timelineActions } from "../../store/timelineSlice";
import { arcActions } from "../../store/arcSlice";
import { actActions } from "../../store/actSlice";
import { actionActions } from "../../store/actionSlice";
import { bookmarkActions } from "../../store/bookmarkSlice";
const TMTimelineList = () => {
  const accessToken = useSelector((state) => state.user.accessToken);
  const Timeline = useSelector((state) => state.timeline);
  const [timelineList, setTimelineList] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //Fetch the data
  useEffect(() => {
    var formData = new FormData();
    formData.append("action", "viewtimelines");
    formData.append("access_token", accessToken);
    Axios.post("/", formData)
      .then(
        (response) =>
          response.status === 200 && setTimelineList(response.data.content)
      )
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
      }); //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //Convert the data to JSX
  const JSXTimelineList = () => {
    if (timelineList === undefined || !timelineList.length)
      return (
        <div>
          <p>No Timelines.</p>
        </div>
      );
    else {
      return timelineList.map((Timeline) => (
        <TMEntry
          key={Timeline.timelineId}
          Type="Timeline"
          Id={Timeline.timelineId}
          Title={Timeline.Timename}
          Description={Timeline.Summary}
        />
      ));
    }
  };
  return (
    <Col md="12" className="tm-timelines-list">
      {/*Breadcrumbs*/}
      <div className="tm-breadcrumb">
        <h2
          className={
            Timeline.isInTimeline
              ? `tm-breadcrumb-timeline active`
              : `tm-breadcrumb-timeline`
          }
        >
          <span>Timeline</span>
          {Timeline.isInTimeline ? Timeline.Timename : `Select a Timeline`}
        </h2>
        <h3 className="tm-breadcrumb-arc"> </h3>
        <h4 className="tm-breadcrumb-act"> </h4>
        <h5 className="tm-breadcrumb-action"> </h5>
      </div>
      {/*List*/}
      <div className="tm-timelines-list-container">{JSXTimelineList()}</div>
    </Col>
  );
};
export default TMTimelineList;
