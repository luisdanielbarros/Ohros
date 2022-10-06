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
const TMActionListRelBookmarks = () => {
  const accessToken = useSelector((state) => state.user.accessToken);
  const actionId = useSelector((state) => state.action.actionId);
  const [bookmarksInActionList, setBookmarksInActionList] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //Fetch the data
  useEffect(() => {
    var formData = new FormData();
    formData.append("action", "viewbookmarksinaction");
    formData.append("access_token", accessToken);
    formData.append("action_id", actionId);
    Axios.post("/", formData)
      .then(
        (response) =>
          response.status === 200 &&
          setBookmarksInActionList(response.data.content)
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
  const JSXBookmarksInActionList = () => {
    if (bookmarksInActionList === undefined || !bookmarksInActionList.length)
      return (
        <div>
          <p>No Bookmarks are associated with this Action.</p>
        </div>
      );
    else
      return bookmarksInActionList.map((bookmarkInAction) => (
        <TMEntry
          key={bookmarkInAction.bookmarkId}
          Type="Relation"
          Id={bookmarkInAction.bookmarkId}
          Title={bookmarkInAction.Bookmarkname}
          Description={bookmarkInAction.Summary}
        />
      ));
  };
  return (
    <Col md="12" className="tm-bookmarksinaction-list">
      <h2>Bookmarks in Action List</h2>
      <div className="tm-bookmarksinaction-list-container">
        {JSXBookmarksInActionList()}
      </div>
    </Col>
  );
};
export default TMActionListRelBookmarks;
