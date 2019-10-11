import getDataFuncs from "./getDataFuncs.js"
// import {decToString} from "./funcs.js"

//给定一个userId，获取其对应的网关信息的函数，返回一个数组
export function getGatewayInfo(userId,pageNumber,pageSize) {
    return dispatch => {
        getDataFuncs.getGatewayInfoFunc(userId,pageNumber,pageSize)
          .then(res => {

            console.log('the res of gatewayData is ',res);
            dispatch({
              type:"GET_GATEWAY_INFO",
              gatewayInfo:res['rows']!==null?res['rows']:[],
              gatewayNumber:res['count']!=null?res['count']:0,
              currentPageOfGateway:pageNumber,
            });
          }) 
          .catch(() =>{
            console.log("获取该userId的网关信息失败")
          })
    }
}

export function selectedGateway(gatewayId) {
  return dispatch =>{
    dispatch({
      type:"SELECTED_GATEWAY",
      gatewayId:gatewayId
    })
  }
}

//根据网关的ID列表，获取所有网关的详细信息
// export function getGatewayInfo(gatewayIdList) {
//   return dispatch => {
//     const promises = gatewayIdList.map((each)=>getDataFuncs.getEveryGatewayInfoFunc(each))
//     Promise.all(promises)
//     .then()
//     .then(function(res){
//       console.log('the ans of promise all are ',res);
//       dispatch({
//         type:"GET_GATEWAY_INFO",
//         gatewayInfoList:res,
//       })
//     })
//     .catch(function(e){
//       console.log('the promise all is wrong');
//     })
//   }
// }

export function getGatewayCommunicateData(gatewayId,pageNumber,pageSize) {
 
    getDataFuncs.getGatewayCommunicateData(gatewayId,pageNumber,pageSize)
    .then(res=>{
      console.log('the res is ',res)
      return(res['rows']!==null?res['rows']:[]);
        
    })
    .catch(()=>{console.log('获取网关通信数据错误');return [];})
  
}