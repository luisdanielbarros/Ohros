import { useEffect } from "react";
import { Row } from "react-bootstrap";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import WBChar from "./characters/wbChar";
import WBLocal from "./locations/wbLocal";
import WBObj from "./objects/wbObj";
import WBMeta from "./metaphysics/wbMeta";
import { notificationActions } from "../store/notificationSlice";
const WorldBuilding = () => {
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
    ["Characters", "Locations", "Objects", "Metaphysics"].map((Type) => (
      <NavLink
        key={Type}
        to={`/world-building/${Type.toLowerCase()}`}
        activeclassname="active"
      >
        {Type}
      </NavLink>
    ));
  return (
    <Row className="wb">
      <div className="type-selector">{Types()}</div>
      <Routes>
        <Route path="characters/*" element={<WBChar />} />
        <Route path="locations/*" element={<WBLocal />} />
        <Route path="objects/*" element={<WBObj />} />
        <Route path="metaphysics/*" element={<WBMeta />} />
        <Route path="*" element={<WBChar />} />
      </Routes>
    </Row>
  );
};
export default WorldBuilding;
