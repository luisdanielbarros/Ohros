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
import WBObjList from "./wbObjList";
import WBClose from "../wbClose";
import WBObjCreate from "./wbObjCreate";
import WBObjUpdate from "./wbObjUpdate";
import WBObjDelete from "./wbObjDelete";
import WBExport from "../wbExport";
const WBObj = () => {
  const wbType = useSelector((state) => state.worldBuilding.Type);
  const List = <FontAwesomeIcon icon={faBookOpen} />;
  const Close = <FontAwesomeIcon icon={faBook} />;
  const Create = <FontAwesomeIcon icon={faPencil} />;
  const Update = <FontAwesomeIcon icon={faPencilRuler} />;
  const Delete = <FontAwesomeIcon icon={faEraser} />;
  const Export = <FontAwesomeIcon icon={faDownload} />;
  let Operations =
    wbType === "Object"
      ? [
          ["List", List, "Select a object."],
          ["Close", Close, "Unselect a object."],
          ["Create", Create, "Create a new object."],
          ["Update", Update, "Update a object."],
          ["Delete", Delete, "Delete a object."],
          ["Export", Export, "Export a object."],
        ]
      : [
          ["List", List, "Select a object."],
          ["Create", Create, "Create a new object."],
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
    <Row className="wb-objects">
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
        <Route path="list" element={<WBObjList />} />
        <Route path="close" element={<WBClose />} />
        <Route path="create" element={<WBObjCreate />} />
        <Route path="update" element={<WBObjUpdate />} />
        <Route path="delete" element={<WBObjDelete />} />
        <Route path="export" element={<WBExport />} />
        <Route path="*" element={<WBObjList />} />
      </Routes>
    </Row>
  );
};
export default WBObj;
