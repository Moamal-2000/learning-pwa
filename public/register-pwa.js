export async function register() {
  const isServicerWorkerSupported = "serviceWorker" in navigator;
  if (!isServicerWorkerSupported) return;

  try {
    const register = await navigator.serviceWorker.register("sw.js");
    console.log("Registered", register);
  } catch (err) {
    console.error("Error PWA", err);
  }
}
