import Swal from 'sweetalert2'
import { types } from '../types/types'
import { fetchWithoutToken } from '../helpers/fetch'

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
      Swal.fire('Error', body.msg, 'error')
    }
  }
}

export const login = (user) => {
  return {
    type: types.authLogin,
    payload: user,
  }
}
