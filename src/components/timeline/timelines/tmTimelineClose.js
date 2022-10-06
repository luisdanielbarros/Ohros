import { useEffect } from "react";
import { Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { submitButton } from "../../general/Util";
import { timelineActions } from "../../store/timelineSlice";
import { arcActions } from "../../store/arcSlice";
import { actActions } from "../../store/actSlice";
import { actionActions } from "../../store/actionSlice";
import { bookmarkActions } from "../../store/bookmarkSlice";
const TMTimelineClose = () => {
  const formData = {};
  const dispatch = useDispatch();
  const isInTimeline = useSelector((state) => state.timeline.isInTimeline);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isInTimeline) navigate("/time/timelines/list"); //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Col md="12" className="tm-timelines-close">
      <Formik
        initialValues={formData}
        enableReinitialize
        validationSchema={Yup.object({})}
        onSubmit={() => {
          dispatch(bookmarkActions.close({}));
          dispatch(actionActions.close({}));
          dispatch(actActions.close({}));
          dispatch(arcActions.close({}));
          dispatch(timelineActions.close({}));
          navigate("/time/timelines/list");
        }}
      >
        {/*Timeline Form*/}
        <Form>
          <h2>Close Timeline</h2>
          {/*Submit Button*/}
          {submitButton("Close Timeline")}
        </Form>
      </Formik>
    </Col>
  );
};
export default TMTimelineClose;
