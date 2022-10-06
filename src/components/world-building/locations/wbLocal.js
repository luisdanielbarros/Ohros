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
import WBLocalList from "./wbLocalList";
import WBClose from "../wbClose";
import WBLocalCreate from "./wbLocalCreate";
import WBLocalUpdate from "./wbLocalUpdate";
import WBLocalDelete from "./wbLocalDelete";
import WBExport from "../wbExport";
const WBLocal = () => {
  const wbType = useSelector((state) => state.worldBuilding.Type);
  const List = <FontAwesomeIcon icon={faBookOpen} />;
  const Close = <FontAwesomeIcon icon={faBook} />;
  const Create = <FontAwesomeIcon icon={faPencil} />;
  const Update = <FontAwesomeIcon icon={faPencilRuler} />;
  const Delete = <FontAwesomeIcon icon={faEraser} />;
  const Export = <FontAwesomeIcon icon={faDownload} />;
  let Operations =
    wbType === "Location"
      ? [
          ["List", List, "Select a location."],
          ["Close", Close, "Unselect a location."],
          ["Create", Create, "Create a new location."],
          ["Update", Update, "Update a location."],
          ["Delete", Delete, "Delete a location."],
          ["Export", Export, "Export a location."],
        ]
      : [
          ["List", List, "Select a location."],
          ["Create", Create, "Create a new location."],
        ];
  const JSXOperations = () =>
    Operations.map((Operation) => (
      <OverlayTrigger
        key={Operation[0]}
        placement="left"
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
    <Row className="wb-locations">
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
        <Route path="list" element={<WBLocalList />} />
        <Route path="close" element={<WBClose />} />
        <Route path="create" element={<WBLocalCreate />} />
        <Route path="update" element={<WBLocalUpdate />} />
        <Route path="delete" element={<WBLocalDelete />} />
        <Route path="export" element={<WBExport />} />
        <Route path="*" element={<WBLocalList />} />
      </Routes>
    </Row>
  );
};
export default WBLocal;
