import { Col, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
const WBCharExport = () => {
  const WB = useSelector((state) => state.worldBuilding);
  const Export = () => {
    let toExport = {};
    if (WB.Type === "Character")
      toExport = {
        Structure: WB.Type,
        Id: WB.wbId,
        Concept: WB.Concept,
        reasonOfConcept: WB.reasonOfConcept,
        Title: WB.Title,
        Summary: WB.Summary,
        Description: WB.Description,
        Cause: WB.Cause,
        Purpose: WB.Purpose,
        Myth: WB.Myth,
        oceanModel: WB.Character.oceanModel,
        jungModel: WB.Character.jungModel,
        Ego: WB.Character.Ego,
        Complexes: WB.Character.Complexes,
        Persona: WB.Character.Persona,
        Anima: WB.Character.Anima,
        Shadow: WB.Character.Shadow,
        Self: WB.Character.Self,
        psychicQuirks: WB.Character.psychicQuirks,
        physicQuirks: WB.Character.physicQuirks,
      };
    else
      toExport = {
        Structure: WB.Type,
        Id: WB.wbId,
        Concept: WB.Concept,
        reasonOfConcept: WB.reasonOfConcept,
        Title: WB.Title,
        Summary: WB.Summary,
        Description: WB.Description,
        Cause: WB.Cause,
        Purpose: WB.Purpose,
        Myth: WB.Myth,
      };
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(toExport)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = `WB, ${WB.Title}.json`;
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
        <h4>Category</h4>
        {/*Type*/}
        <p className="exp-label">Type</p>
        <div className="exp-content">{formatRawText(WB.Type)}</div>
        <h4>Concept</h4>
        {/*Concept*/}
        <p className="exp-label">Concept</p>
        <div className="exp-content">{formatRawText(WB.Concept)}</div>
        {/*Reason of Concept*/}
        <p className="exp-label">Reason of Concept</p>
        <div className="exp-content">{formatRawText(WB.reasonOfConcept)}</div>
        <h4>Basic Information</h4>
        {/*Title*/}
        <p className="exp-label">Title</p>
        <div className="exp-content">{formatRawText(WB.Title)}</div>
        {/*Summary*/}
        <p className="exp-label">Summary</p>
        <div className="exp-content">{formatRawText(WB.Summary)}</div>
        {/*Description*/}
        <p className="exp-label">Description</p>
        <div className="exp-content">{formatRawText(WB.Description)}</div>
        <h4>Reason of Being</h4>
        {/*Cause*/}
        <p className="exp-label">Cause</p>
        <div className="exp-content">{formatRawText(WB.Cause)}</div>
        {/*Purpose*/}
        <p className="exp-label">Purpose</p>
        <div className="exp-content">{formatRawText(WB.Purpose)}</div>
        {/*Myth*/}
        <p className="exp-label">Myth</p>
        <div className="exp-content">{formatRawText(WB.Myth)}</div>
        {WB.Type === "Character" ? (
          <div>
            <h4>Ocean Personality Model</h4>
            {/*OCEAN Model*/}
            <p className="exp-label">OCEAN Model</p>
            <div className="exp-content">
              {formatRawText(
                WB.Character.oceanModel
                  .split(";")
                  .map(
                    (oceanlet, index) =>
                      [
                        "Openness",
                        "Conscientiousness",
                        "Extraversion",
                        "Agreeableness",
                        "Neuroticism",
                      ][index] +
                      ": " +
                      oceanlet +
                      "\n"
                  )
                  .join("")
              )}
            </div>
            <h4>Jung Personality Model</h4>
            {/*Jung Model*/}
            <p className="exp-label">Jungian Model</p>
            <div className="exp-content">
              {formatRawText(
                WB.Character.jungModel
                  .split(";")
                  .map(
                    (junglet, index) =>
                      [
                        "Extraversion",
                        "Thinking",
                        "Feeling",
                        "Intuition",
                        "Sensation",
                      ][index] +
                      ": " +
                      junglet +
                      "\n"
                  )
                  .join("")
              )}
            </div>
            <h4>Consciousness</h4>
            {/*Ego*/}
            <p className="exp-label">Ego</p>
            <div className="exp-content">{formatRawText(WB.Character.Ego)}</div>
            <h4>Personal Unconscious</h4>
            {/*Complexes*/}
            <p className="exp-label">Complexes</p>
            <div className="exp-content">
              {formatRawText(WB.Character.Complexes)}
            </div>
            <h4>Collective Unconscious</h4>
            {/*Persona*/}
            <p className="exp-label">Persona</p>
            <div className="exp-content">
              {formatRawText(WB.Character.Persona)}
            </div>
            {/*Anima*/}
            <p className="exp-label">Anima & Animus</p>
            <div className="exp-content">
              {formatRawText(WB.Character.Anima)}
            </div>
            {/*Shadow*/}
            <p className="exp-label">Shadow</p>
            <div className="exp-content">
              {formatRawText(WB.Character.Shadow)}
            </div>
            {/*Self*/}
            <p className="exp-label">Self</p>
            <div className="exp-content">
              {formatRawText(WB.Character.Self)}
            </div>
            {/*Quirks*/}
            <p className="exp-label">Quirks</p>
            <h2 className="exp-subtitle">Quirks</h2>
            {/*Psychic Quirks*/}
            <p className="exp-label">Psychic Quirks</p>
            <div className="exp-content">
              {formatRawText(WB.Character.psychicQuirks)}
            </div>
            {/*Physic Quirks*/}
            <p className="exp-label">Physic Quirks</p>
            <div className="exp-content">
              {formatRawText(WB.Character.physicQuirks)}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </Col>
  );
};
export default WBCharExport;
