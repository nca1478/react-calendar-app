import { types } from '../types/types'
import { fetchWithoutToken, fetchWithToken } from '../helpers/fetch'
import {
  showErrorStartLogin,
  showErrorStartRegister,
} from '../helpers/showErrors'

export const startLogin = (email, password) => {
  return async (dispatch) => {
    const resp = await fetchWithoutToken(
      'auth/login',
      { email, password },
      'POST'
    )
    const body = await resp.json()

    if (body.ok) {
      localStorage.setItem('token', body.token)
      localStorage.setItem('token-init-date', new Date().getTime())

      dispatch(login({ uid: body.user.uid, name: body.user.name }))
    } else {
      showErrorStartLogin(body)
    }
  }
}

export const startRegister = (name, email, password) => {
  return async (dispatch) => {
    const resp = await fetchWithoutToken(
      'auth/new',
      { name, email, password },
      'POST'
    )
    const body = await resp.json()

    if (body.ok) {
      localStorage.setItem('token', body.token)
      localStorage.setItem('token-init-date', new Date().getTime())

      dispatch(login({ uid: body.user.uid, name: body.user.name }))
    } else {
      showErrorStartRegister(body)
    }
  }
}

export const starChecking = () => {
  return async (dispatch) => {
    const resp = await fetchWithToken('auth/renew')
    const body = await resp.json()

    if (body.ok) {
      localStorage.setItem('token', body.token)
      localStorage.setItem('token-init-date', new Date().getTime())

      dispatch(login({ uid: body.user.uid, name: body.user.name }))
    } else {
      dispatch(checkingFinish())
    }
  }
}

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear()

    dispatch(logout())
  }
}

export const checkingFinish = () => {
  return {
    type: types.authCheckingFinish,
  }
}

export const login = (user) => {
  return {
    type: types.authLogin,
    payload: user,
  }
}

export const logout = () => {
  return {
    type: types.authLogout,
  }
}
