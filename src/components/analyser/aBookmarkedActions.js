import { useState, useEffect } from "react";
import { Col, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { loadFormAttribute, submitButton } from "../general/Util";
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
import DragNDrop from "../drag-n-drop/dragNDrop";
const ABookmarkedActions = () => {
  const accessToken = useSelector((state) => state.user.accessToken);
  const Bookmark = useSelector((state) => state.bookmark);
  const formData = new FormData();
  const [bookmarkList, setBookmarkList] = useState([
    [0, "Please select a bookmark"],
  ]);
  const [actionList, setActionList] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //Fetch the data
  useEffect(() => {
    let formData2 = new FormData();
    formData2.append("action", "viewbookmarks");
    formData2.append("access_token", accessToken);
    Axios.post("/", formData2)
      .then((response) => {
        if (response.status === 200) {
          let responseData = response.data.content;
          let tempList = [responseData.length + 1];
          tempList[0] = [0, "Please select a bookmark"];
          for (let i = 0; i < responseData.length; i++) {
            tempList[i + 1] = [
              responseData[i].bookmarkId,
              responseData[i].Bookmarkname,
            ];
          }
          setBookmarkList(tempList);
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
  const JSXActionList = () => {
    if (actionList === undefined || !actionList.length)
      return (
        <div>
          <p>No Actions.</p>
        </div>
      );
    else {
      return <DragNDrop Type={`Analysis`} contentList={actionList} />;
    }
  };
  return (
    <Col
      md="12"
      className={`a-bookmarkedactions a-bookmarkedactions-view-${Bookmark.View}`}
    >
      <Formik
        initialValues={formData}
        enableReinitialize
        validationSchema={Yup.object({})}
        onSubmit={(values, { setSubmitting }) => {
          let formData = new FormData();
          formData.append("action", "analysebookmarkedactions");
          formData.append("access_token", accessToken);
          for (let key in values) {
            formData.append(key, values[key]);
          }
          Axios.post("/", formData)
            .then(
              (response) =>
                response.status === 200 && setActionList(response.data.content)
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
            });
          setSubmitting(false);
        }}
      >
        {/*Bookmarked Action Form*/}
        <Form>
          <div className="form-group">
            <h2>Analyse Bookmarked Actions</h2>
            {/*Bookmark Id*/}
            {loadFormAttribute(
              "bookmark_id",
              "Bookmark",
              "My Bookmark",
              "select",
              bookmarkList
            )}
          </div>
          <div className="form-group">
            {/*Submit Button*/}
            {submitButton("Analyse")}
          </div>
        </Form>
      </Formik>
      {/*Views*/}
      <div className="a-views">
        <p>View</p>
        <div>
          {["Grid", "Line", "List"].map((view) => (
            <Button
              key={view}
              variant="light"
              onClick={() =>
                dispatch(
                  bookmarkActions.changeView({ View: view.toLowerCase() })
                )
              }
            >
              {view}
            </Button>
          ))}
        </div>
      </div>
      {/*List*/}
      <div className="a-bookmarkedactions-list-container">
        {JSXActionList()}
      </div>
    </Col>
  );
};
export default ABookmarkedActions;
