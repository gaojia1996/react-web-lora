const initialState = {
  userEmail: sessionStorage.getItem("userEmail"), //用户email
  userPassword: sessionStorage.getItem("userPassword"), //用户密码
  userId: sessionStorage.getItem("userId"), //用户唯一标识符
  userLogin: sessionStorage.getItem("userLogin") === "true" ? true : false, //用户是否登录的标识符
  loginErr: null, //登录失败的信息
  registerErr: null, //注册失败的信息

  applicationFetch: false, //获取用户应用标识
  applicationInfo: [], //选择应用按钮的应用信息
  applicationChoose: {}, //选择应用select的选中值
  devicesPagesize: 8, //设备列表分页页数
  devicesPagecount: 0, //设备列表的所有数据
  devicesPageCurrent: 1, //设备列表当前页码
  devicesFetch: false, //设备列表数据获取标志
  devicesTableItem: [], //设备列表内容
  devicePagesize: 8, //设备应用数据列表分页页数
  devicePagecount: 0, //设备应用数据列表的所有数据
  devicePageCurrent: 1, //设备应用数据列表当前页码
  deviceFetch: false, //设备应用数据列表数据获取标志
  deviceColum: [], //设备应用数据列表数据格式
  deviceTableItem: [], //设备应用数据列表内容
  deviceNoDevAddr: false, //设备没有DevAddr标志，false表示默认设备拥有该属性
  deviceNoColum: false, //设备没有表头数据标志，false表示默认用户已经上传了pb文件
  deviceGraphFetch: false, //设备数据图获取接口标志，false表示还未收到数据
  deviceGraphData: [], //设备画图数据
  pageType: 0, //设备应用数据页面渲染类型，0表示数据图，1表示数据表

  gatewayInfo: [],//所有的网关信息
  gatewayNumber: 0,
  currentPageOfGateway: 1,
  selectedGateway: null,
  gatewayCommuData: [],
  gatewayCommuNumber: 0,
  pageSize: 1
}
export default (state = initialState, action) => {
  switch (action.type) {
    case "USER_REGISTER_SUCCESS": { //用户注册相关
      sessionStorage.setItem("userEmail", action.userEmail); //存储至session 保证页面刷新仍记录用户登录信息
      sessionStorage.setItem("userPassword", action.userPassword);
      sessionStorage.setItem("userId", action.userId);
      sessionStorage.setItem("userLogin", true);
      return {
        ...state,
        userEmail: action.userEmail,
        userPassword: action.userPassword,
        userId: action.userId,
        userLogin: true,
        registerErr: null,
      };
    }
    case "USER_REGISTER_ERROR": {
      return {
        ...state,
        userLogin: false,
        registerErr: action.message,
      };
    }

    case "USER_LOGIN_SUCCESS": { //用户登录相关
      sessionStorage.setItem("userEmail", action.userEmail);
      sessionStorage.setItem("userPassword", action.userPassword);
      sessionStorage.setItem("userId", action.userId);
      sessionStorage.setItem("userLogin", true);
      return {
        ...state,
        userEmail: action.userEmail,
        userPassword: action.userPassword,
        userId: action.userId,
        userLogin: true,
        loginErr: null,
      };
    }
    case "USER_LOGIN_ERROR": {
      return {
        ...state,
        userLogin: false,
        loginErr: action.message,
      };
    }

    case "USER_LOGOUT": { //用户登出相关
      sessionStorage.setItem("userEmail", null);
      sessionStorage.setItem("userPassword", null);
      sessionStorage.setItem("userId", null);
      sessionStorage.setItem("userLogin", false);
      return {
        ...state,
        userEmail: null,
        userPassword: null,
        userId: null,
        userLogin: false,
        loginErr: null,
        registerErr: null,
      };
    }
    //by j
    //获取网关id
    case "GET_GATEWAY_INFO": {
      return {
        ...state,
        gatewayInfo: action.gatewayInfo,
        gatewayNumber: action.gatewayNumber,
        currentPageOfGateway: action.currentPageOfGateway,
      }
    }
    case "SELECTED_GATEWAY": {
      return {
        ...state,
        selectedGateway: action.gatewayId,
      }
    }
    case "GET_GATEWAY_COMMU_DATA": {
      return {
        ...state,
        gatewayCommuData: action.gatewayCommuData,
        gatewayCommuNumber: action.gatewayCommuNumber,
      }
    }

    case "GET_APPLICATION_NULL": { //获取的用户应用为空的操作
      const applicationChoose = {
        DevEUI: null,
        DevAddr: null,
        AppKey: null,
        AppEUI: null,
        DevNonce: null,
        AppNonce: null,
        NwkSKey: null,
        AppSKey: null,
        activationMode: null,
        ProtocolVersion: null,
        FCntUp: 0,
        NFCntDown: 0,
        AFCntDown: 0,
        createdAt: null,
        updatedAt: null
      };
      return {
        ...state,
        applicationFetch: true,
        applicationChoose: applicationChoose,
        devicesFetch: true,
      }
    }
    case "GET_APPLICATION_INFO": { //获取用户的所有应用数据
      return {
        ...state,
        applicationFetch: true,
        applicationInfo: action.data,
        applicationChoose: action.data[0],
      }
    }
    case "GET_APPLICATION_INFO_NO_FIRST": { //存储用户应用数据
      return {
        ...state,
        applicationFetch: true,
        applicationInfo: action.data,
      }
    }
    case "GET_DEVICE_INFO_BY_APPEUI": { //根据应用AppEUI获取一页的设备列表
      return {
        ...state,
        devicesFetch: true,
        devicesTableItem: action.data,
        devicesPageCurrent: action.current,
        devicesPagecount: action.total,
      }
    }
    case "APPLICATION_CHANGE": { //select选择框更换应用
      var applicationChange = state.applicationChoose;
      for (var i = 0; i < state.applicationInfo.length; i++) {
        if (state.applicationInfo[i]['AppEUI'] === action.applicationChoose) {
          applicationChange = state.applicationInfo[i];
        }
      }
      return {
        ...state,
        applicationChoose: applicationChange,
      }
    }
    case "DEVICES_CHANGE_CURRENT_PAGE": { //设备列表首页更换页码
      return {
        ...state,
        devicesPageCurrent: action.devicesPageCurrent,
      }
    }
    case "DEVICES_DID_UNMOUNT": { //设备首页unmount时redux中的数据置零
      return {
        ...state,
        applicationFetch: false,
        applicationInfo: [],
        devicesPagecount: 0,
        devicesPageCurrent: 1,
        devicesFetch: false,
        devicesTableItem: [],
      }
    }
    case "DEVICE_NO_DEVADDR": { //设备属性中不存在DevAddr，视为暂无应用数据
      return {
        ...state,
        deviceFetch: true,
        deviceNoDevAddr: true,
      }
    }
    case "DEVICE_DATA_COLUM": { //将组好的column设置存在deviceColum之中
      return {
        ...state,
        deviceFetch: true,
        deviceColum: action.data,
      }
    }
    case "DEVICE_GET_APP_DATA": { //将获取的设备应用数据存储起来
      return {
        ...state,
        deviceFetch: true,
        devicePagecount: action.devicePagecount,
        deviceTableItem: action.data
      }
    }
    case "DEVICE_NO_COLUM": { //设备所属的应用暂无上传pb文件，无法解析
      return {
        ...state,
        deviceFetch: true,
        deviceNoColum: true,
      }
    }
    case "DEVICE_GET_GRAPH_DATA": { //设备的画图数据
      return {
        ...state,
        deviceGraphFetch: true,
        deviceGraphData: action.data,
      }
    }
    case "DEVICE_CHANGE_PAGETYPE": { //应用页面渲染类型
      return {
        ...state,
        pageType: action.data,
      }
    }
    case "DEVICE_CHANGE_CURRENT_PAGE": { //应用table页面改变
      return {
        ...state,
        deviceFetch: false,
        devicePageCurrent: action.devicePageCurrent,
      }
    }
    case "DEVICE_DID_UNMOUNT": { //恢复默认值
      return {
        ...state,
        devicePagecount: 0,
        devicePageCurrent: 1,
        deviceFetch: false,
        deviceColum: [],
        deviceTableItem: [],
        deviceNoDevAddr: false,
        deviceNoColum: false,
        deviceGraphFetch: false,
        deviceGraphData: [],
        pageType: 0,
      }
    }
    default:
      break;
  }
  return state;
};