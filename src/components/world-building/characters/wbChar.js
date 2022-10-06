import { Row, Navbar, Nav, OverlayTrigger, Tooltip } from "react-bootstrap";
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
import WBCharList from "./wbCharList";
import WBClose from "../wbClose";
import WBCharCreate from "./wbCharCreate";
import WBCharUpdate from "./wbCharUpdate";
import WBCharDelete from "./wbCharDelete";
import WBExport from "../wbExport";
const WBChar = () => {
  const wbType = useSelector((state) => state.worldBuilding.Type);
  const List = <FontAwesomeIcon icon={faBookOpen} />;
  const Close = <FontAwesomeIcon icon={faBook} />;
  const Create = <FontAwesomeIcon icon={faPencil} />;
  const Update = <FontAwesomeIcon icon={faPencilRuler} />;
  const Delete = <FontAwesomeIcon icon={faEraser} />;
  const Export = <FontAwesomeIcon icon={faDownload} />;
  let Operations =
    wbType === "Character"
      ? [
          ["List", List, "Select a character."],
          ["Close", Close, "Unselect a character."],
          ["Create", Create, "Create a new character."],
          ["Update", Update, "Update a character."],
          ["Delete", Delete, "Delete a character."],
          ["Export", Export, "Export a character."],
        ]
      : [
          ["List", List, "Select a character."],
          ["Create", Create, "Create a new character."],
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
    <Row className="wb-characters">
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
        <Route path="list" element={<WBCharList />} />
        <Route path="close" element={<WBClose />} />
        <Route path="create" element={<WBCharCreate />} />
        <Route path="update" element={<WBCharUpdate />} />
        <Route path="delete" element={<WBCharDelete />} />
        <Route path="export" element={<WBExport />} />
        <Route path="*" element={<WBCharList />} />
      </Routes>
    </Row>
  );
};
export default WBChar;
