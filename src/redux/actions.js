import fetchData from './fetchData';

export function userRegister(userEmail, userPassword) {
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
        }else{
          dispatch({
            type: "USER_REGISTER_ERROR",
            message: res.message,
          });
        }
      });
  };
}
export function userLogin(userEmail, userPassword) {
  return dispatch => {
    fetchData.login(userEmail, userPassword)
    .then((res)=>{
      if(res.code===200){
        dispatch({
          type: "USER_LOGIN_SUCCESS",
          userId: res.userID,
          userEmail: userEmail,
          userPassword: userPassword,
        });
      }else{
        dispatch({
          type: "USER_LOGIN_ERROR",
          message: res.message,
        });
      }
    });
  };
}
export function userLogout() {
  return dispatch => {
    dispatch({
      type: "USER_LOGOUT",
    });
  };
}