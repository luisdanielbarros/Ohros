import { useEffect } from "react";
import { Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { submitButton } from "../../general/Util";
import { bookmarkActions } from "../../store/bookmarkSlice";
const TMBookmarkClose = () => {
  const formData = {};
  const dispatch = useDispatch();
  const isInBookmark = useSelector((state) => state.bookmark.isInBookmark);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isInBookmark) navigate("/time/bookmarks/list"); //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Col md="12" className="tm-bookmarks-close">
      <Formik
        initialValues={formData}
        enableReinitialize
        validationSchema={Yup.object({})}
        onSubmit={() => {
          dispatch(bookmarkActions.close({}));
          navigate("/time/bookmarks/list");
        }}
      >
        {/*Bookmark Form*/}
        <Form>
          <h2>Close Bookmark</h2>
          {/*Submit Button*/}
          {submitButton("Close Bookmark")}
        </Form>
      </Formik>
    </Col>
  );
};
export default TMBookmarkClose;
