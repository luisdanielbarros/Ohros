import { useState } from "react";
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
import OceanModel from "./oceanModel";
import JungModel from "./jungModel";
const WBCharCreate = () => {
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
    ego: "",
    complexes: "",
    persona: "",
    anima: "",
    shadow: "",
    self: "",
    psychicquirks: "",
    physicquirks: "",
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [oceanConfig, setOceanConfig] = useState({
    Openness: 50,
    Conscientiousness: 50,
    Extraversion: 50,
    Agreeableness: 50,
    Neuroticism: 50,
  });
  const [jungConfig, setJungConfig] = useState({
    aTExtraversion: 50,
    fTThinking: 50,
    fTFeeling: 50,
    fTIntuition: 50,
    fTSensation: 50,
  });
  return (
    <Col md="12" className="wb-characters-create">
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
          ego: Yup.string(),
          complexes: Yup.string(),
          persona: Yup.string(),
          anima: Yup.string(),
          shadow: Yup.string(),
          self: Yup.string(),
          psychicquirks: Yup.string(),
          physicquirks: Yup.string(),
        })}
        onSubmit={(values, { setSubmitting }) => {
          var formData = new FormData();
          formData.append("action", "createcharacter");
          formData.append("access_token", accessToken);
          let stringOceanConfig =
            oceanConfig.Openness +
            ";" +
            oceanConfig.Conscientiousness +
            ";" +
            oceanConfig.Extraversion +
            ";" +
            oceanConfig.Agreeableness +
            ";" +
            oceanConfig.Neuroticism;
          formData.append("oceanmodel", stringOceanConfig);
          let stringJungConfig =
            jungConfig.aTExtraversion +
            ";" +
            jungConfig.fTThinking +
            ";" +
            jungConfig.fTFeeling +
            ";" +
            jungConfig.fTIntuition +
            ";" +
            jungConfig.fTSensation;
          formData.append("jungmodel", stringJungConfig);
          for (var key in values) {
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
        {/*Character Form*/}
        <Form>
          <h2>Create Character</h2>
          <Tabs
            defaultActiveKey="concept"
            id="wb-char-create"
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
                "What caused this person to be the way that they are?"
              )}
              {/*Purpose*/}
              {loadFormAttribute(
                "purpose",
                "Purpose",
                "What ultimate goal of self-becoming is this person working towards?"
              )}
              {/*Myth*/}
              {loadFormAttribute(
                "myth",
                "Myth",
                "What myth is this person attempting to fulfill inside their heads?"
              )}
            </Tab>
            {/*OCEAN Model*/}
            <Tab eventKey="oceanmodel" title="Ocean Model">
              <h4>Ocean Model</h4>
              <OceanModel Config={oceanConfig} setConfig={setOceanConfig} />
            </Tab>
            {/*Jung*/}
            <Tab eventKey="jung" title="Jung">
              {/*Jungian Personality Model*/}
              <h4>Jungian Personality Model</h4>
              {/*Jung Model*/}
              <JungModel Config={jungConfig} setConfig={setJungConfig} />
              {/*Consciousness*/}
              <h4>Consciousness</h4>
              {/*Ego*/}
              {loadFormAttribute(
                "ego",
                "Ego",
                "What's laying on the mind?",
                "textarea"
              )}
              {/*Personal Unconscious*/}
              <h4>Personal Unconscious</h4>
              {/*Complexes*/}
              {loadFormAttribute(
                "complexes",
                "Complexes",
                "What moves the person?",
                "textarea"
              )}
              {/*Collective Unconscious*/}
              <h4>Collective Unconscious</h4>
              {/*Persona*/}
              {loadFormAttribute(
                "persona",
                "Persona",
                "What face do they show the world?",
                "textarea"
              )}
              {/*Anima*/}
              {loadFormAttribute(
                "anima",
                "Anima",
                "How's his feminine side? Or how's her masculine side?",
                "textarea"
              )}
              {/*Shadow*/}
              {loadFormAttribute(
                "shadow",
                "Shadow",
                "How's their darkest side?",
                "textarea"
              )}
              {/*Self*/}
              {loadFormAttribute(
                "self",
                "Self",
                "How's their ideal?",
                "textarea"
              )}
            </Tab>
            {/*Quirks*/}
            <Tab eventKey="quirks" title="Quirks">
              <h4>Quirks</h4>
              {/*Psychic Quirks*/}
              {loadFormAttribute(
                "psychicquirks",
                "Psychic Quirks",
                "What are their peculiar mannerisms?"
              )}
              {/*Physic Quirks*/}
              {loadFormAttribute(
                "physicquirks",
                "Physic Quirks",
                "What are the little things?"
              )}
            </Tab>
            {/*Finish*/}
            <Tab eventKey="finish" title="Finish">
              <h4>Finish creating your character</h4>
              <p>You can always change it later!</p>
              {/*Submit Button*/}
              {submitButton("Create Character")}
            </Tab>
          </Tabs>
        </Form>
      </Formik>
    </Col>
  );
};
export default WBCharCreate;
