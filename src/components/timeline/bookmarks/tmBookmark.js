import {
  Row,
  Col,
  Nav,
  Navbar,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
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
import TMBookmarkList from "./tmBookmarkList";
import TMBookmarkClose from "./tmBookmarkClose";
import TMBookmarkCreate from "./tmBookmarkCreate";
import TMBookmarkUpdate from "./tmBookmarkUpdate";
import TMBookmarkDelete from "./tmBookmarkDelete";
import TMBookmarkExport from "./tmBookmarkExport";
const TMBookmark = () => {
  const isInBookmark = useSelector((state) => state.bookmark.isInBookmark);
  const List = <FontAwesomeIcon icon={faBookOpen} />;
  const Close = <FontAwesomeIcon icon={faBook} />;
  const Create = <FontAwesomeIcon icon={faPencil} />;
  const Update = <FontAwesomeIcon icon={faPencilRuler} />;
  const Delete = <FontAwesomeIcon icon={faEraser} />;
  const Export = <FontAwesomeIcon icon={faDownload} />;
  let Operations = isInBookmark
    ? [
        ["List", List, "Select a bookmark."],
        ["Close", Close, "Unselect a bookmark."],
        ["Create", Create, "Create a new bookmark."],
        ["Update", Update, "Update a bookmark."],
        ["Delete", Delete, "Delete a bookmark."],
        ["Export", Export, "Export a bookmark."],
      ]
    : [
        ["List", List, "Select a bookmark."],
        ["Create", Create, "Create a new bookmark."],
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
        <NavLink to={`${Operation[0]}`} activeclassname="active">
          {Operation[1]}
        </NavLink>
      </OverlayTrigger>
    ));
  return (
    <Row className="tm-bookmarks">
      <Col md="2" className="operation-sidebar">
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
      </Col>
      <Routes>
        <Route path="list" element={<TMBookmarkList />} />
        <Route path="close" element={<TMBookmarkClose />} />
        <Route path="create" element={<TMBookmarkCreate />} />
        <Route path="update" element={<TMBookmarkUpdate />} />
        <Route path="delete" element={<TMBookmarkDelete />} />
        <Route path="export" element={<TMBookmarkExport />} />
        <Route path="*" element={<TMBookmarkList />} />
      </Routes>
    </Row>
  );
};
export default TMBookmark;
