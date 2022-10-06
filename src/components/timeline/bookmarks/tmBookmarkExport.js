import { Col, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
const TMBookmarkExport = () => {
  const Bookmark = useSelector((state) => state.bookmark);
  console.log("Bookmark");
  console.log(Bookmark);
  const Export = () => {
    const toExport = {
      Structure: "Bookmark",
      Id: Bookmark.bookmarkId,
      Title: Bookmark.Bookmarkname,
      Summary: Bookmark.Summary,
      Description: Bookmark.Description,
    };
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(toExport)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = `Bookmark, ${Bookmark.Bookmarkname}.json`;
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
        <div className="exp-content">{formatRawText(Bookmark.bookmarkId)}</div>
        {/*Title*/}
        <p className="exp-label">Title</p>
        <div className="exp-content">
          {formatRawText(Bookmark.Bookmarkname)}
        </div>
        {/*Summary*/}
        <p className="exp-label">Summary</p>
        <div className="exp-content">{formatRawText(Bookmark.Summary)}</div>
        {/*Description*/}
        <p className="exp-label">Description</p>
        <div className="exp-content">{formatRawText(Bookmark.Description)}</div>
      </div>
    </Col>
  );
};
export default TMBookmarkExport;
