import Swal from 'sweetalert2'
import { fetchWithToken } from '../helpers/fetch'
import { types } from '../types/types'

export const startEventAddNew = (event) => {
  return async (dispatch, getState) => {
    const { uid, name } = getState().auth

    try {
      const resp = await fetchWithToken('events', event, 'POST')
      const body = await resp.json()

      if (body.ok) {
        event.id = body.event.id
        event.user = {
          _id: uid,
          name,
        }

        dispatch(eventAddNew(event))
      } else {
        Swal.fire('Error', 'Error creating new event', 'error')
      }
    } catch (error) {
      console.log(error)
    }
  }
}

const eventAddNew = (event) => ({
  type: types.eventAddNew,
  payload: event,
})

export const eventSetActive = (event) => ({
  type: types.eventSetActive,
  payload: event,
})

export const eventClearActiveEvent = () => ({
  type: types.eventClearActiveEvent,
})

export const eventUpdated = (event) => ({
  type: types.eventUpdated,
  payload: event,
})

export const eventDeleted = () => {
  return {
    type: types.eventDeleted,
  }
}
