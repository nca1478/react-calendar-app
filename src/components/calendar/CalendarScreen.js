import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar } from '../ui/Navbar'
import { messages } from '../../helpers/messages'
import { CalendarEvent } from './CalendarEvent'
import { CalendarModal } from './CalendarModal'
import { uiOpenModal } from '../../actions/ui'
import {
  eventClearActiveEvent,
  eventSetActive,
  startEventLoading,
} from '../../actions/events'
import { AddNewFab } from '../ui/AddNewFab'
import { DeletedEventFab } from '../ui/DeleteEventFab'
// Date Format (es): import 'moment/locale/es', moment.locale('es')

const localizer = momentLocalizer(moment)

export const CalendarScreen = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const { events, activeEvent } = useSelector((state) => state.calendar)
  const { uid } = useSelector((state) => state.auth)
  const [lastView, setLastView] = useState(
    localStorage.getItem('lastView') || 'month'
  )

  useEffect(() => {
    if (events) {
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }
  }, [events])

  useEffect(() => {
    dispatch(startEventLoading())
  }, [dispatch])

  const onDoubleClick = () => {
    dispatch(uiOpenModal())
  }

  const onSelectEvent = (e) => {
    dispatch(eventSetActive(e))
  }

  const onViewChange = (e) => {
    setLastView(e)
    localStorage.setItem('lastView', e)
  }

  const onSelectSlot = (e) => {
    dispatch(eventClearActiveEvent())
  }

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: uid === event.user._id ? '#367CF7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white',
    }

    return { style }
  }

  if (loading) {
    return (
      <div className="preloader-container">
        <div className="preloader"></div>
      </div>
    )
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
        onSelectSlot={onSelectSlot}
        selectable={true}
        view={lastView}
        components={{
          event: CalendarEvent,
        }}
      />

      <AddNewFab />

      {activeEvent && <DeletedEventFab />}

      <CalendarModal />
    </div>
  )
}
