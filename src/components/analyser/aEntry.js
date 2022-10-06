import { Card } from "react-bootstrap";
const AEntry = ({ Id, Title, Description }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{Title}</Card.Title>
        <Card.Text>{Description}</Card.Text>
      </Card.Body>
    </Card>
  );
};
export default AEntry;
