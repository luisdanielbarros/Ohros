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
const TMEntry = ({ Type, Id, Title, Description }) => {
  const accessToken = useSelector((state) => state.user.accessToken);
  const timelineId = useSelector((state) => state.timeline.timelineId);
  const arcId = useSelector((state) => state.arc.arcId);
  const bookmarkId = useSelector((state) => state.bookmark.bookmarkId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Card
      className={
        (Type === "Timeline" && timelineId === Id) ||
        (Type === "Arc" && arcId === Id) ||
        (Type === "Bookmark" && bookmarkId === Id)
          ? `tm-entry tm-entry-${Type.toLowerCase()} active`
          : `tm-entry tm-entry-${Type.toLowerCase()}`
      }
      style={{ width: "18rem" }}
    >
      <Card.Body>
        <Card.Title>{Title}</Card.Title>
        <Card.Text>{Truncate(Description, 128)}</Card.Text>
        {(Type === "Timeline" && timelineId === Id) ||
        (Type === "Arc" && arcId === Id) ||
        (Type === "Bookmark" && bookmarkId === Id) ||
        (Type !== "Timeline" && Type !== "Arc" && Type !== "Bookmark") ? (
          <div />
        ) : (
          <Button
            variant="light"
            onClick={() => {
              switch (Type) {
                case "Timeline":
                  {
                    let formData = new FormData();
                    formData.append("action", "viewtimeline");
                    formData.append("access_token", accessToken);
                    formData.append("timeline_id", Id);
                    Axios.post("/", formData)
                      .then((response) => {
                        if (response.status === 200) {
                          let responseData = response.data.content;
                          dispatch(bookmarkActions.close({}));
                          dispatch(actionActions.close({}));
                          dispatch(actActions.close({}));
                          dispatch(arcActions.close({}));
                          dispatch(
                            timelineActions.open({
                              timelineId: responseData.timelineId,
                              Timename: responseData.Timename,
                              Summary: responseData.Summary,
                              Description: responseData.Description,
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
                case "Bookmark":
                  {
                    let formData = new FormData();
                    formData.append("action", "viewbookmark");
                    formData.append("access_token", accessToken);
                    formData.append("bookmark_id", Id);
                    Axios.post("/", formData)
                      .then((response) => {
                        if (response.status === 200) {
                          let responseData = response.data.content;
                          dispatch(
                            bookmarkActions.open({
                              bookmarkId: responseData.bookmarkId,
                              Bookmarkname: responseData.Bookmarkname,
                              Summary: responseData.Summary,
                              Description: responseData.Description,
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
export default TMEntry;
