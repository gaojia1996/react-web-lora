import 'whatwg-fetch';
import config from '../../config';
const baseURL = config.baseUrl;
function firstSearch(DevAddr, end_time, cb) { //获取当前所有数据用于table展示
  const url = baseURL + '/getData?find={"DevAddr":"' + DevAddr + '","timestamp":{"$lte":' + end_time + '}}&limit=999&sort=-1';
  console.log(url);
  return fetch(url, {
    accept: "application/json",
    mode: 'cors',
    jsonpCallback: 'callback',
    method: 'GET',
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function dataSearch(DevAddr, end_time, cb) {  //获取前100条数据用于画图展示
  const graphUrl = baseURL + '/getData?find={"DevAddr":"' + DevAddr + '","timestamp":{"$lte":' + end_time + '}}&limit=100&sort=-1';
  
  return fetch(graphUrl, {
    accept: "application/json",
    mode: 'cors',
    jsonpCallback: 'callback',
    method: 'GET',
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function nowSearch(DevAddr, end_time, cb) {  //获取前100条数据用于画图展示
  const graphUrl = baseURL + '/getData?find={"DevAddr":"' + DevAddr + '","timestamp":{"$lte":' + end_time + '}}&limit=1&sort=-1';
  
  return fetch(graphUrl, {
    accept: "application/json",
    mode: 'cors',
    jsonpCallback: 'callback',
    method: 'GET',
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function search(DevAddr, start_time, end_time, cb) {  //传入起始时间戳获取区间的数据
  // const normalUrl = baseURL + '/getData?find={"did":"' + did + '","timestamp":{"$gte":' + start_time + ',"$lte":' + end_time + '}}&limit=null&sort=-1';
  const normalUrl = baseURL + '/getData?find={"DevAddr":"' + DevAddr + '","timestamp":{"$gte":' + start_time + ',"$lte":' + end_time + '}}&limit=100&sort=-1';
  return fetch(normalUrl, {
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
  console.log(response);
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error); // eslint-disable-line no-console
  // throw error;
}

function parseJSON(response) {
  return response.text();

}

const Client = { search, firstSearch, dataSearch, nowSearch };
export default Client;