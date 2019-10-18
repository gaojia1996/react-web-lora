import fetchData from './fetchData';

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
export function devicesNoFirst(userID, AppEUI, pagecount, pagesize){
  return dispatch => {
    fetchData.user2application(userID)
      .then((res) => {
        if (res.count === 0) { //获取的应用为空
          dispatch({
            type: "GET_APPLICATION_NULL",
          });
        } else { //获取的应用不为空
          dispatch({
            type: "GET_APPLICATION_INFO_NO_FIRST",
            data: res.rows,
          });
          fetchData.app2device(AppEUI, pagecount, pagesize) //使用第一个应用的AppEUI获取相应的设备数据
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
export function changeCurrentPage(devicesPageCurrent) {
  return dispatch => {
    dispatch({
      type: "DEVICES_CHANGE_CURRENT_PAGE",
      devicesPageCurrent: devicesPageCurrent,
    });
  }
}