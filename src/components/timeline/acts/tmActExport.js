import { Col, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
const TMActExport = () => {
  const Timeline = useSelector((state) => state.timeline);
  const Arc = useSelector((state) => state.arc);
  const Act = useSelector((state) => state.act);
  const Export = () => {
    const toExport = {
      Structure: "Act",
      Timeline: Timeline.Timename,
      Arc: Arc.Arcname,
      arcTime: Arc.Time,
      actTime: Act.Time,
      Id: Act.actId,
      Title: Act.Actname,
      Summary: Act.Summary,
      Description: Act.Description,
    };
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(toExport)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = `${Arc.Time}-${Act.Time}-0 Act, ${Act.Actname}.json`;
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
        {/*Arc*/}
        <p className="exp-label">Arc</p>
        <div className="exp-content">{formatRawText(Arc.Arcname)}</div>
        <h4>Time</h4>
        {/*Arc Time*/}
        <p className="exp-label">Arc Time</p>
        <div className="exp-content">{formatRawText(Arc.Time)}</div>
        {/*Act Time*/}
        <p className="exp-label">Act Time</p>
        <div className="exp-content">{formatRawText(Act.Time)}</div>
        <h4>Self</h4>
        {/*Id*/}
        <p className="exp-label">Id</p>
        <div className="exp-content">{formatRawText(Act.actId)}</div>
        {/*Title*/}
        <p className="exp-label">Title</p>
        <div className="exp-content">{formatRawText(Act.Actname)}</div>
        {/*Summary*/}
        <p className="exp-label">Summary</p>
        <div className="exp-content">{formatRawText(Act.Summary)}</div>
        {/*Description*/}
        <p className="exp-label">Description</p>
        <div className="exp-content">{formatRawText(Act.Description)}</div>
      </div>
    </Col>
  );
};
export default TMActExport;
