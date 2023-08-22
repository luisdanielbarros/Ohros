import { useState, useEffect } from "react";
import { Col, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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
import DragNDrop from "../../drag-n-drop/dragNDrop";
const TMArcList = () => {
  const accessToken = useSelector((state) => state.user.accessToken);
  const Timeline = useSelector((state) => state.timeline);
  const Arc = useSelector((state) => state.arc);
  const [arcList, setArcList] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //Fetch the data
  useEffect(() => {
    if (!Timeline.isInTimeline) return;
    let formData = new FormData();
    formData.append("action", "viewarcs");
    formData.append("access_token", accessToken);
    formData.append("timeline_id", Timeline.timelineId);
    Axios.post("/", formData)
      .then(
        (response) =>
          response.status === 200 && setArcList(response.data.content)
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
  const JSXArcList = () => {
    if (arcList === undefined || !arcList.length)
      return (
        <div>
          <p>No Arcs.</p>
        </div>
      );
    else return <DragNDrop Type={`Arc`} contentList={arcList} />;
  };
  return (
    <Col md="12" className={`tm-arcs-list tm-arcs-list-view-${Arc.View}`}>
      {/*Breadcrumbs*/}
      <div className="tm-breadcrumb">
        <h2 className="tm-breadcrumb-timeline active">
          <span>Timeline</span> {Timeline.Timename}
        </h2>
        <h3
          className={
            Arc.isInArc ? `tm-breadcrumb-arc active` : `tm-breadcrumb-arc`
          }
        >
          <span>Arc</span>
          {Arc.isInArc ? `${Arc.Arcname}` : `Select an Arc`}
          <small>{Arc.isInArc ? `(Time: ${Arc.Time})` : ``}</small>
        </h3>
        <h4 className="tm-breadcrumb-act"> </h4>
        <h5 className="tm-breadcrumb-action"> </h5>
      </div>
      {/*Views*/}
      <div className="tm-views">
        <p>View</p>
        <div>
          {["Grid", "Line", "List"].map((view) => (
            <Button
              key={view}
              variant="light"
              onClick={() =>
                dispatch(arcActions.changeView({ View: view.toLowerCase() }))
              }
            >
              {view}
            </Button>
          ))}
        </div>
      </div>
      {/*List*/}
      <div className="tm-arcs-list-container">{JSXArcList()}</div>
    </Col>
  );
};
export default TMArcList;
