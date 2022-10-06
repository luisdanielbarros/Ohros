import { useSelector, useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { notificationActions } from "../store/notificationSlice";
const MessageModal = () => {
  const Notifications = useSelector(
    (state) => state.notifications.notifications
  );
  const Show = Notifications.length > 0;
  const Title = Show ? Notifications[0].Title : "";
  const Message = Show ? Notifications[0].Message : "";
  const closeButton = Show ? Notifications[0].closeButton : "";
  const dispatch = useDispatch();
  return (
    <Modal show={Show} centered animation={false}>
      <Modal.Header>
        <Modal.Title>{Title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{Message}</Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={() => dispatch(notificationActions.close())}
        >
          {closeButton}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default MessageModal;
