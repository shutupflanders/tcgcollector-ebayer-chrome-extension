'use strict';

import './popup.css';

document.body.onload = function() {
    chrome.storage.sync.get({
        "api_url": "https://www.ebay.co.uk",
        "listing_type" : "all",
        "sort_order" : "best_match"
    }, function(items) {
        if (!chrome.runtime.error) {
            console.info('GET: ',items);
            document.getElementById("api-url").value = items.api_url;
            document.getElementById("listing-type").value = items.listing_type;
            document.getElementById("sort-order").value = items.sort_order;
        }
    });
}

document.getElementById("save").onclick = function() {
    const url = document.getElementById("api-url").value;
    const listingType = document.getElementById("listing-type").value;
    const sortOrder = document.getElementById("sort-order").value;
    chrome.storage.sync.set({
        "api_url" : url,
        "listing_type" : listingType,
        "sort_order" : sortOrder
    }, function() {
        if (chrome.runtime.error) {
            console.error("Runtime error.");
            return;
        }
        const status = document.getElementById('status');
        status.textContent = 'Options saved, please refresh the page.';
        setTimeout(function() {
            status.textContent = '';
        }, 2000);
    });
};