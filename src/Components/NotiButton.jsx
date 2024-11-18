const NotiButton = () => {
  async function sendNotification() {
    if (window.PushManager) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification("notification title", {
          body: "This is my notification message",
        });
      });
    }
  }

  return (
    <button className="notiButton" type="button" onClick={sendNotification}>
      Send Notification
    </button>
  );
};
export default NotiButton;
