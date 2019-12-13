export const LOGIN = 'LOGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'

export function login(username, password, server) {
  return {
    type: LOGIN,
    payload: {
      username,
      password,
      server
    }
  }
}

export function loginSuccess(data, server) {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      data,
      server
    }
  }
}

export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    payload: {
      error
    }
  }
}

export const LOGOUT = 'LOGOUT'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_ERROR = 'LOGOUT_ERROR'

export function logout() {
  return {
    type: LOGOUT
  }
}

export function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS
  }
}

export function logoutError(error) {
  return {
    type: LOGOUT_ERROR,
    payload: {
      error
    }
  }
}
