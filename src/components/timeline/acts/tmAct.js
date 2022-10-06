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
import TMActList from "./tmActList";
import TMActClose from "./tmActClose";
import TMActCreate from "./tmActCreate";
import TMActUpdate from "./tmActUpdate";
import TMActDelete from "./tmActDelete";
import TMActExport from "./tmActExport";
import { notificationActions } from "../../store/notificationSlice";
const TMAct = () => {
  const dispatch = useDispatch();
  const isInTimeline = useSelector((state) => state.timeline.isInTimeline);
  const isInArc = useSelector((state) => state.arc.isInArc);
  const isInAct = useSelector((state) => state.act.isInAct);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isInTimeline) {
      dispatch(notificationActions.needInTimeline());
      navigate("/time/timelines/list");
    } else if (!isInArc) {
      dispatch(notificationActions.needInArc());
      navigate("/time/arcs/list");
    } //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const List = <FontAwesomeIcon icon={faBookOpen} />;
  const Close = <FontAwesomeIcon icon={faBook} />;
  const Create = <FontAwesomeIcon icon={faPencil} />;
  const Update = <FontAwesomeIcon icon={faPencilRuler} />;
  const Delete = <FontAwesomeIcon icon={faEraser} />;
  const Export = <FontAwesomeIcon icon={faDownload} />;
  let Operations = isInAct
    ? [
        ["List", List, "Select an act."],
        ["Close", Close, "Unselect an act."],
        ["Create", Create, "Create a new act."],
        ["Update", Update, "Update an act."],
        ["Delete", Delete, "Delete an act."],
        ["Export", Export, "Export an act."],
      ]
    : [
        ["List", List, "Select an act."],
        ["Create", Create, "Create an new act."],
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
        <NavLink to={`${Operation[0]}`.toLowerCase()} activeclassname="active">
          {Operation[1]}
        </NavLink>
      </OverlayTrigger>
    ));
  return (
    <Row className="tm-acts">
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
        <Route path="list" element={<TMActList />} />
        <Route path="close" element={<TMActClose />} />
        <Route path="create" element={<TMActCreate />} />
        <Route path="update" element={<TMActUpdate />} />
        <Route path="delete" element={<TMActDelete />} />
        <Route path="export" element={<TMActExport />} />
        <Route path="*" element={<TMActList />} />
      </Routes>
    </Row>
  );
};
export default TMAct;
