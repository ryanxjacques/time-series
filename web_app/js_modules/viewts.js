function getIdFromUrl() {
    const url = window.location.pathname;
    const filename = url.substring(url.lastIndexOf('/')+1);
    alert(filename);
    //const urlParams = new URLSearchParams(window.location.search);
    //return urlParams.get('query');
  }
  
/*

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

*/