// js/stocks.js

const polygonAPIKey = xpxY_4E89eyL_82ABtCCMCYEgGEEt4wr; 

document.addEventListener('DOMContentLoaded', () => {
  const lookupBtn = document.getElementById('lookupBtn');
  const stockInput = document.getElementById('stockInput');
  const dateRange = document.getElementById('dateRange');
  const ctx = document.getElementById('stockChart').getContext('2d');
  let chart;

  lookupBtn.addEventListener('click', async () => {
    const symbol = stockInput.value.trim().toUpperCase();
    const days = parseInt(dateRange.value);
    if (!symbol) return alert("Please enter a stock ticker.");

    try {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(endDate.getDate() - days);
      const start = startDate.toISOString().split('T')[0];
      const end = endDate.toISOString().split('T')[0];

      const url = `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/day/${start}/${end}?adjusted=true&sort=asc&limit=${days}&apiKey=${polygonAPIKey}`;
      const res = await fetch(url);
      const data = await res.json();

      if (!data.results || data.results.length === 0) {
        alert("No data found for that ticker.");
        return;
      }

      const labels = data.results.map(d => new Date(d.t).toLocaleDateString());
      const prices = data.results.map(d => d.c); // closing price

      if (chart) chart.destroy(); // Reset chart
      chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: `${symbol} Closing Price`,
            data: prices,
            borderColor: '#2575fc',
            backgroundColor: 'rgba(37,117,252,0.1)',
            fill: true,
            tension: 0.3
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: false
            }
          }
        }
      });
    } catch (err) {
      console.error(err);
      alert("Error fetching stock data.");
    }
  });

  // Load Reddit stocks
  fetch('https://tradestie.com/api/v1/apps/reddit?date=2022-04-03')
    .then(res => res.json())
    .then(data => {
      const top5 = data.slice(0, 5);
      const tbody = document.querySelector('#redditStocksTable tbody');
      top5.forEach(stock => {
        const tr = document.createElement('tr');
        const icon = stock.sentiment === 'Bullish' ? '🐂' : '🐻';
        tr.innerHTML = `
          <td><a href="https://finance.yahoo.com/quote/${stock.ticker}" target="_blank">${stock.ticker}</a></td>
          <td>${stock.no_of_comments}</td>
          <td>${icon} ${stock.sentiment}</td>
        `;
        tbody.appendChild(tr);
      });
    })
    .catch(err => console.error("Failed to load Reddit stocks", err));
});
