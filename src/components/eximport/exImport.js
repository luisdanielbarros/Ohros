import { useEffect } from "react";
import { Row } from "react-bootstrap";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { notificationActions } from "../store/notificationSlice";
import EIImport from "./eiImport";
const ExImport = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isInProject = useSelector((state) => state.project.isInProject);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(notificationActions.needLoggedIn());
      navigate("/users/login");
    } else if (!isInProject) {
      dispatch(notificationActions.needInProject());
      navigate("/projects/list");
    } //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const Types = () =>
    ["Import"].map((Type) => (
      <NavLink
        key={Type}
        to={`/eximport/${Type.toLowerCase()}`}
        activeclassname="active"
      >
        {Type}
      </NavLink>
    ));
  return (
    <Row className="ei">
      <div className="type-selector">{Types()}</div>
      <Routes>
        <Route path="import/*" element={<EIImport />} />
        <Route path="*" element={<EIImport />} />
      </Routes>
    </Row>
  );
};
export default ExImport;
