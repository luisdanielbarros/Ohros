import { useEffect } from "react";
import { Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { submitButton } from "../../general/Util";
import { actionActions } from "../../store/actionSlice";
import { bookmarkActions } from "../../store/bookmarkSlice";
const TMActionClose = () => {
  const formData = {};
  const dispatch = useDispatch();
  const isInAction = useSelector((state) => state.action.isInAction);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isInAction) navigate("/time/actions/list"); //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Col md="12" className="tm-actions-close">
      <Formik
        initialValues={formData}
        enableReinitialize
        validationSchema={Yup.object({})}
        onSubmit={() => {
          dispatch(bookmarkActions.close({}));
          dispatch(actionActions.close({}));
          navigate("/time/actions/list");
        }}
      >
        {/*Action Form*/}
        <Form>
          <h2>Close Action</h2>
          {/*Submit Button*/}
          {submitButton("Close Action")}
        </Form>
      </Formik>
    </Col>
  );
};
export default TMActionClose;
