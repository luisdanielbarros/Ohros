import Draggable from "./Draggable";
import { useDrop } from "react-dnd";
const Droppable = ({ Type, contentList, onDrop, onOpen }) => {
  //DnD
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "image",
    drop: (item) => onDrop(item, item.Time, contentList.Time),
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  }));
  //JSX
  const JSXDropList = () => {
    if (
      contentList === undefined ||
      contentList.contentList === undefined ||
      !contentList.contentList.length
    )
      return <></>;
    else {
      return contentList.contentList.map((Content) => (
        <Draggable
          key={Content.Id}
          Type={Type}
          Id={Content.Id}
          Time={Content.Time}
          Title={Content.Title}
          Summary={Content.Summary}
          Open={onOpen}
        />
      ));
    }
  };
  return (
    <div className="dnd-droparea" ref={drop}>
      {JSXDropList()}
    </div>
  );
};
export default Droppable;
