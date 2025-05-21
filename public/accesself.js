(function () {
  let apiKey = null;
  const backendUrl = "https://accesself.co.za/php/api/track.php";

  function sendToBackend(url, isFirstVisit = false) {
    if (!apiKey) {
      console.warn("API key not set. Skipping send.");
      return;
    }

    let page = "";
    let id = "";

    if (!isFirstVisit) {
      page = url.split("/").pop();

      const match = url.match(/^(.*)\/([^\/]+)$/);
      if (match) {
        page = match[1];
        id = match[2];
      }
    }

    fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        page: page,
        id: id,
        domain: window.location.hostname,
        timestamp: new Date().toISOString(),
      }),
    }).catch((err) => console.error("Tracking error:", err));
  }

  function trackUrlChange() {
    sendToBackend(window.location.href);
  }

  function checkFirstVisit() {
    const firstVisitKey = "accessElfSessionFirstVisit";
    if (!sessionStorage.getItem(firstVisitKey)) {
      // First visit detected
      sendToBackend("", true);
      sessionStorage.setItem(firstVisitKey, "true");
    }
  }

  // Monkey-patch pushState and replaceState
  const originalPushState = history.pushState;
  history.pushState = function () {
    originalPushState.apply(this, arguments);
    trackUrlChange();
  };

  const originalReplaceState = history.replaceState;
  history.replaceState = function () {
    originalReplaceState.apply(this, arguments);
    trackUrlChange();
  };

  window.addEventListener("popstate", trackUrlChange);
  window.addEventListener("hashchange", trackUrlChange);

  // API exposure
  window.AccessElf = {
    setApiKey: function (key) {
      apiKey = key;
      console.log("Tracker API key set.");
    },
    sendNow: function () {
      trackUrlChange();
    },
  };

  // Initial load
  checkFirstVisit();
  trackUrlChange();
})();

/* DOCUMENTATION

<script src="http://accesself.co.za/accesself.js"></script>
<script>
  // Set your API key once loaded
  AccessElf.setApiKey('YOUR_API_KEY_HERE');
</script>

*/
