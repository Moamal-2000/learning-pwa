export async function register() {
  if (!"serviceWorker" in navigator) return;

  try {
    navigator.serviceWorker.register("./sw.js");
    // console.log("Registered");
  } catch (err) {
    console.err("Error in registeration", err);
  }
}

async function checkNotificationPermission() {
  const permission = await Notification.requestPermission();

  if (permission === "granted") {
    console.log("Notification allowed");
  } else {
    console.log("Notification is not allowed");
  }
}

checkNotificationPermission()