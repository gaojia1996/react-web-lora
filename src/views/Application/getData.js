import 'whatwg-fetch';
import config from '../../config';
const baseUrl = config.baseUrl;
function search(DevAddr, cb) {
  const getDetailUrl = baseUrl + '/getDetail?DevAddr=' + DevAddr;
  return fetch(getDetailUrl, {
    accept: "application/json",
    mode: 'cors',
    jsonpCallback: 'callback',
    method: 'GET',
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error); // eslint-disable-line no-console
  // throw error;
}

function parseJSON(response) {
  return response.text();

}

const getDetail = { search };
export default getDetail;