//Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import "./App.css";
//React Router Dom
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//Components
import NavigationMenu from "./components/general/navigationMenu";
import Footer from "./components/general/Footer";
import StartPage from "./components/general/startPage";
import Users from "./components/users/Users";
import Projects from "./components/projects/Projects";
import WorldBuilding from "./components/world-building/worldBuilding";
import Timeline from "./components/timeline/Timeline";
import Analyser from "./components/analyser/Analyser";
import ExImport from "./components/eximport/exImport";
import MessageModel from "./components/general/messageModal";

function App() {
  return (
    <Router>
      <Container fluid className="App">
        <MessageModel />
        <NavigationMenu />
        <Routes>
          <Route path="/users/*" element={<Users />} />
          <Route path="/projects/*" element={<Projects />} />
          <Route path="/world-building/*" element={<WorldBuilding />} />
          <Route path="/time/*" element={<Timeline />} />
          <Route path="/analyser/*" element={<Analyser />} />
          <Route path="/eximport/*" element={<ExImport />} />
          <Route path="*" element={<StartPage />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
