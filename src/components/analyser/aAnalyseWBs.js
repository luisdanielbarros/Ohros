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
const AAnalyseWBs = () => {
  const accessToken = useSelector((state) => state.user.accessToken);
  const Bookmark = useSelector((state) => state.bookmark);
  const formData = new FormData();
  const [wbList, setWBList] = useState([
    [0, "Please select a world-building-idea"],
  ]);
  const [criteriaList, setCriteriaList] = useState([]);
  const [actionList, setActionList] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //Fetch the data
  useEffect(() => {
    let formData2 = new FormData();
    formData2.append("action", "viewwbs");
    formData2.append("access_token", accessToken);
    Axios.post("/", formData2)
      .then((response) => {
        if (response.status === 200) {
          let responseData = response.data.content;
          let tempList = [responseData.length + 1];
          tempList[0] = [0, "Please select a world-building-idea"];
          for (let i = 0; i < responseData.length; i++) {
            tempList[i + 1] = [responseData[i].Id, responseData[i].Title];
          }
          setWBList(tempList);
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
    else if (actionList.length === 1 && actionList[0] === null)
      return (
        <div>
          <p>No results were found.</p>
        </div>
      );
    else {
      return <DragNDrop Type={`Analysis`} contentList={actionList} />;
    }
  };
  //Criteria List
  const JSXCriteriaList = () => {
    if (criteriaList === undefined || !criteriaList.length)
      return (
        <div>
          <p>No criteria yet.</p>
        </div>
      );
    else {
      return criteriaList.map((Criteria, i) => (
        <Button
          key={i}
          variant="light"
          value={Criteria.id}
          onClick={(e) =>
            !actionList.length &&
            setCriteriaList(
              criteriaList.filter((Criteria) => Criteria.id !== e.target.value)
            )
          }
        >
          {Criteria.title}&nbsp;&nbsp;X
        </Button>
      ));
    }
  };
  //Reset Button
  const resetButton = () => {
    if (actionList.length)
      return (
        <div className="form-attribute">
          <Button variant="light" onClick={() => navigate(0)}>
            Analyse Again
          </Button>
        </div>
      );
    else return <></>;
  };
  return (
    <Col md="12" className={`a-analysewbs a-analysewbs-view-${Bookmark.View}`}>
      <Formik
        initialValues={formData}
        enableReinitialize
        validationSchema={Yup.object({})}
        onSubmit={(values, { setSubmitting }) => {
          let formData = new FormData();
          formData.append("action", "analysewbs");
          formData.append("access_token", accessToken);
          let wbs_ids = "";
          for (let i = 0; i < criteriaList.length; i++) {
            if (wbs_ids.length) wbs_ids += ",";
            wbs_ids += criteriaList[i].id;
          }
          formData.append("wbs_ids", wbs_ids);
          for (let key in values) {
            formData.append(key, values[key]);
          }
          Axios.post("/", formData)
            .then((response) => {
              if (response.status === 200) {
                if (!response.data.content.length) {
                  dispatch(
                    notificationActions.add({
                      Title: "No result was found.",
                      Message:
                        "No entries were found matching the search criteria.",
                      closeButton: "Close",
                    })
                  );
                  setActionList([null]);
                } else setActionList(response.data.content);
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
        {/*Abalysis Form*/}
        <Form>
          <div className="form-group">
            <h2>Analyse by World Building Idea(s)</h2>
            {/*WB Id*/}
            {actionList?.length ? (
              <></>
            ) : (
              loadFormAttribute(
                "wb_id",
                "World Building Idea",
                "My World Building Idea",
                "select",
                wbList,
                (e) => {
                  setCriteriaList([
                    ...criteriaList,
                    {
                      id: e.target.value,
                      title: e.target.selectedOptions[0].label,
                    },
                  ]);
                }
              )
            )}
          </div>
          {/*Criteria List*/}
          <div className="form-group">
            <div className="form-criteria">{JSXCriteriaList()}</div>
          </div>
          {/*Submit & Reset Button*/}
          <div className="form-group">
            {actionList?.length ? resetButton() : submitButton("Analyse")}
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
export default AAnalyseWBs;
