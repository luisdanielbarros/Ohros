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
const TMActList = () => {
  const accessToken = useSelector((state) => state.user.accessToken);
  const Timeline = useSelector((state) => state.timeline);
  const Arc = useSelector((state) => state.arc);
  const Act = useSelector((state) => state.act);
  const [actList, setActList] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //Fetch the data
  useEffect(() => {
    if (!Timeline.isInTimeline || !Arc.isInArc) return;
    var formData = new FormData();
    formData.append("action", "viewacts");
    formData.append("access_token", accessToken);
    formData.append("arc_id", Arc.arcId);
    Axios.post("/", formData)
      .then(
        (response) =>
          response.status === 200 && setActList(response.data.content)
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
  const JSXActList = () => {
    if (actList === undefined || !actList.length)
      return (
        <div>
          <p>No Acts.</p>
        </div>
      );
    else return <DragNDrop Type={`Act`} contentList={actList} />;
  };
  return (
    <Col md="12" className={`tm-acts-list tm-acts-list-view-${Act.View}`}>
      {/*Breadcrumbs*/}
      <div className="tm-breadcrumb">
        <h2 className="tm-breadcrumb-timeline active">
          <span>Timeline</span> {Timeline.Timename}
        </h2>
        <h3 className="tm-breadcrumb-arc active">
          <span>Arc</span> {Arc.Arcname}
          <small>{`(Time: ${Arc.Time})`}</small>
        </h3>
        <h4
          className={
            Act.isInAct ? `tm-breadcrumb-act active` : `tm-breadcrumb-act`
          }
        >
          <span>Act</span>
          {Act.isInAct ? Act.Actname : `Select an Act`}
          <small>{Act.isInAct ? `(Time: ${Act.Time})` : ``}</small>
        </h4>
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
                dispatch(actActions.changeView({ View: view.toLowerCase() }))
              }
            >
              {view}
            </Button>
          ))}
        </div>
      </div>
      {/*List*/}
      <div className="tm-acts-list-container">{JSXActList()}</div>
    </Col>
  );
};
export default TMActList;
