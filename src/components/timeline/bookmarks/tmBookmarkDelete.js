import { useEffect } from "react";
import { Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { loadFormAttribute, submitButton } from "../../general/Util";
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
const TMBookmarkDelete = () => {
  const accessToken = useSelector((state) => state.user.accessToken);
  const Bookmark = useSelector((state) => state.bookmark);
  const formData = { projpass: "" };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!Bookmark.isInBookmark) navigate("/time/bookmarks/list"); //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Col md="12" className="tm-bookmarks-delete">
      <Formik
        initialValues={formData}
        enableReinitialize
        validationSchema={Yup.object({
          projpass: Yup.string().required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          var formData = new FormData();
          formData.append("action", "deletebookmark");
          formData.append("access_token", accessToken);
          formData.append("bookmark_id", Bookmark.bookmarkId);
          for (var key in values) {
            formData.append(key, values[key]);
          }
          Axios.post("/", formData)
            .then((response) => {
              if (response.status === 200) {
                dispatch(bookmarkActions.close());
                navigate("/time/bookmarks/list");
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
          setSubmitting(false);
        }}
      >
        {/*Bookmark Form*/}
        <Form>
          <div className="form-group">
            <h2>Delete Bookmark</h2>
            {/*Project Password*/}
            {loadFormAttribute(
              "projpass",
              "Project Password (for confirmation)",
              "********",
              "password"
            )}
          </div>
          {/*Submit Button*/}
          {submitButton("Delete Bookmark")}
        </Form>
      </Formik>
    </Col>
  );
};
export default TMBookmarkDelete;
