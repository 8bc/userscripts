// ==UserScript==
// @name         SharePoint View Only Redirect
// @namespace    http://tampermonkey.net/
// @version      2025-05-15
// @description  Force SharePoint and M365 documents to open in View Only mode, based on Chrome Extension “SPO Extension”
// @author       Bob Cechacek
// @match        https://*.sharepoint.com/*sourcedoc=*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function () {
    'use strict';

    const currentUrl = window.location.href;

    if (!currentUrl.includes('Action=View')) {
        const re1 = /(action=.*?(&|$))/i;
        const re2 = /(mobileredirect=.*?(&|$))/i;
        const re3 = /&$/;

        let url1 = currentUrl.replace(re1, '');
        let url2 = url1.replace(re2, '');
        let url3 = url2.replace(re3, '');

        // Append read-only parameters
        let separator = url3.includes('?') ? '&' : '?';
        let newUrl = url3 + separator + 'DefaultItemOpen=1&Action=View';

        if (newUrl !== currentUrl) {
            window.location.replace(newUrl);
        }
    }
})();
