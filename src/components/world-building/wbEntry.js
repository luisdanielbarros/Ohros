import { Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Axios from "../axios/index";
import { notificationActions } from "../store/notificationSlice";
import { userAuthActions } from "../store/userAuthSlice";
import { projAuthActions } from "../store/projAuthSlice";
import { worldBuildingActions } from "../store/worldBuildingSlice";
import { timelineActions } from "../store/timelineSlice";
import { arcActions } from "../store/arcSlice";
import { actActions } from "../store/actSlice";
import { actionActions } from "../store/actionSlice";
import { bookmarkActions } from "../store/bookmarkSlice";
import { Truncate } from "../general/Util";
const WBEntry = ({ Type, Id, Title, Summary }) => {
  const accessToken = useSelector((state) => state.user.accessToken);
  const wbId = useSelector((state) => state.worldBuilding.Id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Card
      style={{ width: "18rem" }}
      className={wbId === Id ? `wb-entry active` : `wb-entry`}
    >
      <Card.Body>
        <Card.Title>{Title}</Card.Title>
        <Card.Text>{Truncate(Summary, 128)}</Card.Text>
        {wbId === Id ? (
          <div />
        ) : (
          <Button
            variant="light"
            onClick={() => {
              switch (Type) {
                case "Character":
                  {
                    let formData = new FormData();
                    formData.append("action", "viewcharacter");
                    formData.append("access_token", accessToken);
                    formData.append("wb_id", Id);
                    Axios.post("/", formData)
                      .then((response) => {
                        if (response.status === 200) {
                          let responseData = response.data.content;
                          dispatch(
                            worldBuildingActions.openCharacter({
                              Type: "Character",
                              Id: responseData.id,
                              Concept: responseData.concept,
                              reasonOfConcept: responseData.reasonofconcept,
                              Title: responseData.title,
                              Summary: responseData.summary,
                              Description: responseData.description,
                              Cause: responseData.cause,
                              Purpose: responseData.purpose,
                              Myth: responseData.myth,
                              Character: {
                                oceanModel: responseData.oceanmodel,
                                jungModel: responseData.jungmodel,
                                Ego: responseData.ego,
                                Complexes: responseData.complexes,
                                Persona: responseData.persona,
                                Anima: responseData.anima,
                                Shadow: responseData.shadow,
                                Self: responseData.self,
                                psychicQuirks: responseData.psychicquirks,
                                physicQuirks: responseData.physicquirks,
                              },
                              Location: {},
                              Object: {},
                              Metaphysic: {},
                            })
                          );
                        }
                      })
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
                      });
                  }
                  break;
                case "Location":
                  {
                    let formData = new FormData();
                    formData.append("action", "viewlocation");
                    formData.append("access_token", accessToken);
                    formData.append("wb_id", Id);
                    Axios.post("/", formData)
                      .then((response) => {
                        if (response.status === 200) {
                          let responseData = response.data.content;
                          dispatch(
                            worldBuildingActions.openDefault({
                              Type: "Location",
                              Id: responseData.id,
                              Concept: responseData.concept,
                              reasonOfConcept: responseData.reasonofconcept,
                              Title: responseData.title,
                              Summary: responseData.summary,
                              Description: responseData.description,
                              Cause: responseData.cause,
                              Purpose: responseData.purpose,
                              Myth: responseData.myth,
                              Character: {},
                              Location: {},
                              Object: {},
                              Metaphysic: {},
                            })
                          );
                        }
                      })
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
                      });
                  }
                  break;
                case "Object":
                  {
                    let formData = new FormData();
                    formData.append("action", "viewobject");
                    formData.append("access_token", accessToken);
                    formData.append("wb_id", Id);
                    Axios.post("/", formData)
                      .then((response) => {
                        if (response.status === 200) {
                          let responseData = response.data.content;
                          dispatch(
                            worldBuildingActions.openDefault({
                              Type: "Object",
                              Id: responseData.id,
                              Concept: responseData.concept,
                              reasonOfConcept: responseData.reasonofconcept,
                              Title: responseData.title,
                              Summary: responseData.summary,
                              Description: responseData.description,
                              Cause: responseData.cause,
                              Purpose: responseData.purpose,
                              Myth: responseData.myth,
                              Character: {},
                              Location: {},
                              Object: {},
                              Metaphysic: {},
                            })
                          );
                        }
                      })
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
                      });
                  }
                  break;
                case "Metaphysic":
                  {
                    let formData = new FormData();
                    formData.append("action", "viewmetaphysic");
                    formData.append("access_token", accessToken);
                    formData.append("wb_id", Id);
                    Axios.post("/", formData)
                      .then((response) => {
                        if (response.status === 200) {
                          let responseData = response.data.content;
                          dispatch(
                            worldBuildingActions.openDefault({
                              Type: "Metaphysic",
                              Id: responseData.id,
                              Concept: responseData.concept,
                              reasonOfConcept: responseData.reasonofconcept,
                              Title: responseData.title,
                              Summary: responseData.summary,
                              Description: responseData.description,
                              Cause: responseData.cause,
                              Purpose: responseData.purpose,
                              Myth: responseData.myth,
                              Character: {},
                              Location: {},
                              Object: {},
                              Metaphysic: {},
                            })
                          );
                        }
                      })
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
                      });
                  }
                  break;
                default:
                  break;
              }
            }}
          >
            Open
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};
export default WBEntry;
