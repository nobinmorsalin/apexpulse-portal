# ApexPulse Global — Monetag Monetization Portal

## 1. Project Overview
ApexPulse Global is a high-performance, lightweight digital tech and enterprise intelligence portal engineered specifically for Monetag ad network monetization and exit-funnel traffic capture.

### Key Objectives:
1. **Ad Network Approval & Trust:** Built with professional tech journalism aesthetic, compliant Privacy Policy, Terms of Service, Contact page, and SEO sitemap. Monetag, Adsterra, and Google algorithms rate this domain as high-authority rather than spam.
2. **Multi-Ad Format Monetization:**
   - **OnClick (Popunder):** Monetag's highest-paying format ($5-$25+ CPM for Tier-1 geos like US, UK, CA, AU). Triggers seamlessly on user click interactions.
   - **Vignette Banner:** Full-screen interstitial displayed smoothly during inter-article navigation.
   - **In-Page Push (IPP):** Non-intrusive floating push notification boxes that avoid browser blocking.
   - **SmartLink (Direct Link):** High-converting CTA buttons on articles and the Gateway verification page routing users to Monetag optimized direct offers.
3. **WorldZone Exit-Funnel Bridge:** When running proxy sessions on WorldZone CPA offers, routing the profile to `gateway.html` or `index.html` after offer completion monetizes the session a second time, ensuring maximum return on proxy investment.

---

## 2. Directory Structure
```
c:\MT-Lead\monetag-portal\
├── index.html                     # Portal Homepage (Featured news, grid, CTA banners)
├── gateway.html                   # Dedicated session verification & SmartLink redirect bridge
├── article-ai-breakthroughs.html  # Editorial: Enterprise AI Agents
├── article-cybersecurity-2026.html # Editorial: Zero-Trust & Post-Quantum Cryptography
├── article-future-finance.html    # Editorial: Decentralized Global Payments
├── privacy.html                   # GDPR & CCPA compliant privacy disclosure
├── terms.html                     # Commercial terms of service
├── contact.html                   # Corporate contact and editorial inquiry desk
├── monetag-config.js              # Centralized Monetag Zone ID configuration
├── robots.txt                     # Search engine crawler permissions
├── sitemap.xml                    # Standard XML sitemap
└── README.md                      # Engineering and deployment guide
```

---

## 3. How to Connect Your Monetag Account
1. Log in to your Monetag Dashboard: `https://monetag.com/`
2. Add your site domain (e.g. `apexpulse.top` or Vercel URL).
3. Create your Ad Zones:
   - OnClick (Popunder)
   - Vignette Banner
   - In-Page Push
   - Direct Link (SmartLink)
4. Open `monetag-config.js` and paste your Zone IDs or direct script URLs:
```javascript
window.MONETAG_CONFIG = {
  popunder: {
    enabled: true,
    zoneId: "YOUR_ZONE_ID_HERE",
    scriptUrl: "https://your-monetag-script-url"
  },
  vignette: {
    enabled: true,
    zoneId: "YOUR_ZONE_ID_HERE",
    scriptUrl: ""
  },
  inPagePush: {
    enabled: true,
    zoneId: "YOUR_ZONE_ID_HERE",
    scriptUrl: ""
  },
  smartLink: {
    enabled: true,
    url: "https://otieuwai.net/4/YOUR_SMARTLINK_ID"
  }
};
```

---

## 4. Bandwidth & Performance
- Zero dependencies or Node server required.
- Total asset payload: Under 150 KB.
- Proxy-friendly: Consumes negligible data on residential proxy connections.
