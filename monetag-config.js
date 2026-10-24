/*
 * ApexPulse Global - Monetag Ad Network Configuration
 * Centralized ad management script for Popunder, Vignette, In-Page Push, and SmartLink.
 */

window.MONETAG_CONFIG = {
  // 1. OnClick (Popunder) Ad Settings
  popunder: {
    enabled: true,
    zoneId: "REPLACE_WITH_POPUNDER_ZONE_ID",
    scriptUrl: "" // Optional full script URL provided by Monetag
  },

  // 2. Vignette Banner (Interstitial between pages)
  vignette: {
    enabled: true,
    zoneId: "REPLACE_WITH_VIGNETTE_ZONE_ID",
    scriptUrl: ""
  },

  // 3. In-Page Push (Native floating alert)
  inPagePush: {
    enabled: true,
    zoneId: "REPLACE_WITH_INPAGE_PUSH_ZONE_ID",
    scriptUrl: ""
  },

  // 4. SmartLink (Direct Link for CTA buttons and redirect gates)
  smartLink: {
    enabled: true,
    url: "https://example.com/monetag-smartlink-direct" // Replace with your Monetag Direct Link
  }
};

// Injection helper function
(function () {
  const config = window.MONETAG_CONFIG;

  function loadExternalScript(url) {
    if (!url || url.indexOf("REPLACE_") !== -1) return;
    const script = document.createElement("script");
    script.src = url;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }

  // Load configured Monetag tags if URLs are populated
  if (config.popunder.enabled && config.popunder.scriptUrl) {
    loadExternalScript(config.popunder.scriptUrl);
  }

  if (config.vignette.enabled && config.vignette.scriptUrl) {
    loadExternalScript(config.vignette.scriptUrl);
  }

  if (config.inPagePush.enabled && config.inPagePush.scriptUrl) {
    loadExternalScript(config.inPagePush.scriptUrl);
  }

  // Handle SmartLink click triggers
  document.addEventListener("DOMContentLoaded", function () {
    const smartLinkButtons = document.querySelectorAll("[data-monetag-smartlink]");
    smartLinkButtons.forEach(function (button) {
      button.addEventListener("click", function (event) {
        if (config.smartLink.enabled && config.smartLink.url && config.smartLink.url.indexOf("example.com") === -1) {
          event.preventDefault();
          window.open(config.smartLink.url, "_blank", "noopener,noreferrer");
        }
      });
    });
  });
})();
