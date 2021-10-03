'use strict';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'POKEMONCARDLISTING' && request.payload.message.length) {
    const lookup = async (request, sender, sendResponse) => {
      return request.payload.message.reduce(async function (previousPromise, ele) {
        let jobsArray = await previousPromise;
          jobsArray.push({
            "index": ele.index,
            "name": ele.name,
            "number": ele.number,
            "search_url": await generateSearchUrl(ele.name, ele.number)
          })
        return jobsArray;
      }, Promise.resolve([]));
    }

    lookup(request)
        .then(results => sendResponse({message: results}));
  }
  return true;
});

async function generateSearchUrl(name, number){
  const listing_types = {
    "all": "All",
    "accepts_offers": "BO",
    "auction": "Auction",
    "buy_it_now": "BIN"
  }

  const sort_orders = {
    "best_match": "12",
    "lowest_price": "15",
    "highest_price": "16",
    "newly_listed": "10",
    "ending_soonest": "1",
    "nearest_first": "7"

  }

  const su = await getStoredValue("api_url")
  const lt = await getStoredValue("listing_type")
  const so = await getStoredValue("sort_order")

  return `${su.api_url}/sch/i.html?_from=R40&_nkw=${name}+${number}&_sacat=0&rt=nc&LH_${listing_types[lt.listing_type]}=1&_sop=${sort_orders[so.sort_order]}`
}

function getStoredValue(key){
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.sync.get(key, function (value) {
        resolve(value);
      })
    }
    catch (ex) {
      reject(ex);
    }
  });
}