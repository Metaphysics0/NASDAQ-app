// Grab symbol from URL
const url = new URL(window.location.href);
const symbol = url.searchParams.get('symbol');

// Fetch company data
async function fetch_profile() {
  let PROFILE_URL = `profile/${symbol}`;
  const profile_response = await get_response(`${BASE_URL}${PROFILE_URL}`);
  injectData(profile_response);
}

// Change price color ( - / + )
let isIncreasing = true;
const checkChange = (data) => {
  let isIncreasing = true;
  if (data.changes < 0) {
    isIncreasing = false;
    append_html_class(price, 'red');
    append_html_class(changes, 'red');
  }
};

// Displays data in html
const injectData = (response) => {
  let data = response[0];
  checkChange(data);
  document.title = `(${data.symbol}) ${data.companyName}`;
  companyName.innerHTML = `${data.companyName ? data.companyName : ''}`;
  symbolText.innerHTML = `&nbsp; (${data.symbol})`;
  ceo.innerHTML = `${data.ceo ? 'CEO: ' + data.ceo : ''}`;
  city.innerHTML = `${data.city ? data.city : ''}, ${data.state ? data.state : ''}`;
  employees.innerHTML = `Full Time Employees: ( ${data.fullTimeEmployees} )`;
  price.innerHTML = `Price: ${data.price}$ ${data.currency}`;
  changes.innerHTML = `(${data.changes > 0 ? '+' + data.changes : data.changes})`;
  beta.innerHTML = `${data.beta ? 'BETA: ' + data.beta : ''}`;
  volAvg.innerHTML = `${data.volAvg ? 'Vol Avg. : ' + data.volAvg : ''}`;
  mktCap.innerHTML = `${data.mktCap ? 'mktCap: ' + data.mktCap : ''}`;
  description.innerHTML = `${data.description ? data.description : ''} `;
  website.href = `${data.website ? data.website : ''}`;
  website.innerHTML = `${data.website ? data.website : ''}`;
  logo.src = data.image;
  logo.alt = data.symbol;
};

// fetch graph history, display graph
async function fetch_graph() {
  let GRAPH_URL = `historical-price-full/${symbol}?serietype=line`;
  const graph_response = await get_response(`${BASE_URL}${GRAPH_URL}`);
  const history = graph_response.historical;
  chartIt(history);
}

// Get total years of stock history
const checkLength = (history) => {
  console.log(history);
  return history[0].date.slice(0, 4) - history.slice(-1)[0].date.slice(0, 4);
};
// Filter stock history
const filterHistory = (history) => {
  let historyIntervals = {};
  let interval = checkLength(history) > 5 ? 4 : 7;
  return history.filter((item) => {
    let histYear = item.date.slice(0, interval);
    if (!(histYear in historyIntervals)) {
      historyIntervals[histYear] = true;
      return true;
    }
    return false;
  });
};

// Chart.js
function chartIt(history) {
  const ctx = document.getElementById('myChart');
  let x = [];
  let y = [];

  let filteredHistory = filterHistory(history);
  for (let i = filteredHistory.length - 1; i >= 0; i--) {
    x.push(filteredHistory[i].date);
    y.push(filteredHistory[i].close);
  }
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: x,
      datasets: [
        {
          label: 'Lifetime Stock Health',
          data: y,
          backgroundColor: [isIncreasing ? 'rgba(36, 173, 132, 0.5)' : 'rgba(255, 99, 132, 0.5)'],
          borderColor: [isIncreasing ? 'rgb(36, 173, 170)' : 'rgb(255, 1, 10)'],
          borderWidth: 0.9,
          pointBorderWidth: 1,
          pointBackgroundColor: [isIncreasing ? 'rgb(36, 173, 132)' : 'rgba(255, 99, 132, 1)'],
          pointRadius: 3,
        },
      ],
    },
  });
}

fetch_profile();
fetch_graph();
