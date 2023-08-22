import { Col, Tabs, Tab } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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
const WBObjCreate = () => {
  const accessToken = useSelector((state) => state.user.accessToken);
  const formData = {
    concept: "",
    reasonofconcept: "",
    wbname: "",
    summary: "",
    description: "",
    cause: "",
    purpose: "",
    myth: "",
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Col md="12" className="wb-objects-create">
      <Formik
        initialValues={formData}
        enableReinitialize
        validationSchema={Yup.object({
          concept: Yup.string(),
          reasonofconcept: Yup.string(),
          wbname: Yup.string()
            .required("Required")
            .max(64, "Exceeded maximum of 64 digits"),
          summary: Yup.string().max(128, "Exceeded maximum of 128 digits"),
          description: Yup.string(),
          cause: Yup.string(),
          purpose: Yup.string(),
          myth: Yup.string(),
        })}
        onSubmit={(values, { setSubmitting }) => {
          let formData = new FormData();
          formData.append("action", "createobject");
          formData.append("access_token", accessToken);
          for (let key in values) {
            formData.append(key, values[key]);
          }
          Axios.post("/", formData)
            .then((response) => response.status === 201 && navigate("list"))
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
        {/*Object Form*/}
        <Form>
          <h2>Create Object</h2>
          <Tabs
            defaultActiveKey="concept"
            id="wb-obj-create"
            className="form-tabs"
          >
            {/*Concept*/}
            <Tab eventKey="concept" title="Concept">
              <h4>Concept</h4>
              {/*Concept*/}
              {loadFormAttribute(
                "concept",
                "Concept",
                "What inspired it?",
                "textarea"
              )}
              {/*Reason of Concept*/}
              {loadFormAttribute(
                "reasonofconcept",
                "Reason of Concept",
                "What's the appeal?",
                "textarea"
              )}
            </Tab>
            {/*Basic Information*/}
            <Tab eventKey="basicinformation" title="Basic Information">
              <h4>Basic Information</h4>
              {/*Name*/}
              {loadFormAttribute("wbname", "Name", "What's the full name?")}
              {/*Summary*/}
              {loadFormAttribute(
                "summary",
                "Summary",
                "Give us a brief description",
                "textarea"
              )}
              {/*Description*/}
              {loadFormAttribute(
                "description",
                "Description",
                "Can you give us an exhaustive description",
                "textarea"
              )}
            </Tab>
            {/*Reason of Being*/}
            <Tab eventKey="reasonofbeing" title="Reason of Being">
              <h4>Reason of Being</h4>
              {/*Cause*/}
              {loadFormAttribute(
                "cause",
                "Cause",
                "What caused this object to be the way that it is?"
              )}
              {/*Purpose*/}
              {loadFormAttribute(
                "purpose",
                "Purpose",
                "What ultimate goal has this object been built towards?"
              )}
              {/*Myth*/}
              {loadFormAttribute(
                "myth",
                "Myth",
                "What myth does this object fulfill?"
              )}
            </Tab>
            {/*Finish*/}
            <Tab eventKey="finish" title="Finish">
              <h4>Finish creating your object</h4>
              <p>You can always change it later!</p>
              {/*Submit Button*/}
              {submitButton("Create Object")}
            </Tab>
          </Tabs>
        </Form>
      </Formik>
    </Col>
  );
};
export default WBObjCreate;
