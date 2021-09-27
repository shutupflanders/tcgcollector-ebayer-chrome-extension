'use strict';

chrome.runtime.sendMessage(
  {
    type: 'POKEMONCARDLISTING',
    payload: {
      message: [...document.getElementsByClassName('card-search-result-card')]
          .reduce(function(result, ele, index){
              result.push({
                  ...{"index": index},
                  ...getNameAndNumberFromRow(ele)
              })
              return result
          }, [])
    },
  },
  response => {
      if(chrome.runtime.lastError){
          console.error('[PokEbay][ERROR]', chrome.runtime.lastError);
      }
      else{
          console.info(`[PokEbay][INFO] ${response.message.length} listings parsed and available to search.`)
          parseResults(response.message)
      }
  }
);

function getNameAndNumberFromRow(rowElement){
    let resp = {
        "name": rowElement.getElementsByClassName('card-list-item-card-name')[0]?.getElementsByClassName('card-list-item-entry-text')[0]?.innerHTML.replace(/^\s+|\s+$/g, ''),
        "number": rowElement.getElementsByClassName('card-list-item-card-number')[0]?.getElementsByClassName('card-list-item-entry-text')[0]?.innerHTML.replace(/^\s+|\s+$/g, ''),
    }
    return resp
}

function parseResults(results){
    const header = document.getElementById('card-list-header')
    const newHeaderItem = document.createElement('div');
    newHeaderItem.innerHTML = "eBay";
    newHeaderItem.className = "card-list-item-entry"
    header.children[0].appendChild(newHeaderItem)
    const elements = document.getElementsByClassName('card-search-result-card');
    results.map(function(item){
        let matchingElement = elements[(item.index)];

        const div = document.createElement('div')
        const link = document.createElement('a')
        const ebayIcon = document.createElement('img')
        ebayIcon.style.width = "24px";
        ebayIcon.src = "https://cdn-icons-png.flaticon.com/64/196/196552.png";
        ebayIcon.title = "Find this card on eBay!"

        link.style.paddingLeft = "1rem";
        link.style.paddingRight = "1rem";

        link.appendChild(ebayIcon)

        if(matchingElement){
            link.href = item.search_url
            link.target = "_blank"
            div.appendChild(link)
            matchingElement.appendChild(div)
        }
    })
}
