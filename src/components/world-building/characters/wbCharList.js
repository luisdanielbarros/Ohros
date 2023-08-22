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
const WBCharList = () => {
  const accessToken = useSelector((state) => state.user.accessToken);
  const [characterList, setCharacterList] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //Fetch the data
  useEffect(() => {
    let formData = new FormData();
    formData.append("action", "viewcharacters");
    formData.append("access_token", accessToken);
    Axios.post("/", formData)
      .then(
        (response) =>
          response.status === 200 && setCharacterList(response.data.content)
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
  const JSXCharacterList = () => {
    if (characterList === undefined || !characterList.length)
      return (
        <div>
          <p>No World Building Ideas.</p>
        </div>
      );
    else {
      return characterList.map((Character) => (
        <WBEntry
          key={Character.id}
          Type="Character"
          Id={Character.id}
          Title={Character.title}
          Summary={Character.summary}
        />
      ));
    }
  };
  return (
    <Col md="12" className="wb-characters-list">
      <h2>Your Characters</h2>
      <div className="wb-list-container">{JSXCharacterList()}</div>
    </Col>
  );
};
export default WBCharList;
