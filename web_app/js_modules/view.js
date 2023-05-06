/*
Team: Time Lords
Author(s): Sterling Stewart
Description: Frontend JavaScript code for time series & user viewing pages.
             Provides functions for fetching & displaying TS & user data.
Last Modified: 5/5/2023
*/

function getIdFromUrl() {
  const url = window.location.pathname;
  const urlParams = new URLSearchParams(window.location.search);
  const filename = url.substring(url.lastIndexOf('/') + 1);

  if (filename == "view-time-series.html") {
    query = urlParams.get('ts_id');
  }
  else {
    query = urlParams.get('user_id');
  }
  return query;
}

const id = decodeURIComponent(getIdFromUrl());

function viewUser() {
  fetch(`https://35.85.29.142:3000/view/users?user_id=${encodeURIComponent(id)}`)
    .then((response) => response.json())
    .then((user_res) => {
      displayUser(user_res);
    });
}

function viewTimeSeries() {
  fetch(`https://35.85.29.142:3000/view/timeseries?ts_id=${encodeURIComponent(id)}`)
    .then((response) => response.json())
    .then((timeseries_res) => {
      displayTsMetadata(timeseries_res);
    });
}

// Populates view-user with user data, contributed data, and solution data.
function displayUser(result) {
  const user_vals = result[0][0];
  const ts_metadata = result[1];
  const sol_vals = result[2];
  const username = document.getElementById('username');
  username.innerHTML = user_vals.username;

  const tableBody = document.getElementById('ts-metadata-table-body');
  tableBody.innerHTML = '';

  if (ts_metadata < 1) {
    const row = document.createElement('tr');
    const NoResCell = document.createElement('td');
    NoResCell.className = "noRes";
    NoResCell.textContent = 'No Results';
    row.appendChild(NoResCell);
    tableBody.appendChild(row);
  }

  else {
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
      domainCell.textContent = ts.ts_domain.replaceAll(",", ", ");
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

  const solTableBody = document.getElementById('solutions');
  solTableBody.innerHTML = '';

  

  if (sol_vals < 1) {
    const row = document.createElement('tr');
    const NoResCell = document.createElement('td');
    NoResCell.className = "noRes";
    NoResCell.textContent = 'No Solutions';
    row.appendChild(NoResCell);
    solTableBody.appendChild(row);
  }

  else {
    sol_vals.forEach((sol) => {
      const row = document.createElement('tr');

      const idCell = document.createElement('td');
      const idLink = document.createElement('a');
      idLink.textContent = sol.ts_id;
      idLink.href = `view-time-series.html?ts_id=${sol.ts_id}`;
      idCell.appendChild(idLink);
      row.appendChild(idCell);

      const mapeCell = document.createElement('td');
      mapeCell.textContent = sol.ts_mape;
      row.appendChild(mapeCell);

      solTableBody.appendChild(row);
    });
  }
}

// Populates view-time-series with ts_metadata and solution data
function displayTsMetadata(ts_metadata) {
  const ts_vals = ts_metadata[0][0];
  const sol_vals = ts_metadata[1];
  const ts_name = document.getElementById('ts_name');
  const ts_desc = document.getElementById('ts_desc');
  const select_domain = document.getElementById('ts_domain');
  const ts_units = document.getElementById('ts_units');
  const ts_keywords = document.getElementById('ts_keywords');
  const ts_contributor = document.getElementById('ts_contributor');
  const domains = ts_vals.ts_domain.split(",")
  ts_name.innerHTML = ts_vals.ts_name;
  ts_desc.innerHTML = ts_vals.ts_desc;
  ts_units.innerHTML = ts_vals.ts_units;
  ts_keywords.innerHTML = ts_vals.ts_keywords;
  const contributorLink = document.createElement('a');
  contributorLink.textContent = ts_vals.ts_contributor;
  contributorLink.href = `view-user.html?user_id=${ts_vals.ts_contributor}`;
  ts_contributor.appendChild(contributorLink);

  for (var i = 0; i < domains.length; i++) {
    var opt = domains[i];
    var elem = document.createElement('option');
    elem.textContent = opt;
    elem.value = opt;
    select_domain.appendChild(elem);
  }

  const tableBody = document.getElementById('solutions');
  tableBody.innerHTML = '';

  if (sol_vals < 1) {
    const row = document.createElement('tr');
    const NoResCell = document.createElement('td');
    NoResCell.className = "noRes";
    NoResCell.textContent = 'No Solutions';
    row.appendChild(NoResCell);
    tableBody.appendChild(row);
  }

  else {
    sol_vals.forEach((sol) => {
      const row = document.createElement('tr');

      const idCell = document.createElement('td');
      const idLink = document.createElement('a');
      idLink.textContent = sol.DS_MLE_id;
      idLink.href = `view-user.html?user_id=${sol.DS_MLE_id}`;
      idCell.appendChild(idLink);
      row.appendChild(idCell);

      const mapeCell = document.createElement('td');
      mapeCell.textContent = sol.ts_mape;
      row.appendChild(mapeCell);

      tableBody.appendChild(row);
    });
  }
}