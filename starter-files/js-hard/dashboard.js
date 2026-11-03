// The Broken Dashboard - Runtime Engine
let activeTimeframe = 'today';
let cachedData = [];

// BUG 1: Race Condition in Async fetching
function fetchDashboardData(timeframe) {
  showLoader(true);
  
  // Simulated variable API latency (50ms - 1500ms)
  const simulatedDelay = timeframe === '30days' ? 1200 : 200;
  
  setTimeout(() => {
    const data = generateMockData(timeframe);
    // BUG: Missing verification if user switched timeframe while waiting!
    cachedData = data;
    renderMetrics(cachedData);
    renderTable(cachedData);
    showLoader(false);
  }, simulatedDelay);
}

// BUG 2: Event Listener proliferation on every re-render
function renderTable(items) {
  const tbody = document.getElementById('table-body');
  tbody.innerHTML = '';
  
  items.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.name}</td>
      <td>$${item.revenue}</td>
      <td><button class="btn-action" data-id="${item.id}">Action</button></td>
    `;
    tbody.appendChild(tr);
  });

  // BUG: Re-attaching click events on all buttons every time without cleanup!
  document.querySelectorAll('.btn-action').forEach(btn => {
    btn.addEventListener('click', handleActionClick);
  });
}

function handleActionClick(e) {
  alert("Action triggered for ID: " + e.target.dataset.id);
}

function renderMetrics(items) {
  const total = items.reduce((acc, curr) => acc + curr.revenue, 0);
  document.getElementById('metric-rev').innerText = '$' + total.toLocaleString();
}

function generateMockData(timeframe) {
  if (timeframe === 'today') return [{ id: 1, name: 'Direct Traffic', revenue: 1200 }, { id: 2, name: 'Search', revenue: 850 }];
  if (timeframe === '7days') return [{ id: 1, name: 'Direct Traffic', revenue: 8400 }, { id: 2, name: 'Search', revenue: 5600 }];
  if (timeframe === '30days') return [{ id: 1, name: 'Direct Traffic', revenue: 36000 }, { id: 2, name: 'Search', revenue: 24000 }];
  return [];
}

function showLoader(visible) {
  const loader = document.getElementById('loader');
  if (loader) loader.style.display = visible ? 'block' : 'none';
}

window.onload = () => fetchDashboardData('today');
