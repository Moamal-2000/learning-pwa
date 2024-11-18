import { sendNotification } from "../Functions/pwa/notifiction";

const NotiButton = () => {
  return (
    <button
      className="notiButton"
      type="button"
      onClick={() =>
        sendNotification(
          "This is my notification title",
          "This is my notification message"
        )
      }
    >
      Send Notification
    </button>
  );
};
export default NotiButton;
