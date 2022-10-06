import { useEffect } from "react";
import { Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { submitButton } from "../../general/Util";
import { actActions } from "../../store/actSlice";
import { actionActions } from "../../store/actionSlice";
import { bookmarkActions } from "../../store/bookmarkSlice";
const TMActClose = () => {
  const formData = {};
  const dispatch = useDispatch();
  const isInAct = useSelector((state) => state.act.isInAct);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isInAct) navigate("/time/acts/list"); //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Col md="12" className="tm-acts-close">
      <Formik
        initialValues={formData}
        enableReinitialize
        validationSchema={Yup.object({})}
        onSubmit={() => {
          dispatch(bookmarkActions.close({}));
          dispatch(actionActions.close({}));
          dispatch(actActions.close({}));
          navigate("/time/acts/list");
        }}
      >
        {/*Act Form*/}
        <Form>
          <h2>Close Act</h2>
          {/*Submit Button*/}
          {submitButton("Close Act")}
        </Form>
      </Formik>
    </Col>
  );
};
export default TMActClose;
