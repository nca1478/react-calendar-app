import React, { useState } from 'react'
import moment from 'moment'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { useDispatch } from 'react-redux'

import { Navbar } from '../ui/Navbar'
import { messages } from '../../helpers/messages'
import { CalendarEvent } from './CalendarEvent'
import { CalendarModal } from './CalendarModal'
import { uiOpenModal } from '../../actions/ui'
import 'react-big-calendar/lib/css/react-big-calendar.css'
// Date Format (es): import 'moment/locale/es', moment.locale('es')

const localizer = momentLocalizer(moment)
const events = [
  {
    title: "Nelson's birthday",
    start: moment().toDate(),
    end: moment().add(2, 'hours').toDate(),
    bgColor: '#fafafa',
    user: {
      _id: '123',
      name: 'Nelson',
    },
  },
]

export const CalendarScreen = () => {
  const dispatch = useDispatch()
  const [lastView, setLastView] = useState(
    localStorage.getItem('lastView') || 'month'
  )

  const onDoubleClick = (e) => {
    dispatch(uiOpenModal())
  }

  const onSelectEvent = (e) => {
    // console.log(e)
  }

  const onViewChange = (e) => {
    setLastView(e)
    localStorage.setItem('lastView', e)
  }

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: '#367CF7',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white',
    }

    return { style }
  }

  return (
    <div className="calendar-screen">
      <Navbar />

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
        view={lastView}
        components={{
          event: CalendarEvent,
        }}
      />
      <CalendarModal />
    </div>
  )
}
