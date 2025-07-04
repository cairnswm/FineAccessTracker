(function () {
  let apiKey = null;
  const backendUrl = "https://accesself.co.za/php/api/track.php";
  const bulkUrl = "https://accesself.co.za/php/api/bulk.php";
  let bulk = true;
  let bulkData = [];
  let bulkTimer = null;

  function sendToBackend(url, isFirstVisit = false) {
    let page = "";
    let id = "";

    if (!isFirstVisit) {
      const urlObj = new URL(url);
      const pathSegments = urlObj.pathname.split("/").filter(segment => segment);

      if (pathSegments.length === 1) {
        page = pathSegments[0];
      } else if (pathSegments.length === 2) {
        page = pathSegments[0];
        id = pathSegments[1];
      } else if (pathSegments.length > 2) {
        id = pathSegments.pop();
        page = pathSegments.pop();
      }
    }

    const headers = {
      "Content-Type": "application/json",
    };
    if (apiKey && apiKey.length > 0 && apiKey !== "undefined" && apiKey !== "null") {
      headers.Authorization = `Bearer ${apiKey}`;
    }

    const body = {
      page: page,
      id: id,
      domain: window.location.hostname,
      timestamp: new Date().toISOString(),
    };

    if (bulk) {
      bulkData.push(body);

      // Always restart the timer when new data is added
      if (bulkTimer) {
        clearTimeout(bulkTimer);
      }
      bulkTimer = setTimeout(() => {
        sendBulkData();
      }, 6000); // 6 seconds

      if (bulkData.length >= 50) {
        sendBulkData();
      }
    } else {
      fetch(backendUrl, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }).catch((err) => console.error("Tracking error:", err));
    }
  }

  function sendBulkData() {
    if (bulkData.length === 0) return;

    const headers = {
      "Content-Type": "application/json",
    };
    if (apiKey && apiKey.length > 0 && apiKey !== "undefined" && apiKey !== "null") {
      headers.Authorization = `Bearer ${apiKey}`;
    }

    fetch(bulkUrl, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ data: bulkData }),
    }).catch((err) => console.error("Bulk tracking error:", err));

    bulkData = [];
    clearTimeout(bulkTimer); // Stop the timer when bulk data is sent
    bulkTimer = null;
  }

  function trackUrlChange() {
    sendToBackend(window.location.href);
  }

  function checkFirstVisit() {
    const firstVisitKey = "accessElfSessionFirstVisit";
    if (!sessionStorage.getItem(firstVisitKey)) {
      sendToBackend("", true);
      sessionStorage.setItem(firstVisitKey, "true");
    }
  }

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

  window.AccessElf = {
    setApiKey: function (key) {
      apiKey = key;
      console.log("Tracker API key set.");
    },
    sendNow: function () {
      trackUrlChange();
    },
    setBulk: function (isBulk) {
      bulk = isBulk;
      console.log(`Bulk mode set to ${bulk}`);
    },
  };

  function getLocationData(ip = null) {
    const placeUrl = `https://accesself.co.za/php/api/place.php${ip ? `?ip=${ip}` : ''}`;

    return fetch(placeUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch location data");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Location data fetched:", data);
        return data;
      })
      .catch((error) => {
        console.error("Error fetching location data:", error);
        return null;
      });
  }

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
