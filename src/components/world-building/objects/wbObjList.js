import { useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Axios from "../../axios/index";
import WBEntry from "../wbEntry";
import { notificationActions } from "../../store/notificationSlice";
import { userAuthActions } from "../../store/userAuthSlice";
import { projAuthActions } from "../../store/projAuthSlice";
import { worldBuildingActions } from "../../store/worldBuildingSlice";
import { timelineActions } from "../../store/timelineSlice";
import { arcActions } from "../../store/arcSlice";
import { actActions } from "../../store/actSlice";
import { actionActions } from "../../store/actionSlice";
import { bookmarkActions } from "../../store/bookmarkSlice";
const WBObjectList = () => {
  const accessToken = useSelector((state) => state.user.accessToken);
  const [objectList, setObjectList] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //Fetch the data
  useEffect(() => {
    let formData = new FormData();
    formData.append("action", "viewobjects");
    formData.append("access_token", accessToken);
    Axios.post("/", formData)
      .then(
        (response) =>
          response.status === 200 && setObjectList(response.data.content)
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
  const JSXObjectList = () => {
    if (objectList === undefined || !objectList.length)
      return (
        <div>
          <p>No World Building Ideas.</p>
        </div>
      );
    else {
      return objectList.map((_Object) => (
        <WBEntry
          key={_Object.id}
          Type="Object"
          Id={_Object.id}
          Concept={_Object.concept}
          reasonOfConcept={_Object.reasonofconcept}
          Title={_Object.title}
          Summary={_Object.summary}
          Description={_Object.description}
          Cause={_Object.cause}
          Purpose={_Object.purpose}
          Myth={_Object.myth}
          Object={{}}
        />
      ));
    }
  };
  return (
    <Col md="12" className="wb-objects-list">
      <h2>Your Objects</h2>
      <div className="wb-list-container">{JSXObjectList()}</div>
    </Col>
  );
};
export default WBObjectList;
