const getUuid = () => {
  sendRequest('GET', 'https://35.85.29.142:3000/uuidGen/').then(response => {
    localStorage.setItem('uuid', response.id);
  });
}

const checkActive = (uuid) => {
  sendRequest('POST', 'https://35.85.29.142:3000/auth/is-active?', {uuid: uuid}).then(response => {
    if (response.status) {
      return window.location.replace("pages/home.html");;
    }
  });
}

const main = () => {
  const uuid = localStorage.getItem('uuid')
  if (uuid) {
    checkActive(uuid);
  } else {
    getUuid();
  }
};

// Execute main
main();
