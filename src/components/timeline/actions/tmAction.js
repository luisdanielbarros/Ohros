import { useEffect } from "react";
import { Row, Nav, Navbar, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faBook,
  faPencil,
  faPencilRuler,
  faEraser,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import TMActionList from "./tmActionList";
import TMActionClose from "./tmActionClose";
import TMActionCreate from "./tmActionCreate";
import TMActionUpdate from "./tmActionUpdate";
import TMActionDelete from "./tmActionDelete";
import TMActionExport from "./tmActionExport";
import TMActionListRelBookmarks from "./tmActionListRelBookmarks";
import TMActionRelBookmark from "./tmActionRelBookmark";
import TMActionUnrelBookmark from "./tmActionUnrelBookmark";
import TMActionListRelWBs from "./tmActionListRelWBs";
import TMActionRelWB from "./tmActionRelWB";
import TMActionUnrelWB from "./tmActionUnrelWB";
import { notificationActions } from "../../store/notificationSlice";
const TMAction = () => {
  const dispatch = useDispatch();
  const isInTimeline = useSelector((state) => state.timeline.isInTimeline);
  const isInArc = useSelector((state) => state.arc.isInArc);
  const inInAct = useSelector((state) => state.act.isInAct);
  const inInAction = useSelector((state) => state.action.isInAction);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isInTimeline) {
      dispatch(notificationActions.needInTimeline());
      navigate("/time/timelines/list");
    } else if (!isInArc) {
      dispatch(notificationActions.needInArc());
      navigate("/time/arcs/list");
    } else if (!inInAct) {
      dispatch(notificationActions.needInAct());
      navigate("/time/acts/list");
    } //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const List = <FontAwesomeIcon icon={faBookOpen} />;
  const Close = <FontAwesomeIcon icon={faBook} />;
  const Create = <FontAwesomeIcon icon={faPencil} />;
  const Update = <FontAwesomeIcon icon={faPencilRuler} />;
  const Delete = <FontAwesomeIcon icon={faEraser} />;
  const Export = <FontAwesomeIcon icon={faDownload} />;
  let Operations = inInAction
    ? [
        ["List", List, "Select an action.", ""],
        ["Close", Close, "Unselect an action.", ""],
        ["Create", Create, "Create an new action.", ""],
        ["Update", Update, "Update an action.", ""],
        ["Delete", Delete, "Delete an action.", ""],
        ["Export", Export, "Export an action.", ""],
        ["List-Bookmarks", List, "See related bookmarks.", "bookmarks"],
        ["Rel-Bookmark", Create, "Relate bookmarks.", "bookmarks"],
        ["Unrel-Bookmark", Delete, "Unrelate bookmarks.", "bookmarks"],
        ["List-WBs", List, "See related world-building ideas.", "wbs"],
        ["Rel-WB", Create, "Relate world-building ideas.", "wbs"],
        ["Unrel-WB", Delete, "Unrelate world-building ideas.", "wbs"],
      ]
    : [
        ["List", List, "Select an action."],
        ["Create", Create, "Create an new action."],
      ];
  const JSXOperations = () =>
    Operations.map((Operation) => (
      <OverlayTrigger
        key={Operation[0]}
        placement="right"
        overlay={
          <Tooltip id={`tooltip-${Operation[0]}`}>{Operation[2]}</Tooltip>
        }
      >
        <NavLink
          to={`${Operation[0].toLowerCase()}`}
          activeclassname="active"
          className={Operation[3]}
        >
          {Operation[1]}
        </NavLink>
      </OverlayTrigger>
    ));
  return (
    <Row className="tm-actions">
      <div className="operation-sidebar">
        <Navbar
          aria-controls="operation-selector"
          className="operation-selector"
        >
          <Navbar.Toggle aria-controls="operation-selector" />
          <Navbar.Collapse id="operation-selector">
            <Nav justify activeKey="/">
              {JSXOperations()}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="operation-content"></div>
      </div>
      <Routes>
        <Route path="list" element={<TMActionList />} />
        <Route path="close" element={<TMActionClose />} />
        <Route path="create" element={<TMActionCreate />} />
        <Route path="update" element={<TMActionUpdate />} />
        <Route path="delete" element={<TMActionDelete />} />
        <Route path="export" element={<TMActionExport />} />
        <Route path="list-bookmarks" element={<TMActionListRelBookmarks />} />
        <Route path="rel-bookmark" element={<TMActionRelBookmark />} />
        <Route path="unrel-bookmark" element={<TMActionUnrelBookmark />} />
        <Route path="list-wbs" element={<TMActionListRelWBs />} />
        <Route path="rel-wb" element={<TMActionRelWB />} />
        <Route path="unrel-wb" element={<TMActionUnrelWB />} />
        <Route path="*" element={<TMActionList />} />
      </Routes>
    </Row>
  );
};
export default TMAction;
