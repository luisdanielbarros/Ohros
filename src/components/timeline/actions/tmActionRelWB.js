import { useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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
const TMActionRelWB = () => {
  const accessToken = useSelector((state) => state.user.accessToken);
  const actionId = useSelector((state) => state.action.actionId);
  const formData = new FormData();
  const [wbList, setWBList] = useState([
    [0, "Please select a world-wuilding-idea"],
  ]);
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
          tempList[0] = [0, "Please select a world-wuilding-idea"];
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
  return (
    <Col md="12" className="tm-wbsinaction-create">
      <Formik
        initialValues={formData}
        enableReinitialize
        validationSchema={Yup.object({})}
        onSubmit={(values, { setSubmitting }) => {
          formData.append("action", "relatewbtoaction");
          formData.append("access_token", accessToken);
          formData.append("action_id", actionId);
          for (let key in values) {
            formData.append(key, values[key]);
          }
          Axios.post("/", formData)
            .then((response) => {
              if (response.status === 201) navigate("/time/actions/wbs-list");
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
        {/*Action-WB Relation Form*/}
        <Form>
          <div className="form-group">
            <h2>Create Action-World-Building-Idea Relation</h2>
            {/*WB Id*/}
            {loadFormAttribute(
              "wb_id",
              "World-Building Idea",
              "My World-Building Idea",
              "select",
              wbList
            )}
          </div>
          <div className="form-group">
            {/*Submit Button*/}
            {submitButton("Create Relation")}
          </div>
        </Form>
      </Formik>
    </Col>
  );
};
export default TMActionRelWB;
