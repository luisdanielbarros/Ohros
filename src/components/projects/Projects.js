import { useEffect } from "react";
import { Row, Nav, Navbar, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProjList from "./projList";
import ProjClose from "./projClose";
import ProjCreate from "./projCreate";
import ProjUpdate from "./projUpdate";
import ProjDelete from "./projDelete";
import { notificationActions } from "../store/notificationSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faBook,
  faPencil,
  faPencilRuler,
  faEraser,
} from "@fortawesome/free-solid-svg-icons";
const Projects = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isInProject = useSelector((state) => state.project.isInProject);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(notificationActions.needLoggedIn());
      navigate("/users/login");
    } //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const List = <FontAwesomeIcon icon={faBookOpen} />;
  const Close = <FontAwesomeIcon icon={faBook} />;
  const Create = <FontAwesomeIcon icon={faPencil} />;
  const Update = <FontAwesomeIcon icon={faPencilRuler} />;
  const Delete = <FontAwesomeIcon icon={faEraser} />;
  let Operations = isInProject
    ? [
        ["List", List, "Select a project."],
        ["Close", Close, "Unselect a project."],
        ["Create", Create, "Create a new project."],
        ["Update", Update, "Update a project."],
        ["Delete", Delete, "Delete a project."],
      ]
    : [
        ["List", List, "Select a project."],
        ["Create", Create, "Create a new project."],
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
        <NavLink to={`${Operation[0]}`} activeclassname="active">
          {Operation[1]}
        </NavLink>
      </OverlayTrigger>
    ));
  return (
    <Row className="proj">
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
        <Route path="list" element={<ProjList />} />
        <Route path="close" element={<ProjClose />} />
        <Route path="create" element={<ProjCreate />} />
        <Route path="update" element={<ProjUpdate />} />
        <Route path="delete" element={<ProjDelete />} />
        <Route path="*" element={<ProjList />} />
      </Routes>
    </Row>
  );
};
export default Projects;
