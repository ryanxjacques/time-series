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
    alert(`https://35.85.29.142:3000/view/users?user_id=${encodeURIComponent(id)}`);
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
    const username = document.getElementById('username');
    username.innerHTML = user.username;
}
  
function displayTsMetadata(ts_metadata) {
    const name = document.getElementById('ts_name');
    name.innerHTML = ts_metadata.ts_name;
}