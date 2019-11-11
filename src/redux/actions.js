import fetchData from './fetchData';
import moment from 'moment';

export function userRegister(userEmail, userPassword) { //用户注册action
  return dispatch => {
    fetchData.user(userEmail, userPassword)
      .then((res) => {
        if (res.code === 200) {
          dispatch({
            type: "USER_REGISTER_SUCCESS",
            userId: res.userID,
            userEmail: userEmail,
            userPassword: userPassword,
          });
        } else {
          dispatch({
            type: "USER_REGISTER_ERROR",
            message: res.message,
          });
        }
      });
  };
}
export function userLogin(userEmail, userPassword) { //用户登录action
  return dispatch => {
    fetchData.login(userEmail, userPassword)
      .then((res) => {
        if (res.code === 200) {
          dispatch({
            type: "USER_LOGIN_SUCCESS",
            userId: res.userID,
            userEmail: userEmail,
            userPassword: userPassword,
          });
        } else {
          dispatch({
            type: "USER_LOGIN_ERROR",
            message: res.message,
          });
        }
      });
  };
}
export function userLogout() { //用户登出账户action
  return dispatch => {
    dispatch({
      type: "USER_LOGOUT",
    });
  };
}

export function devicesFirst(userID, pagecount, pagesize) { //设备管理第一次获取数据 先获取所有的应用，根据第一个应用获取相应的设备数据
  return dispatch => {
    fetchData.user2application(userID)
      .then((res) => {
        if (res.count === 0) { //获取的应用为空
          dispatch({
            type: "GET_APPLICATION_NULL",
          });
        } else { //获取的应用不为空
          dispatch({
            type: "GET_APPLICATION_INFO",
            data: res.rows,
          });
          fetchData.app2device(res.rows[0]['AppEUI'], pagecount, pagesize) //使用第一个应用的AppEUI获取相应的设备数据
            .then((res) => {
              dispatch({
                type: "GET_DEVICE_INFO_BY_APPEUI",
                data: res.rows,
                current: pagecount,
                total: res.count,
              });
            });
        }
      });
  };
}
export function devicesNoFirst(userID, AppEUI, pagecount, pagesize) {
  return dispatch => {
    fetchData.user2application(userID)
      .then((res) => {
        if (res.count === 0) { //获取的应用为空
          dispatch({
            type: "GET_APPLICATION_NULL",
          });
        } else { //获取的应用不为空,判断当前选中的应用是否存在，若存在仍为选中的应用；若不存在，则更换新的选中应用的数据
          for (let i = 0; i < res.rows.length; i++) {
            if (res.rows[i]['AppEUI'] === AppEUI) {
              dispatch({
                type: "GET_APPLICATION_INFO_NO_FIRST",
                data: res.rows,
              });
              break;
            } else {
              if (i === res.rows.length - 1) {
                dispatch({
                  type: "GET_APPLICATION_INFO",
                  data: res.rows,
                });
                AppEUI = res.rows[0]['AppEUI'];
              }
            }
          }
          fetchData.app2device(AppEUI, pagecount, pagesize) //使用应用的AppEUI获取相应的设备数据
            .then((res) => {
              dispatch({
                type: "GET_DEVICE_INFO_BY_APPEUI",
                data: res.rows,
                current: pagecount,
                total: res.count,
              });
            });
        }
      });
  };
}
export function applicationChange(AppEUI, pagecount, pagesize) {
  return dispatch => {
    dispatch({
      type: "APPLICATION_CHANGE",
      applicationChoose: AppEUI,
    });
    fetchData.app2device(AppEUI, pagecount, pagesize)
      .then((res) => {
        dispatch({
          type: "GET_DEVICE_INFO_BY_APPEUI",
          data: res.rows,
          current: pagecount,
          total: res.count,
        });
      });
  }
}
export function user2application(userID) { //获取用户的所有应用 AppEUI和name
  return dispatch => {
    fetchData.user2application(userID)
      .then((res) => {
        dispatch({
          type: "GET_APPLICATION_INFO",
          data: res.rows,
        });
      });
  };
}
export function app2device(AppEUI, pagecount, pagesize) { //通过应用AppEUI获取所有设备 支持分页
  return dispatch => {
    fetchData.app2device(AppEUI, pagecount, pagesize)
      .then((res) => {
        dispatch({
          type: "GET_DEVICE_INFO_BY_APPEUI",
          data: res.rows,
          current: pagecount,
          total: res.count,
        });
      });
  }
}
export function changeCurrentPage(devicesPageCurrent) { //设备首页更改页码操作
  return dispatch => {
    dispatch({
      type: "DEVICES_CHANGE_CURRENT_PAGE",
      devicesPageCurrent: devicesPageCurrent,
    });
  }
}
export function devicesDidUnmount() { //设备首页unmount时redux中的数据置零
  return dispatch => {
    dispatch({
      type: "DEVICES_DID_UNMOUNT",
    });
  }
}
export function deviceGetAppData(DevEUI, AppEUI, pagesize, pagecount) { //通过DevEUI获取DevAddr 若无则暂无数据，若有，使用DevAddr和AppEUI获取应用数据，同时使用AppEUI获取相应的pb文件
  return dispatch => {
    fetchData.deviceInfo(DevEUI)
      .then((res) => {
        if (res.DevAddr === null) { //DevAddr不存在
          dispatch({
            type: "DEVICE_NO_DEVADDR",
          });
        } else { //DevAddr存在，说明设备已经和server进行了注册流程
          if (AppEUI === null || AppEUI === undefined) {
            AppEUI = Buffer.from(res.AppEUI.data).toString('hex');
          }
          const DevAddr = res.DevAddr;
          fetchData.deviceGetColum(AppEUI) //获取colum的设置
            .then((res) => {
              if (res && res.message && typeof (res.message) !== "string") {
                var columIn = [{
                  title: '时间',
                  kName: '时间',
                  dataIndex: 'timestamp',
                  sorter: (a, b) => Number(new Date(a.timestamp)) - Number(new Date(b.timestamp)),
                  key: 'timestamp',
                  width: '10%',
                  render: timestamp => moment(timestamp * 1000).format('YYYY-MM-DD HH:mm:ss'),
                }];
                const message = JSON.parse(res.message);
                for (var keyIn in message) {
                  var k = 'data.' + keyIn;
                  var objIn = {
                    title: message[keyIn]["name"] + '(' + message[keyIn]["unit"] + ")",
                    kName: message[keyIn]["name"],
                    dataIndex: k,
                    key: keyIn,
                    width: '10%',
                    render: keyIn => keyIn,
                  };
                  columIn.push(objIn);
                }
                dispatch({
                  type: "DEVICE_DATA_COLUM",
                  data: columIn,
                });
                fetchData.deviceData(AppEUI, Buffer.from(DevAddr.data).toString('hex'), pagesize, pagecount)
                  .then((res) => {
                    dispatch({
                      type: "DEVICE_GET_APP_DATA",
                      data: res['rows'],
                      devicePagecount: res['count'],
                    });
                  });
              } else { //设备所属的应用没有上传pb文件
                dispatch({
                  type: "DEVICE_NO_COLUM",
                });
              }
            });
        }
      });
  }
}
export function deviceGetGraphData(DevEUI, AppEUI) { //通过DevEUI获取DevAddr 然后通过DevAddr和AppEUI获取最新100条数据用于画图
  return dispatch => {
    fetchData.deviceInfo(DevEUI)
      .then((res) => {
        if (res.DevAddr === null) { //DevAddr不存在
          dispatch({
            type: "DEVICE_NO_DEVADDR",
          });
        } else { //DevAddr存在，说明设备已经和server进行了注册流程
          if (AppEUI === null || AppEUI === undefined) {
            AppEUI = Buffer.from(res.AppEUI.data).toString('hex');
          }
          const DevAddr = res.DevAddr;
          fetchData.deviceGetColum(AppEUI) //获取colum的设置
            .then((res) => {
              if (res && res.message && typeof (res.message) !== "string") {
                var columIn = [{
                  title: '时间',
                  kName: '时间',
                  dataIndex: 'timestamp',
                  sorter: (a, b) => Number(new Date(a.timestamp)) - Number(new Date(b.timestamp)),
                  key: 'timestamp',
                  width: '10%',
                  render: timestamp => moment(timestamp * 1000).format('YYYY-MM-DD HH:mm:ss'),
                }];
                const message = JSON.parse(res.message);
                for (var keyIn in message) {
                  var k = 'data.' + keyIn;
                  var objIn = {
                    title: message[keyIn]["name"] + '(' + message[keyIn]["unit"] + ")",
                    kName: message[keyIn]["name"],
                    dataIndex: k,
                    key: keyIn,
                    width: '10%',
                    render: keyIn => keyIn,
                  };
                  columIn.push(objIn);
                }
                dispatch({
                  type: "DEVICE_DATA_COLUM",
                  data: columIn,
                });
                fetchData.deviceData(AppEUI, Buffer.from(DevAddr.data).toString('hex'), 100, 1)
                  .then((res) => {
                    dispatch({
                      type: "DEVICE_GET_GRAPH_DATA",
                      data: res['rows'],
                    });
                  });
              } else { //设备所属的应用没有上传pb文件
                dispatch({
                  type: "DEVICE_NO_COLUM",
                });
              }
            });
        }
      });
  }
}
export function changeDevicePageType(type) { //设备应用数据页面是table还是graph
  return dispatch => {
    dispatch({
      type: "DEVICE_CHANGE_PAGETYPE",
      data: type,
    });
  }
}
export function deviceChangeTablePage(devicePageCurrent) { //设备应用数据table更换页码操作
  return dispatch => {
    dispatch({
      type: "DEVICE_CHANGE_CURRENT_PAGE",
      devicePageCurrent: devicePageCurrent,
    });
  }
}
export function deviceDidUnmount() { //设备应用页面unmount时redux中的数据置零
  return dispatch => {
    dispatch({
      type: "DEVICE_DID_UNMOUNT",
    });
  }
}