import { Col, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
const TMArcExport = () => {
  const Timeline = useSelector((state) => state.timeline);
  const Arc = useSelector((state) => state.arc);
  const Export = () => {
    const toExport = {
      Structure: "Arc",
      Timeline: Timeline.Timename,
      arcTime: Arc.Time,
      Id: Arc.arcId,
      Title: Arc.Arcname,
      Summary: Arc.Summary,
      Description: Arc.Description,
    };
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(toExport)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = `${Arc.Time}-0-0 Arc, ${Arc.Arcname}.json`;
    link.click();
  };
  const formatRawText = (rawText) => {
    if (!rawText) return <p></p>;
    return String(rawText)
      .split("\n")
      .map((text, index) => <p key={index}>{text}</p>);
  };
  return (
    <Col md="12" className="exp">
      <div className="exp-controls">
        <Button variant="light" onClick={() => Export()}>
          Export
        </Button>
      </div>
      <div className="exp-container">
        <h4>Parents</h4>
        {/*Timeline*/}
        <p className="exp-label">Timeline</p>
        <div className="exp-content">{formatRawText(Timeline.Timename)}</div>
        <h4>Time</h4>
        {/*Arc Time*/}
        <p className="exp-label">Arc Time</p>
        <div className="exp-content">{formatRawText(Arc.Time)}</div>
        <h4>Self</h4>
        {/*Id*/}
        <p className="exp-label">Id</p>
        <div className="exp-content">{formatRawText(Arc.arcId)}</div>
        {/*Title*/}
        <p className="exp-label">Title</p>
        <div className="exp-content">{formatRawText(Arc.Arcname)}</div>
        {/*Summary*/}
        <p className="exp-label">Summary</p>
        <div className="exp-content">{formatRawText(Arc.Summary)}</div>
        {/*Description*/}
        <p className="exp-label">Description</p>
        <div className="exp-content">{formatRawText(Arc.Description)}</div>
      </div>
    </Col>
  );
};
export default TMArcExport;
