function switchTab(tabName) {
  const tabs = document.querySelectorAll('.tab');
  const contentContainers = document.querySelectorAll('.content-container');

  tabs.forEach(tab => {
    if (tab.id.includes(tabName)) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

  contentContainers.forEach(content => {
    if (content.id.includes(tabName)) {
      content.classList.add('active');
    } else {
      content.classList.remove('active');
    }
  });
}

function fetchUsers() {
  fetch('https://35.85.29.142:3000/users')
  .then((response) => response.json())
  .then((users_res) => {
    displayUsers(users_res);
  });
}

function fetchTimeSeries() {
  fetch('https://35.85.29.142:3000/timeseries')
  .then((response) => response.json())
  .then((timeseries_res) => {
    displayTsMetadata(timeseries_res);
  });
}

function displayUsers(users) {
  const tableBody = document.getElementById('users-table-body');
  tableBody.innerHTML = '';

  users.forEach((user) => {
    const row = document.createElement('tr');

    const idCell = document.createElement('td');
    idCell.textContent = user.id;
    row.appendChild(idCell);

    const usernameCell = document.createElement('td');
    usernameCell.textContent = user.username;
    row.appendChild(usernameCell);

    tableBody.appendChild(row);
  });
}

function displayTsMetadata(ts_metadata) {
  const tableBody = document.getElementById('ts-metadata-table-body');
  tableBody.innerHTML = '';

  ts_metadata.forEach((ts) => {
    const row = document.createElement('tr');

    const idCell = document.createElement('td');
    idCell.textContent = ts.ts_id;
    row.appendChild(idCell);

    const nameCell = document.createElement('td');
    nameCell.textContent = ts.ts_name;
    row.appendChild(nameCell);

    const descCell = document.createElement('td');
    descCell.textContent = ts.ts_desc;
    row.appendChild(descCell);

    const domainCell = document.createElement('td');
    domainCell.textContent = ts.ts_domain;
    row.appendChild(domainCell);

    const unitCell = document.createElement('td');
    unitCell.textContent = ts.ts_units;
    row.appendChild(unitCell);

    const keywordCell = document.createElement('td');
    keywordCell.textContent = ts.ts_keywords;
    row.appendChild(keywordCell);

    tableBody.appendChild(row);
  });
}

fetchUsers();
fetchTimeSeries();