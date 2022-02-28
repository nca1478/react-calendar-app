import React from 'react'
import moment from 'moment'
import { Navbar } from '../ui/Navbar'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { messages } from '../../helpers/messages'
import 'react-big-calendar/lib/css/react-big-calendar.css'
// Date Format (es): import 'moment/locale/es', moment.locale('es')

const localizer = momentLocalizer(moment)
const events = [
  {
    title: "Nelson's birthday",
    start: moment().toDate(),
    end: moment().add(2, 'hours').toDate(),
    bgColor: '#fafafa',
  },
]

export const CalendarScreen = () => {
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
      />
    </div>
  )
}
