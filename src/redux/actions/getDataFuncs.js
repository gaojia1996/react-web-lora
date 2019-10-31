import 'whatwg-fetch';
import config from '../../config.js'
// import qs from 'query-string'

const baseUrl = config.dataUrl;
function getGatewayInfoFunc(userId,pageNumber,pageSize) {
    const Url = baseUrl + '/gateway?userID=' + userId + '&from=' + pageNumber + '&size=' + pageSize;
    // console.log('the url is ',Url)
    return fetch(Url, {
        accept: "application/json",
        mode: 'cors',
        jsonpCallback: 'callback',
        method: 'GET',
      })
        .then(checkStatus)
        .then(parseJSON);
}

// function getEveryGatewayInfoFunc(gatewayId) {
//   const Url = baseUrl + '/gateway/' + gatewayId;
//   return fetch(Url, {
//     accept: "application/json",
//     mode: 'cors',
//     jsonpCallback: 'callback',
//     method: 'GET',
//   })
//     .then(checkStatus)
//     .then(parseJSON);
// }

function getGatewayCommunicateDataFunc(gatewayId,pageNumber,pageSize) {
  const Url = baseUrl + '/gateway/' + gatewayId + '/data?from=' + pageNumber + '&size=' + pageSize;
  // console.log(Url);
  return fetch(Url, {
    accept: "application/json",
    mode: 'cors',
    jsonpCallback: 'callback',
    method: 'GET',
  })
    .then(checkStatus)
    .then(parseJSON);
}

// function postGatewayInfo(id, type, frequency,model,location) {
//   const Url = baseUrl + '/gateway';
//   var data = {
//     userID:'244a534ee2fc985ebade02b5d7771984',
//     gatewayId:id,
//     type:type,
//     frequencyPlan:frequency,
//     model:model,
//     location:location
//   }
//   fetch(Url,{
//     method:'POST',
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded"
//     },
//     body:qs.stringify(data),
//   }).then(responce=>responce.json())
//   .then(res=>{
//     if(res.code=='200'){
//       console.log('网关创建成功');
//       alert('创建网关成功')
//     }else if(res.code=='400'){
//       console.log('网关创建失败');
//     }else if(res.code=='3111'){
//       console.log('请先输入gatewayId');
//       console.log('the res code is ',res.code);
//       console.log('the res is ',res)
//       alert("请先输入网关Id");
//     }
//   })
//   console.log('zhixing chenggong')
// }
function getAppInfo(userID,pageNumber,pageSize) {
  const Url = baseUrl + '/application?userID=' + userID + '&from=' + pageNumber + '&size=' + pageSize;
  return fetch(Url, {
    accept: "application/json",
    mode: 'cors',
    jsonpCallback: 'callback',
    method: 'GET',
  })
    .then(checkStatus)
    .then(parseJSON);
}

function getAppDataTypeFunc(AppEUI) {
  const Url = baseUrl + '/app2devType?AppEUI=' + AppEUI;
  return fetch(Url, {
    accept:'application/json',
    mode:'cors',
    jsonpCallback:'callback',
    method:'GET',
  })
  .then(checkStatus)
  .then(parseJSON);
}
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(response.json());
  }
}

function parseJSON(response) {
  // console.log(response.json())
  return Promise.resolve(response.json());
}



const getDataFuncs = {
    getGatewayInfoFunc,
    getGatewayCommunicateDataFunc,
    getAppInfo,
    getAppDataTypeFunc
    
};
export default getDataFuncs;