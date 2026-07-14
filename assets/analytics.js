/* FooCorp landing pages — single-source analytics (GA4, free tier).
 *
 * The GA4 Measurement ID lives in exactly ONE place (MEASUREMENT_ID below).
 * This file injects the gtag loader itself, so no per-page script tag needs the ID.
 * See ../aso-seo-measurement/WEB_ANALYTICS_SETUP.md for the activation checklist.
 *
 * To go live: replace G-XXXXXXXXXX with the real Measurement ID from the GA4 property.
 * Until then this is a safe no-op (it will not load a bogus property).
 */
(function () {
  var MEASUREMENT_ID = 'G-XXXXXXXXXX'; // <-- replace on activation (single source of truth)

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };

  if (MEASUREMENT_ID && MEASUREMENT_ID.indexOf('XXXX') === -1) {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + MEASUREMENT_ID;
    document.head.appendChild(s);
    gtag('js', new Date());
    gtag('config', MEASUREMENT_ID);
  }

  /* Fire a conversion event when a visitor clicks through to the App Store.
     Wire on CTAs with: onclick="trackAppStoreClick('6773810494')" */
  window.trackAppStoreClick = function (appId) {
    gtag('event', 'app_store_click', { app_id: appId });
    return true; // never block navigation
  };
})();
