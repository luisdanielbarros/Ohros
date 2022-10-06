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
import TMArcList from "./tmArcList";
import TMArcClose from "./tmArcClose";
import TMArcCreate from "./tmArcCreate";
import TMArcUpdate from "./tmArcUpdate";
import TMArcDelete from "./tmArcDelete";
import TMArcExport from "./tmArcExport";
import { notificationActions } from "../../store/notificationSlice";
const TMArc = () => {
  const dispatch = useDispatch();
  const isInTimeline = useSelector((state) => state.timeline.isInTimeline);
  const isInArc = useSelector((state) => state.arc.isInArc);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isInTimeline) {
      dispatch(notificationActions.needInTimeline());
      navigate("/time/timelines/list");
    } //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const List = <FontAwesomeIcon icon={faBookOpen} />;
  const Close = <FontAwesomeIcon icon={faBook} />;
  const Create = <FontAwesomeIcon icon={faPencil} />;
  const Update = <FontAwesomeIcon icon={faPencilRuler} />;
  const Delete = <FontAwesomeIcon icon={faEraser} />;
  const Export = <FontAwesomeIcon icon={faDownload} />;
  let Operations = isInArc
    ? [
        ["List", List, "Select an arc."],
        ["Close", Close, "Unselect an arc."],
        ["Create", Create, "Create an new arc."],
        ["Update", Update, "Update an arc."],
        ["Delete", Delete, "Delete an arc."],
        ["Export", Export, "Export an arc."],
      ]
    : [
        ["List", List, "Select an arc."],
        ["Create", Create, "Create an new arc."],
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
    <Row className="tm-arcs">
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
        <Route path="list" element={<TMArcList />} />
        <Route path="close" element={<TMArcClose />} />
        <Route path="create" element={<TMArcCreate />} />
        <Route path="update" element={<TMArcUpdate />} />
        <Route path="delete" element={<TMArcDelete />} />
        <Route path="export" element={<TMArcExport />} />
        <Route path="*" element={<TMArcList />} />
      </Routes>
    </Row>
  );
};
export default TMArc;
