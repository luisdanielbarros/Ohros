import { Row, Nav, Navbar, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Routes, Route, NavLink } from "react-router-dom";
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
import TMTimelineList from "./tmTimelineList";
import TMTimelineClose from "./tmTimelineClose";
import TMTimelineCreate from "./tmTimelineCreate";
import TMTimelineUpdate from "./tmTimelineUpdate";
import TMTimelineDelete from "./tmTimelineDelete";
import TMTimelineExport from "./tmTimelineExport";
const TMTimeline = () => {
  const isInTimeline = useSelector((state) => state.timeline.isInTimeline);
  const List = <FontAwesomeIcon icon={faBookOpen} />;
  const Close = <FontAwesomeIcon icon={faBook} />;
  const Create = <FontAwesomeIcon icon={faPencil} />;
  const Update = <FontAwesomeIcon icon={faPencilRuler} />;
  const Delete = <FontAwesomeIcon icon={faEraser} />;
  const Export = <FontAwesomeIcon icon={faDownload} />;
  let Operations = isInTimeline
    ? [
        ["List", List, "Select a timeline."],
        ["Close", Close, "Unselect a timeline."],
        ["Create", Create, "Create a new timeline."],
        ["Update", Update, "Update a timeline."],
        ["Delete", Delete, "Delete a timeline."],
        ["Export", Export, "Export a timeline."],
      ]
    : [
        ["List", List, "Select a timeline."],
        ["Create", Create, "Create a new timeline."],
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
    <Row className="tm-timelines">
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
      </div>
      <Routes>
        <Route path="list" element={<TMTimelineList />} />
        <Route path="close" element={<TMTimelineClose />} />
        <Route path="create" element={<TMTimelineCreate />} />
        <Route path="update" element={<TMTimelineUpdate />} />
        <Route path="delete" element={<TMTimelineDelete />} />
        <Route path="export" element={<TMTimelineExport />} />
        <Route path="*" element={<TMTimelineList />} />
      </Routes>
    </Row>
  );
};
export default TMTimeline;
