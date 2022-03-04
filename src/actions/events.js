import Swal from 'sweetalert2'
import { fetchWithToken } from '../helpers/fetch'
import { prepareEvents } from '../helpers/prepareEvents'
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

export const startEventLoading = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken('events')
      const body = await resp.json()
      const events = prepareEvents(body.events)

      dispatch(eventLoaded(events))
    } catch (error) {
      console.log(error)
    }
  }
}

export const startEventUpdate = (event) => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken(`events/${event.id}`, event, 'PUT')
      const body = await resp.json()

      if (body.ok) {
        dispatch(eventUpdate(event))
      } else {
        Swal.fire('Error', body.msg, 'error')
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const startEventDeleted = () => {
  return async (dispatch, getState) => {
    const { id } = getState().calendar.activeEvent

    try {
      const resp = await fetchWithToken(`events/${id}`, {}, 'DELETE')
      const body = await resp.json()

      if (body.ok) {
        dispatch(eventDeleted())
      } else {
        Swal.fire('Error', body.msg, 'error')
      }
    } catch (error) {
      console.log(error)
    }
  }
}

const eventLoaded = (events) => {
  return {
    type: types.eventLoaded,
    payload: events,
  }
}

const eventAddNew = (event) => ({
  type: types.eventAddNew,
  payload: event,
})

const eventUpdate = (event) => ({
  type: types.eventUpdated,
  payload: event,
})

const eventDeleted = () => {
  return {
    type: types.eventDeleted,
  }
}

export const eventSetActive = (event) => ({
  type: types.eventSetActive,
  payload: event,
})

export const eventClearActiveEvent = () => ({
  type: types.eventClearActiveEvent,
})

export const eventLogout = () => {
  return {
    type: types.eventLogout,
  }
}
