// sessionStorage.setItem("userEmail", 0);
// sessionStorage.setItem("userPassword", 0);
// sessionStorage.setItem("userId", 0);
// sessionStorage.setItem("userLogin", 0);
// sessionStorage.clear();
const initialState = {
  userEmail: sessionStorage.getItem("userEmail"), //用户email
  userPassword: sessionStorage.getItem("userPassword"), //用户密码
  userId: sessionStorage.getItem("userId"), //用户唯一标识符
  userLogin: sessionStorage.getItem("userLogin") === "true" ? true : false, //用户是否登录的标识符
}
export default (state = initialState, action) => {
  switch (action.type) {
    case "USER_REGISTER_SUCCESS": { //用户注册相关
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
      };
    }
    case "USER_REGISTER_ERROR":
      return {
        ...state,
        userLogin: false,
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
      };
    }
    case "USER_LOGIN_ERROR":
      return {
        ...state,
        userLogin: false,
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
      };
    }

    default:
      break;
  }
  return state;
};