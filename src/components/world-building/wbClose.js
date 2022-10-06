import { Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { worldBuildingActions } from "../store/worldBuildingSlice";
const WBClose = () => {
  const dispatch = useDispatch();
  const Id = useSelector((state) => state.worldBuilding.Id);
  if (Id === 0 || Id === undefined)
    return (
      <Col md="10">
        <h2>You must select an idea first.</h2>
      </Col>
    );
  return (
    <Col md="12" className="wb-close">
      <div>
        <h2>Close World Building Idea</h2>
        <Button
          variant="light"
          onClick={() => dispatch(worldBuildingActions.close({}))}
        >
          Close
        </Button>
      </div>
    </Col>
  );
};
export default WBClose;
