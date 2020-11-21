// Class based Marquee function

class Marquee extends HtmlComponent {
  static MARQUEE_ID = 'marquee';

  constructor(marqueeDiv) {
    super(Marquee.MARQUEE_ID);
    this.marqueeDiv = marqueeDiv;
  }

  async fetch_marquee() {
    const marquee_url = `${BASE_URL}${MARQUEE_URL}`;
    this.stocks = await get_response(marquee_url);
    this.displayMarquee();
  }

  displayMarquee() {
    this.stocks.forEach((element) => {
      const { symbol, price } = element;
      const element_html = `<span class="marquee__div--item">${symbol}: <span>(${price})</span></span>`;
      this.append_html_element(element_html);
    });
  }
}

const newMarquee = new Marquee(marqueeDiv);
newMarquee.fetch_marquee();
