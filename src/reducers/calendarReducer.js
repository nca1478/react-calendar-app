import { types } from '../types/types'

// {
//   id: '1223434534678',
//   title: "Nelson's birthday",
//   notes: "Nelson's notes",
//   start: moment().toDate(),
//   end: moment().add(2, 'hours').toDate(),
//   user: {
//     _id: '34521343267658',
//     name: 'Nelson',
//   },
// },

const initialState = {
  events: [],
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

    case types.eventUpdated:
      return {
        ...state,
        events: state.events.map((event) =>
          event.id === action.payload.id ? action.payload : event
        ),
      }

    case types.eventDeleted:
      return {
        ...state,
        events: state.events.filter(
          (event) => event.id !== state.activeEvent.id
        ),
        activeEvent: null,
      }

    case types.eventLoaded:
      return {
        ...state,
        events: [...action.payload],
      }

    default:
      return state
  }
}
