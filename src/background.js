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
  const searchUrl = await getSearchUrl()
  return searchUrl.api_url+"/sch/i.html?_from=R40&_nkw="+name+"+"+number+"&_sacat=0&rt=nc&LH_All=1"
}

function getSearchUrl(){
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.sync.get("api_url", function (value) {
        resolve(value);
      })
    }
    catch (ex) {
      reject(ex);
    }
  });
}