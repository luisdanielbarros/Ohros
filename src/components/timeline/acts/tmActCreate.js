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
const TMActCreate = () => {
  const accessToken = useSelector((state) => state.user.accessToken);
  const arcId = useSelector((state) => state.arc.arcId);
  const formData = { actname: "" };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Col md="12" className="tm-acts-create">
      <Formik
        initialValues={formData}
        enableReinitialize
        validationSchema={Yup.object({
          actname: Yup.string()
            .required("Required")
            .max(64, "Exceeded maximum of 64 digits"),
          summary: Yup.string().max(128, "Exceeded maximum of 128 digits"),
          description: Yup.string(),
        })}
        onSubmit={(values, { setSubmitting }) => {
          var formData = new FormData();
          formData.append("action", "createact");
          formData.append("access_token", accessToken);
          formData.append("arc_id", arcId);
          for (var key in values) {
            formData.append(key, values[key]);
          }
          Axios.post("/", formData)
            .then(
              (response) =>
                response.status === 201 && navigate("/time/acts/list")
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
        {/*Act Form*/}
        <Form>
          <div className="form-group">
            <h2>Create Act</h2>
            {/*Act Name*/}
            {loadFormAttribute("actname", "Act Name", "My New Act")}{" "}
            {/*Summary*/}
            {loadFormAttribute("summary", "Summary", "My Summary")}
            {/*Description*/}
            {loadFormAttribute(
              "description",
              "Description",
              "My Description",
              "textarea"
            )}
          </div>
          <div className="form-group">
            {/*Submit Button*/}
            {submitButton("Create Act")}
          </div>
        </Form>
      </Formik>
    </Col>
  );
};
export default TMActCreate;
