import crypto from 'crypto';
export function userRegister(userEmail, userPassword) {
  return dispatch => {
    if (userEmail === 'gaojia@bupt.edu.cn' && userPassword === '123456') {
      const md5 = crypto.createHash("md5");
      const userId = md5.update(userEmail).digest('hex');
      dispatch({
        type: "USER_REGISTER_SUCCESS",
        userId: userId,
        userEmail: userEmail,
        userPassword: userPassword,
      });
    } else {
      dispatch({
        type: "USER_REGISTER_ERROR",
      });
    }
  };
}
export function userLogin(userEmail, userPassword) {
  return dispatch => {
    if (userEmail === 'gaojia@bupt.edu.cn' && userPassword === '123456') {
      const md5 = crypto.createHash("md5");
      const userId = md5.update(userEmail).digest('hex');
      dispatch({
        type: "USER_LOGIN_SUCCESS",
        userId: userId,
        userEmail: userEmail,
        userPassword: userPassword,
      });
    } else {
      dispatch({
        type: "USER_LOGIN_ERROR",
      });
    }
  };
}
export function userLogout() {
  return dispatch => {
    dispatch({
      type: "USER_LOGOUT",
    });
  };
}