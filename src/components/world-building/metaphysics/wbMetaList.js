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
const WBMetaList = () => {
  const accessToken = useSelector((state) => state.user.accessToken);
  const [metaphysicList, setMetaphysicList] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //Fetch the data
  useEffect(() => {
    let formData = new FormData();
    formData.append("action", "viewmetaphysics");
    formData.append("access_token", accessToken);
    Axios.post("/", formData)
      .then(
        (response) =>
          response.status === 200 && setMetaphysicList(response.data.content)
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
  const JSXMetaphysicList = () => {
    if (metaphysicList === undefined || !metaphysicList.length)
      return (
        <div>
          <p>No World Building Ideas.</p>
        </div>
      );
    else {
      return metaphysicList.map((Metaphysic) => (
        <WBEntry
          key={Metaphysic.id}
          Type="Metaphysic"
          Id={Metaphysic.id}
          Concept={Metaphysic.concept}
          reasonOfConcept={Metaphysic.reasonofconcept}
          Title={Metaphysic.title}
          Summary={Metaphysic.summary}
          Description={Metaphysic.description}
          Cause={Metaphysic.cause}
          Purpose={Metaphysic.purpose}
          Myth={Metaphysic.myth}
          Metaphysic={{}}
        />
      ));
    }
  };
  return (
    <Col md="12" className="wb-metaphysics-list">
      <h2>Your Metaphysics</h2>
      <div className="wb-list-container">{JSXMetaphysicList()}</div>
    </Col>
  );
};
export default WBMetaList;
