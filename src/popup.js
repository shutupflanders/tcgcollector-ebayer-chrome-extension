'use strict';

import './popup.css';

document.body.onload = function() {
    chrome.storage.sync.get({"api_url": "https://www.ebay.co.uk"}, function(items) {
        console.log('get');
        if (!chrome.runtime.error) {
            console.info('GET: ',items);
            document.getElementById("api-url").value = items.api_url;
        }
    });
}

document.getElementById("save").onclick = function() {
    var d = document.getElementById("api-url").value;
    chrome.storage.sync.set({ "api_url" : d }, function() {
        if (chrome.runtime.error) {
            console.error("Runtime error.");
            return;
        }
        const status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
};