import { useEffect } from "react";
import { Row } from "react-bootstrap";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TMTimeline from "./timelines/tmTimeline";
import TMArc from "./arcs/tmArc";
import TMAct from "./acts/tmAct";
import TMAction from "./actions/tmAction";
import TMBookmark from "./bookmarks/tmBookmark";
import { notificationActions } from "../store/notificationSlice";
const Timeline = () => {
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
    ["Timelines", "Arcs", "Acts", "Actions", "Bookmarks"].map((Type) => (
      <NavLink
        key={Type}
        to={`/time/${Type.toLowerCase()}`}
        activeclassname="active"
      >
        {Type}
      </NavLink>
    ));
  return (
    <Row className="tm">
      <div className="type-selector">{Types()}</div>
      <Routes>
        <Route path="timelines/*" element={<TMTimeline />} />
        <Route path="arcs/*" element={<TMArc />} />
        <Route path="acts/*" element={<TMAct />} />
        <Route path="actions/*" element={<TMAction />} />
        <Route path="bookmarks/*" element={<TMBookmark />} />
        <Route path="*" element={<TMTimeline />} />
      </Routes>
    </Row>
  );
};
export default Timeline;
