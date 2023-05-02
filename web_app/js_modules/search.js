function getSearchTermFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('query');
  }
  
const searchTerm = decodeURIComponent(getSearchTermFromUrl());

function searchUsers() {
    fetch(`https://35.85.29.142:3000/search/users?query=${encodeURIComponent(searchTerm)}`)
    .then((response) => response.json())
    .then((users_res) => {
        displayUsers(users_res);
    });
}
  
function searchTimeSeries() {
    fetch(`https://35.85.29.142:3000/search/timeseries?query=${encodeURIComponent(searchTerm)}`)
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
        const idLink = document.createElement('a');
        idLink.textContent = ts.ts_id;
        idLink.href = `view-time-series.html?ts_id=${ts.ts_id}`;
        idCell.appendChild(idLink);
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