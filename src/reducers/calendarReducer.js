import moment from 'moment'
import { types } from '../types/types'

const initialState = {
  events: [
    {
      title: "Nelson's birthday",
      notes: "Nelson's notes",
      start: moment().toDate(),
      end: moment().add(2, 'hours').toDate(),
      user: {
        _id: '123',
        name: 'Nelson',
      },
    },
  ],
  activeEvent: null,
}

export const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.eventAddNew:
      return {
        ...state,
        events: [...state.events, action.payload],
      }

    case types.eventSetActive:
      return {
        ...state,
        activeEvent: action.payload,
      }

    case types.eventClearActiveEvent:
      return {
        ...state,
        activeEvent: null,
      }

    default:
      return state
  }
}
