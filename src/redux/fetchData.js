import queryString from 'query-string';
import config from '../config';
const baseUrl = config.baseUrl;

function user(email, password) { //用户注册接口
  const Url = baseUrl + '/user';
  const body = { email: email, password: password };
  return fetch(Url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: queryString.stringify(body),
  })
    .then(parseJSON);
}
function login(email, password) { //用户登录接口
  const Url = baseUrl + '/login';
  const body = { email: email, password: password };
  return fetch(Url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: queryString.stringify(body),
  })
    .then(parseJSON);
}

function device(userID, AppEUI, DevEUI, AppKey) { //设备注册接口 OTAA
  const Url = baseUrl + '/device';
  const body = { userID: userID, AppEUI: AppEUI, DevEUI: DevEUI, AppKey: AppKey };
  return fetch(Url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: queryString.stringify(body),
  })
    .then(parseJSON);
}

function deviceAbp(userID, AppEUI, DevEUI, DevAddr, AppSKey, NwkSKey) { //设备注册接口 ABP
  const Url = baseUrl + '/device';
  const body = { userID: userID, AppEUI: AppEUI, DevEUI: DevEUI, DevAddr: DevAddr, AppSKey: AppSKey, NwkSKey: NwkSKey };
  return fetch(Url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: queryString.stringify(body),
  })
    .then(parseJSON);
}

function user2application(userID) { //获取用户账户下的所有应用
  const Url = baseUrl + '/application?userID=' + userID;
  return fetch(Url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  })
    .then(parseJSON);
}

function app2device(AppEUI) { //获取应用下的所有设备
  const Url = baseUrl + 'device?AppEUI=' + AppEUI;
  return fetch(Url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  })
    .then(parseJSON);
}

function deviceInfo(DevEUI) { //获取设备的属性信息
  const Url = baseUrl + 'device/' + DevEUI;
  return fetch(Url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  })
    .then(parseJSON);
}

function deviceData(DevEUI, pagesize, pagecount) { //获取设备的应用数据
  const Url = baseUrl + 'device/' + DevEUI + '/data?size=' + pagesize + '&from=' + pagecount;
  return fetch(Url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  })
    .then(parseJSON);
}

function parseJSON(response) {
  return Promise.resolve(response.json());
}

const fetchData = {
  user, login,
  user2application,
  device, deviceAbp, app2device, deviceInfo, deviceData,
};
export default fetchData;