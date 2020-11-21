class SearchForm extends HtmlComponent {
  static SEARCH_BUTTON_ID = 'search_button';
  static SEARCH_BUTTON_CLASS = 'search__button';

  static SEARCH_FORM_ID = 'search_form';
  static SEARCH_INPUT_ID = 'searchInput';
  static SEARCH_INPUT_CLASS = 'search__input';

  static LOADING_MESSAGE = 'Loading...';
  static SEARCH_MESSAGE = 'SEARCH';

  constructor(search_results) {
    super(SearchForm.SEARCH_FORM_ID);
    this.search_results = search_results;
    this.create_input();
    this.create_button();
  }

  create_input() {
    // <input class="search__input" id="searchInput" type="text" placeholder="Search for a stock!">
    let input_element = document.createElement('input');
    input_element.setAttribute(HtmlComponent.CLASS, SearchForm.SEARCH_INPUT_CLASS);
    input_element.setAttribute(HtmlComponent.ID, SearchForm.SEARCH_INPUT_ID);
    input_element.setAttribute(HtmlComponent.QUALIFIED_NAME, 'Search for a stock!');
    input_element.setAttribute(HtmlComponent.TYPE, 'text');

    this.html_element.appendChild(input_element);

    this.input = input_element;
  }

  create_button() {
    // <button class="search__button" id="searchButton">Search</button>
    let button_element = document.createElement('button');
    button_element.setAttribute(HtmlComponent.CLASS, SearchForm.SEARCH_BUTTON_CLASS);
    button_element.setAttribute(HtmlComponent.ID, SearchForm.SEARCH_BUTTON_ID);
    button_element.addEventListener('click', this.fetch_results.bind(this));

    this.html_element.appendChild(button_element);

    this.button = new HtmlComponent(SearchForm.SEARCH_BUTTON_ID);
    this.button.set_inner_html('Search');
  }

  async fetch_results() {
    this.search_results.reset_inner_html();
    this.button.set_inner_html(SearchForm.LOADING_MESSAGE);

    let endpoint_url = `search?query=${this.input.value}&limit=10&exchange=NASDAQ`;
    const full_url = `${BASE_URL}${endpoint_url}`;
    let stocks = await get_response(full_url);

    // create a string of symbols for batch fetch request.
    const symbols = stocks.map((element) => element.symbol).join(',');
    const changes_url = `${BASE_URL}/quote/${symbols}`;
    const changes_response = await get_response(changes_url);

    this.button.set_inner_html(SearchForm.SEARCH_MESSAGE);

    // Adds the price change to the first response object
    stocks.forEach((stock) => {
      const stock_with_change = changes_response.find((element) => element.symbol === stock.symbol);
      stock.change = stock_with_change.change;
    });

    await this.search_results.displayResults(stocks);
    console.log(stocks);
  }
}

const search_form = new SearchForm(search_results);
