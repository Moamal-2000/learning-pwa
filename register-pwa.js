export async function register() {
  const isServicerWorkerSupported = "serviceWorker" in navigator;
  if (!isServicerWorkerSupported) return;

  try {
    navigator.serviceWorker.register("./sw.js");
  } catch (err) {
    console.error("Error PWA", err);
  }
}
