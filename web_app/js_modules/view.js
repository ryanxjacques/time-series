function getIdFromUrl() {
    const url = window.location.pathname;
    const urlParams = new URLSearchParams(window.location.search);
    const filename = url.substring(url.lastIndexOf('/')+1);
    
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

function displayUser(user) {
    const user_vals = user[0]
    const username = document.getElementById('username');
    username.innerHTML = user_vals.username;
}
  
function displayTsMetadata(ts_metadata) {
    const ts_vals = ts_metadata[0];
    const ts_name = document.getElementById('ts_name');
    const ts_desc = document.getElementById('ts_desc');
    const ts_domain = document.getElementById('ts_domain');
    const ts_units = document.getElementById('ts_units');
    const ts_keywords = document.getElementById('ts_keywords');
    //const ts_contributor = document.getElementById('ts_contributor');
    ts_name.innerHTML = ts_vals.ts_name;
    ts_desc.innerHTML = ts_vals.ts_desc;
    ts_domain.innerHTML = ts_vals.ts_domain;
    ts_units.innerHTML = ts_vals.ts_units;
    ts_keywords.innerHTML = ts_vals.ts_keywords;
    //ts_contributor.innerHTML = ts_vals.ts_contributor;

}