class HtmlComponent {
  static CLASS = 'class';
  static ID = 'id';
  static QUALIFIED_NAME = 'placeholder';
  static TYPE = 'type';

  constructor(id) {
    this.id = id;
    this.html_element = document.getElementById(this.id);
  }

  reset_inner_html() {
    this.html_element.innerHTML = '';
  }

  set_inner_html(value) {
    this.html_element.innerHTML = value;
  }

  append_html_element(value) {
    this.html_element.innerHTML += value;
  }

  append_html_element2(value, element) {
    value += element;
  }

  get_element_value(value) {
    this.html_element.value = value;
  }

  highlight_html_element(text, element) {
    let innerHTML = element.innerHTML;
    let lowerInnerHTML = innerHTML;
    lowerInnerHTML = lowerInnerHTML.toLowerCase();
    let index = lowerInnerHTML.indexOf(text.toLowerCase());
    if (index >= 0) {
      innerHTML =
        innerHTML.substring(0, index) +
        '<span class="highlight">' +
        innerHTML.substring(index, index + text.length) +
        '</span>' +
        innerHTML.substring(index + text.length);
      element.innerHTML = innerHTML;
    }
  }
}
