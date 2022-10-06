import { useEffect } from "react";
import { Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { submitButton } from "../../general/Util";
import { arcActions } from "../../store/arcSlice";
import { actActions } from "../../store/actSlice";
import { actionActions } from "../../store/actionSlice";
import { bookmarkActions } from "../../store/bookmarkSlice";
const TMArcClose = () => {
  const formData = {};
  const dispatch = useDispatch();
  const isInArc = useSelector((state) => state.arc.isInArc);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isInArc) navigate("/time/arcs/list"); //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Col md="12" className="tm-arcs-close">
      <Formik
        initialValues={formData}
        enableReinitialize
        validationSchema={Yup.object({})}
        onSubmit={() => {
          dispatch(bookmarkActions.close({}));
          dispatch(actionActions.close({}));
          dispatch(actActions.close({}));
          dispatch(arcActions.close({}));
          navigate("/time/arcs/list");
        }}
      >
        {/*Arc Form*/}
        <Form>
          <h2>Close Arc</h2>
          {/*Submit Button*/}
          {submitButton("Close Arc")}
        </Form>
      </Formik>
    </Col>
  );
};
export default TMArcClose;
