import { Form } from "react-bootstrap";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
const OceanModel = ({ Config, setConfig }) => {
  const data = [
    {
      Trait: "Openness",
      Value: Config.Openness,
      fullMark: 99,
    },
    {
      Trait: "Conscientiousness",
      Value: Config.Conscientiousness,
      fullMark: 99,
    },
    {
      Trait: "Extraversion",
      Value: Config.Extraversion,
      fullMark: 99,
    },
    {
      Trait: "Agreeableness",
      Value: Config.Agreeableness,
      fullMark: 99,
    },
    {
      Trait: "Neuroticism",
      Value: Config.Neuroticism,
      fullMark: 99,
    },
  ];
  const handleClick = (Trait, Value) => {
    if (Trait === "O") {
      setConfig({
        ...Config,
        Openness: Value,
      });
    } else if (Trait === "C") {
      setConfig({
        ...Config,
        Conscientiousness: Value,
      });
    } else if (Trait === "E") {
      setConfig({
        ...Config,
        Extraversion: Value,
      });
    } else if (Trait === "A") {
      setConfig({
        ...Config,
        Agreeableness: Value,
      });
    } else if (Trait === "N") {
      setConfig({
        ...Config,
        Neuroticism: Value,
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
          <Form.Label>Openness</Form.Label>
          <div>
            <Form.Range
              value={Config.Openness}
              onChange={(e) => handleClick("O", clamp(e.target.value, 0, 99))}
            />
            <Form.Control
              value={Config.Openness}
              onChange={(e) => {
                if (e.target.value === "" || /^[0-9\b]+$/.test(e.target.value))
                  handleClick("O", clamp(e.target.value, 0, 99));
              }}
            />
          </div>
        </div>
        <div>
          <Form.Label>Conscientiousness</Form.Label>
          <div>
            <Form.Range
              value={Config.Conscientiousness}
              onChange={(e) => handleClick("C", clamp(e.target.value, 0, 99))}
            />
            <Form.Control
              value={Config.Conscientiousness}
              onChange={(e) => {
                if (e.target.value === "" || /^[0-9\b]+$/.test(e.target.value))
                  handleClick("C", clamp(e.target.value, 0, 99));
              }}
            />
          </div>
        </div>
        <div>
          <Form.Label>Extraversion</Form.Label>
          <div>
            <Form.Range
              value={Config.Extraversion}
              onChange={(e) => handleClick("E", clamp(e.target.value, 0, 99))}
            />
            <Form.Control
              value={Config.Extraversion}
              onChange={(e) => {
                if (e.target.value === "" || /^[0-9\b]+$/.test(e.target.value))
                  handleClick("E", clamp(e.target.value, 0, 99));
              }}
            />
          </div>
        </div>
        <div>
          <Form.Label>Agreeableness</Form.Label>
          <div>
            <Form.Range
              value={Config.Agreeableness}
              onChange={(e) => handleClick("A", clamp(e.target.value, 0, 99))}
            />
            <Form.Control
              value={Config.Agreeableness}
              onChange={(e) => {
                if (e.target.value === "" || /^[0-9\b]+$/.test(e.target.value))
                  handleClick("A", clamp(e.target.value, 0, 99));
              }}
            />
          </div>
        </div>
        <div>
          <Form.Label>Neuroticism</Form.Label>
          <div>
            <Form.Range
              value={Config.Neuroticism}
              onChange={(e) => handleClick("N", clamp(e.target.value, 0, 99))}
            />
            <Form.Control
              value={Config.Neuroticism}
              onChange={(e) => {
                if (e.target.value === "" || /^[0-9\b]+$/.test(e.target.value))
                  handleClick("N", clamp(e.target.value, 0, 99));
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default OceanModel;
