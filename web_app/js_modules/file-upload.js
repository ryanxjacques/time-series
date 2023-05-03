const submitBtn = document.querySelector("#upload_file_form_submit_btn");
const ts_name = document.querySelector("#ts_name");
const ts_description = document.querySelector("#ts_description");
const ts_domains = document.querySelector("#ts_domains");
const ts_units = document.querySelector("#ts_units");
const ts_keywords = document.querySelector("#ts_keywords");
const ts_file_input = document.querySelector("#ts_file_input");

const TEXT_INPUT_LIST = [ts_name, ts_description, ts_domains, ts_units, ts_keywords];
const DIRTY_DATA = [ts_domains, ts_units, ts_keywords];

submitBtn.addEventListener('click', (e) => {
  // Check text inputs for any missing data.
  missing_data = check_all_text_inputs(TEXT_INPUT_LIST);
  
  // This is just one of those weird HTML things. type=File is very stubborn.
  if (ts_file_input.files.length == 0) {
    missing_data = true;
    ts_file_input.setCustomValidity('This field is required.');
  }

  // Leave the function if there's any missing data.
  if (missing_data) {
    return;
  }

  // Clean ts_domains, ts_units, ts_keywords.
  clean_all_text(DIRTY_DATA);

  // Make a message to send to server.
  const message = new Object();
  message['username'] = localStorage.getItem('username');
  message['ts_name'] = ts_name.value;
  message['ts_desc'] = ts_description.value;
  message['ts_domain'] = ts_domains.value;
  message['ts_units'] = ts_units.value;
  message['ts_keywords'] = ts_keywords.value;

  sendRequest("POST", "https://35.85.29.142:3000/file/metadata", message).then(response => {
    const newFileName = create_filename(ts_file_input, response.id, ts_name.value);
    return uploadFile("https://35.85.29.142:3000/file/upload", ts_file_input, newFileName);
  }).then(response => {
    console.log(response.message);
  });
});


const check_all_text_inputs = (input_list) => {
  let result = false;
  input_list.forEach(input => {
    if (!input.value) {
      result = true;
      invalid_empty_input(input);
    }
  });
  return result;
};



const invalid_empty_input = (element) => {
  const placeholder = element.getAttribute('placeholder');
  element.setCustomValidity('This field is required.');
  if (!placeholder.endsWith('*')) {
    element.setAttribute('placeholder', `${placeholder}*`);
  }
};

const clean_all_text = (dirty_list) => {
  dirty_list.forEach(element => {
    element.value = element.value.replace(/,\s+/g, ','); // delete all spaces after a comma
    element.value = element.value.replace(/\s{2,}/g, ' '); // replace all two+ spaces with one
    element.value =  element.value.toLowerCase() // Make everything lowercase
  });
}

const create_filename = (file_input, id, ts_name) => {
  //{contributor-id}~{ts-name}~filename.ext-randomNumbers
  const originalName = file_input.files[0].name;
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
  const newFileName = `${id}~${ts_name}~${originalName}-${uniqueSuffix}`;
  console.log(newFileName);
  return newFileName;

};