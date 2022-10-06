import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { useDrag } from "react-dnd";
const Draggable = ({ Type, Id, Time, Title, Summary, Open }) => {
  const arcId = useSelector((state) => state.arc.arcId);
  const actId = useSelector((state) => state.act.actId);
  const actionId = useSelector((state) => state.action.actionId);
  //DnD
  const [{ isDragging }, Drag] = useDrag(() => ({
    type: "image",
    item: { Id, Time, Title, Summary },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  }));
  //JSX
  return (
    <div
      key={Id}
      ref={Type === `Analysis` ? undefined : Drag}
      className={
        (Type === `Arc` && arcId === Id) ||
        (Type === `Act` && actId === Id) ||
        (Type === `Action` && actionId === Id)
          ? `dnd-item active`
          : `dnd-item`
      }
    >
      <b>(Time: {Time})</b>
      <h5>{Title}</h5>
      <p>{Summary}</p>
      {(Type === `Arc` && arcId === Id) ||
      (Type === `Act` && actId === Id) ||
      (Type === `Action` && actionId === Id) ||
      Type === `Analysis` ? (
        <></>
      ) : (
        <Button
          variant="light"
          onClick={() => Open({ Id, Time, Title, Summary })}
        >
          Open
        </Button>
      )}
    </div>
  );
};
export default Draggable;
