const initialState = {
  userEmail: sessionStorage.getItem("userEmail"), //用户email
  userPassword: sessionStorage.getItem("userPassword"), //用户密码
  userId: sessionStorage.getItem("userId"), //用户唯一标识符
  userLogin: sessionStorage.getItem("userLogin") === "true" ? true : false, //用户是否登录的标识符
  loginErr: null, //登录失败的信息
  registerErr: null, //注册失败的信息
  
  gatewayInfo:[],//所有的网关信息
  gatewayNumber:0,
  currentPageOfGateway:1,
  selectedGateway:null,
  gatewayCommuData:[],
  gatewayCommuNumber:0,
  pageSize:1
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
    case "USER_REGISTER_ERROR":
      return {
        ...state,
        userLogin: false,
        registerErr: action.message,
      };

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
    case "USER_LOGIN_ERROR":
      return {
        ...state,
        userLogin: false,
        loginErr: action.message,
      };

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
    case "GET_GATEWAY_INFO":{
      return {
        ...state,
        gatewayInfo:action.gatewayInfo,
        gatewayNumber:action.gatewayNumber,
        currentPageOfGateway:action.currentPageOfGateway,
      }
    }
    case "SELECTED_GATEWAY":{
      return {
        ...state,
        selectedGateway:action.gatewayId,
      }
    }
    case "GET_GATEWAY_COMMU_DATA":{
      return {
        ...state,
        gatewayCommuData:action.gatewayCommuData,
        gatewayCommuNumber:action.gatewayCommuNumber,
      }
    }

    default:
      break;
  }
  return state;
};