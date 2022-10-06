import { Col, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
const TMActionExport = () => {
  const Timeline = useSelector((state) => state.timeline);
  const Arc = useSelector((state) => state.arc);
  const Act = useSelector((state) => state.act);
  const Action = useSelector((state) => state.action);
  const Export = () => {
    const toExport = {
      Structure: "Action",
      Timeline: Timeline.Timename,
      Arc: Arc.Arcname,
      Act: Act.Actname,
      arcTime: Arc.Time,
      actTime: Act.Time,
      actionTime: Action.Time,
      Id: Action.actionId,
      Title: Action.Actionname,
      Summary: Action.Summary,
      Description: Action.Description,
      Bookmarks: Action.Bookmarks,
      WBs: Action.WBs,
      Arguments: Action.Arguments,
    };
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(toExport)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = `${Arc.Time}-${Act.Time}-${Action.Time} Action, ${Action.Actionname}.json`;
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
        {/*Act*/}
        <p className="exp-label">Act</p>
        <div className="exp-content">{formatRawText(Act.Actname)}</div>
        <h4>Time</h4>
        {/*Arc Time*/}
        <p className="exp-label">Arc Time</p>
        <div className="exp-content">{formatRawText(Arc.Time)}</div>
        {/*Act Time*/}
        <p className="exp-label">Act Time</p>
        <div className="exp-content">{formatRawText(Act.Time)}</div>
        {/*Action Time*/}
        <p className="exp-label">Action Time</p>
        <div className="exp-content">{formatRawText(Action.Time)}</div>
        <h4>Self</h4>
        {/*Id*/}
        <p className="exp-label">Id</p>
        <div className="exp-content">{formatRawText(Action.actionId)}</div>
        {/*Title*/}
        <p className="exp-label">Title</p>
        <div className="exp-content">{formatRawText(Action.Actionname)}</div>
        {/*Summary*/}
        <p className="exp-label">Summary</p>
        <div className="exp-content">{formatRawText(Action.Summary)}</div>
        {/*Description*/}
        <p className="exp-label">Description</p>
        <div className="exp-content">{formatRawText(Action.Description)}</div>
        <h4>Relations</h4>
        {/*Bookmarks*/}
        <p className="exp-label">Bookmarks</p>
        <div className="exp-content">
          {formatRawText(Action.Bookmarks.replace(",,", "\n"))}
        </div>
        {/*WBs*/}
        <p className="exp-label">World-Building Ideas</p>
        <div className="exp-content">
          {formatRawText(Action.WBs.replace(",,", "\n"))}
        </div>
        {/*Arguments*/}
        <p className="exp-label">Arguments</p>
        <div className="exp-content">
          {formatRawText(Action.Arguments.replace(",,", "\n"))}
        </div>
      </div>
    </Col>
  );
};
export default TMActionExport;
