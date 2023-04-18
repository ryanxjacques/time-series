
async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

postData("https://35.85.29.142:3000/", { message: "Hello, world." }).then((data) => {
  console.log(data); // JSON data parsed by `data.json()` call
});
