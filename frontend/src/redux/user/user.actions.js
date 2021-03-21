import {UserActionTypes} from './user.types.js'

import AuthService from '../../services/auth.service';

export const register = (username, firstname , lastname , email , password) => (dispatch) => {
    return AuthService.register(username, firstname , lastname , email , password).then((response) => {
        dispatch({
            type:UserActionTypes.REGISTER_SUCCESS,
        })

        dispatch({
            type: UserActionTypes.SET_MESSAGE,
            payload: response.data.message,
        })
        return Promise.resolve()
    }, (error) => {
        const message = (error.response.data && error.resposne.data && error.response.data.message) || error.message || error.toStrin();

        dispatch({
            type: UserActionTypes.REGISTER_FAIL,
        })

        dispatch({
            type: UserActionTypes.SET_MESSAGE,
            payload: message,
        });

        return Promise.reject();
    })
}

// export const login = (username , password) => (dispatch) => {
//     return AuthService.login(username , password).then((data) => {
//         dispatch({
//             type: UserActionTypes.LOGIN_SUCCESS,
//             payload: {user: data},
//         })
//     }, (error) => {
//         const message = (error.message && error.response.data &&  error.resposne.data.message) || error.messgae || error.toString();

//         dispatch({
//             type: UserActionTypes.LOGIN_FAIL
//         })

//         dispatch({
//             type: UserActionTypes.SET_MESSAGE,
//             payload: message,
//         })

//         return Promise.reject();
//     })
// }

export const AdminLogin = (username, password) => (dispatch) => {
    return AuthService.Adminlogin(username, password).then(
      (data) => {
        dispatch({
          type: UserActionTypes.LOGIN_SUCCESS,
          payload: { user: data },
        });
  
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: UserActionTypes.LOGIN_FAIL,
        });
  
        dispatch({
          type: UserActionTypes.SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };

export const login = (username, password) => (dispatch) => {
    return AuthService.login(username, password).then(
      (data) => {
        dispatch({
          type: UserActionTypes.LOGIN_SUCCESS,
          payload: { user: data },
        });
  
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: UserActionTypes.LOGIN_FAIL,
        });
  
        dispatch({
          type: UserActionTypes.SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };

export const logout = () => (dispatch) => {
    AuthService.logout();

    dispatch({
        type: UserActionTypes.LOGOUT,
    })
}