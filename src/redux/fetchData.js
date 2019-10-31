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

function device(AppEUI, DevEUI, AppKey, ProtocolVersion, name, description) { //设备注册接口 OTAA
  const Url = baseUrl + '/device';
  const body = {
    activationMode: "OTAA", AppEUI: AppEUI, DevEUI: DevEUI, AppKey: AppKey,
    ProtocolVersion: ProtocolVersion, name: name, description: description,
  };
  return fetch(Url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: queryString.stringify(body),
  })
    .then(parseJSON);
}

function deviceAbp(AppEUI, DevEUI, DevAddr, AppSKey, NwkSKey, ProtocolVersion, frequencyPlan,
  ChMask, CFList, ChDrRange, RX1CFList, RX2Freq, RX2DataRate, MaxEIRP, ADR, DevNonce, name, description) { //设备注册接口 ABP
  const Url = baseUrl + '/device';
  const body = {
    activationMode: "ABP", AppEUI: AppEUI, DevEUI: DevEUI, DevAddr: DevAddr, AppSKey: AppSKey,
    NwkSKey: NwkSKey, ProtocolVersion: ProtocolVersion, frequencyPlan: frequencyPlan, ChMask: ChMask,
    CFList: CFList, ChDrRange: ChDrRange, RX1CFList: RX1CFList, RX2Freq: RX2Freq, RX2DataRate: RX2DataRate,
    MaxEIRP: MaxEIRP, ADR: ADR, DevNonce: DevNonce, name: name, description: description,
  };
  return fetch(Url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: queryString.stringify(body),
  })
    .then(parseJSON);
}

function deviceDelete(DevEUI) { //设备删除接口
  const Url = baseUrl + '/device';
  const body = { DevEUI: DevEUI, };
  return fetch(Url, {
    method: 'DELETE',
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

function app2device(AppEUI, pagecount, pagesize) { //获取应用下的所有设备 支持分页操作
  const Url = baseUrl + '/device?AppEUI=' + AppEUI + '&from=' + pagecount + '&size=' + pagesize;
  return fetch(Url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  })
    .then(parseJSON);
}

function deviceInfo(DevEUI) { //获取设备的属性信息
  const Url = baseUrl + '/device/' + DevEUI;
  return fetch(Url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  })
    .then(parseJSON);
}

function deviceGetColum(AppEUI) { //根据设备所属的应用AppEUI获取解析应用数据的json数据
  const Url = baseUrl + '/app2devType?AppEUI=' + AppEUI;
  return fetch(Url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  })
    .then(parseJSON);
}

function deviceData(AppEUI, DevAddr, pagesize, pagecount) { //获取设备的应用数据 支持分页操作
  const Url = baseUrl + '/device/' + AppEUI + '/' + DevAddr + '/data?size=' + pagesize + '&from=' + pagecount;
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
  device, deviceAbp, deviceDelete, app2device, deviceInfo, deviceGetColum, deviceData,
};
export default fetchData;