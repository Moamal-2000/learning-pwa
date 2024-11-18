export async function sendNotification(title, body) {
  if (!window.PushManager) return;

  const registration = await navigator.serviceWorker.ready;
  registration.showNotification(title, { body });
}
