import { Form } from "react-bootstrap";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
const JungModel = ({ Config, setConfig }) => {
  const data = [
    {
      Trait: "Extraversion",
      Value: Config.aTExtraversion,
      fullMark: 99,
    },
    {
      Trait: "Thinking",
      Value: Config.fTThinking,
      fullMark: 99,
    },
    {
      Trait: "Feeling",
      Value: Config.fTFeeling,
      fullMark: 99,
    },
    {
      Trait: "Intuition",
      Value: Config.fTIntuition,
      fullMark: 99,
    },
    {
      Trait: "Sensation",
      Value: Config.fTSensation,
      fullMark: 99,
    },
  ];
  const handleClick = (Trait, Value) => {
    if (Trait === "E") {
      setConfig({
        ...Config,
        aTExtraversion: Value,
      });
    } else if (Trait === "T") {
      setConfig({
        ...Config,
        fTThinking: Value,
      });
    } else if (Trait === "F") {
      setConfig({
        ...Config,
        fTFeeling: Value,
      });
    } else if (Trait === "I") {
      setConfig({
        ...Config,
        fTIntuition: Value,
      });
    } else if (Trait === "S") {
      setConfig({
        ...Config,
        fTSensation: Value,
      });
    }
  };
  const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
  return (
    <div className="form-attribute-oceanmodel">
      <RadarChart cx="50%" cy="50%" width={1024} height={1024} data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="Trait" />
        <PolarRadiusAxis />
        <Radar
          name="Traits"
          dataKey="Value"
          stroke="#fa8072"
          fill="#fa8072"
          fillOpacity={0.5}
        />
      </RadarChart>
      <div className="controls">
        <div>
          <Form.Label>Extraversion</Form.Label>
          <div>
            <Form.Range
              value={Config.aTExtraversion}
              onChange={(e) => handleClick("E", clamp(e.target.value, 0, 99))}
            />
            <Form.Control
              value={Config.aTExtraversion}
              onChange={(e) => {
                if (e.target.value === "" || /^[0-9\b]+$/.test(e.target.value))
                  handleClick("E", clamp(e.target.value, 0, 99));
              }}
            />
          </div>
        </div>
        <div>
          <Form.Label>Thinking</Form.Label>
          <div>
            <Form.Range
              value={Config.fTThinking}
              onChange={(e) => handleClick("T", clamp(e.target.value, 0, 99))}
            />
            <Form.Control
              value={Config.fTThinking}
              onChange={(e) => {
                if (e.target.value === "" || /^[0-9\b]+$/.test(e.target.value))
                  handleClick("T", clamp(e.target.value, 0, 99));
              }}
            />
          </div>
        </div>
        <div>
          <Form.Label>Feeling</Form.Label>
          <div>
            <Form.Range
              value={Config.fTFeeling}
              onChange={(e) => handleClick("F", clamp(e.target.value, 0, 99))}
            />
            <Form.Control
              value={Config.fTFeeling}
              onChange={(e) => {
                if (e.target.value === "" || /^[0-9\b]+$/.test(e.target.value))
                  handleClick("F", clamp(e.target.value, 0, 99));
              }}
            />
          </div>
        </div>
        <div>
          <Form.Label>Intuition</Form.Label>
          <div>
            <Form.Range
              value={Config.fTIntuition}
              onChange={(e) => handleClick("I", clamp(e.target.value, 0, 99))}
            />
            <Form.Control
              value={Config.fTIntuition}
              onChange={(e) => {
                if (e.target.value === "" || /^[0-9\b]+$/.test(e.target.value))
                  handleClick("I", clamp(e.target.value, 0, 99));
              }}
            />
          </div>
        </div>
        <div>
          <Form.Label>Sensation</Form.Label>
          <div>
            <Form.Range
              value={Config.fTSensation}
              onChange={(e) => handleClick("S", clamp(e.target.value, 0, 99))}
            />
            <Form.Control
              value={Config.fTSensation}
              onChange={(e) => {
                if (e.target.value === "" || /^[0-9\b]+$/.test(e.target.value))
                  handleClick("S", clamp(e.target.value, 0, 99));
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default JungModel;
