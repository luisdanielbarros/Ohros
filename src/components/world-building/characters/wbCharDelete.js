import { Col } from "react-bootstrap";
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
const WBCharDelete = () => {
  const accessToken = useSelector((state) => state.user.accessToken);
  const Id = useSelector((state) => state.worldBuilding.Id);
  const formData = {
    projpass: "",
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Col md="12" className="wb-characters-delete">
      <Formik
        initialValues={formData}
        enableReinitialize
        validationSchema={Yup.object({
          projpass: Yup.string().required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          let formData = new FormData();
          formData.append("action", "deletecharacter");
          formData.append("access_token", accessToken);
          formData.append("wb_id", Id);
          for (let key in values) {
            formData.append(key, values[key]);
          }
          Axios.post("/", formData)
            .then((response) => {
              if (response.status === 200) {
                dispatch(worldBuildingActions.close());
                navigate("list");
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
        {/*Character Form*/}
        <Form>
          <h2>Delete Character</h2>
          <div className="form-group">
            <h3>World Building Base</h3>
            {/*Project Password*/}
            {loadFormAttribute(
              "projpass",
              "Project Password",
              "********",
              "password"
            )}
          </div>
          <div className="form-group">
            {/*Submit Button*/}
            {submitButton("Delete Character")}
          </div>
        </Form>
      </Formik>
    </Col>
  );
};
export default WBCharDelete;
