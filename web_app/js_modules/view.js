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

function viewUsers() {
    fetch(`https://35.85.29.142:3000/search/users?user_id=${encodeURIComponent(id)}`)
    .then((response) => response.json())
    .then((users_res) => {
        alert(users_res);
        displayUsers(users_res);
    });
}
  
function viewTimeSeries() {
    fetch(`https://35.85.29.142:3000/search/timeseries?ts_id=${encodeURIComponent(id)}`)
    .then((response) => response.json())
    .then((timeseries_res) => {
        displayTsMetadata(timeseries_res);
    });
}

function displayUsers(users) {
    const username = document.getElementById('username');
    username.innerHTML = users.username;
}
  
function displayTsMetadata(ts_metadata) {
    const name = document.getElementById('ts_name');
    name.innerHTML = ts_metadata.ts_name;
}