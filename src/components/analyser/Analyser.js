import { useEffect } from "react";
import { Row } from "react-bootstrap";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { notificationActions } from "../store/notificationSlice";
import ABookmarkedActions from "./aBookmarkedActions";
import AAnalyseWBs from "./aAnalyseWBs";
const Analyser = () => {
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
    [
      ["bookmarks", "Bookmarks"],
      ["wbs", "World Building Ideas"],
    ].map((Type) => (
      <NavLink
        key={Type[0]}
        to={`/analyser/${Type[0].toLowerCase()}`}
        activeclassname="active"
      >
        {Type[1]}
      </NavLink>
    ));
  return (
    <Row className="a">
      <div className="type-selector">{Types()}</div>
      <Routes>
        <Route path="bookmarks/*" element={<ABookmarkedActions />} />
        <Route path="wbs/*" element={<AAnalyseWBs />} />
        <Route path="*" element={<ABookmarkedActions />} />
      </Routes>
    </Row>
  );
};
export default Analyser;
