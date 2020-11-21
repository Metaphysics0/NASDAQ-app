class SearchResults extends HtmlComponent {
  static SEARCH_RESULTS_ID = 'result_list';

  constructor() {
    super(SearchResults.SEARCH_RESULTS_ID);
  }

  // Display keywords
  async displayResults(stocks) {
    await stocks.forEach((element, index) => {
      const { name, symbol, change } = element;
      const element_html = `<li class="result__list--item" id="resultListItems">
            <a href="/company.html?symbol=${symbol}">
              <div class="link-container">
                  <img src="https://financialmodelingprep.com/image-stock/${symbol}.png"
                      onerror="this.onerror=null;this.src='https://financialmodelingprep.com/image-stock/PEER.jpg'">
                  <span class="result__list--item-text" id="itemText">${name} (${symbol})</span>
              </div>
            </a>
              <div class="change-container">
                <span id="priceChange" class="result__list--item-change ${change < 0 ? 'red' : ''}">
                (${change})
                </span>
                <button class="result__list--item-button" type="button" value="${symbol}" id="compareButton">Compare</button>
              </div>
        </li>`;
      this.append_html_element(element_html);

      // Highlight searched keywords
      this.highlight_html_element(
        searchInput.value,
        document.getElementsByClassName('result__list--item-text')[index]
      );

      // Adds symbol to compare list
      document.querySelectorAll('.result__list--item-button').forEach((item, index) => {
        item.addEventListener('click', (event) => {
          compareList.innerHTML += `<li class="compare__list-item" id="compareItem">${stocks[index].symbol}</li>`;
        });
      });

      let compares = document.querySelectorAll('.compare__list-item');
    });
    compareBtn.addEventListener('click', (event) => {
      console.log(compareList.innerHTML);
    });
  }
}

const search_results = new SearchResults();
