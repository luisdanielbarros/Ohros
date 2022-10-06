import { Col, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
const TMTimelineExport = () => {
  const Timeline = useSelector((state) => state.timeline);
  const Export = () => {
    const toExport = {
      Structure: "Timeline",
      Id: Timeline.timelineId,
      Title: Timeline.Timename,
      Summary: Timeline.Summary,
      Description: Timeline.Description,
    };
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(toExport)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = `Timeline, ${Timeline.Timename}.json`;
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
        <h4>Self</h4>
        {/*Id*/}
        <p className="exp-label">Id</p>
        <div className="exp-content">{formatRawText(Timeline.timelineId)}</div>
        {/*Title*/}
        <p className="exp-label">Title</p>
        <div className="exp-content">{formatRawText(Timeline.Timename)}</div>
        {/*Summary*/}
        <p className="exp-label">Summary</p>
        <div className="exp-content">{formatRawText(Timeline.Summary)}</div>
        {/*Description*/}
        <p className="exp-label">Description</p>
        <div className="exp-content">{formatRawText(Timeline.Description)}</div>
      </div>
    </Col>
  );
};
export default TMTimelineExport;
