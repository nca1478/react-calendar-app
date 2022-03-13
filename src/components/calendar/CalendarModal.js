import React, { useEffect, useState } from 'react'
import moment from 'moment'
import Modal from 'react-modal'
import DateTimePicker from 'react-datetime-picker'
import Swal from 'sweetalert2'

import { useDispatch, useSelector } from 'react-redux'
import { uiCloseModal } from '../../actions/ui'
import {
  eventClearActiveEvent,
  startEventAddNew,
  startEventUpdate,
} from '../../actions/events'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

Modal.setAppElement('#root')

const now = moment().minutes(0).seconds(0).add(1, 'hours')
const nowPlus1 = now.clone().add(1, 'hours')

const initEvent = {
  title: '',
  notes: '',
  start: now.toDate(),
  end: nowPlus1.toDate(),
}

export const CalendarModal = () => {
  const dispatch = useDispatch()
  const { modalOpen } = useSelector((state) => state.ui)
  const { activeEvent } = useSelector((state) => state.calendar)
  const [startDate, setStartDate] = useState(now.toDate())
  const [endDate, setEndDate] = useState(nowPlus1.toDate())
  const [titleValid, setTitleValid] = useState(true)
  const [notesValid, setNotesValid] = useState(true)
  const [formValues, setFormValues] = useState(initEvent)
  const { title, notes, start, end } = formValues

  useEffect(() => {
    if (activeEvent) {
      setStartDate(moment(activeEvent.start).toDate())
      setEndDate(moment(activeEvent.end).toDate())
      setFormValues(activeEvent)
    } else {
      setStartDate(now.toDate())
      setEndDate(nowPlus1.toDate())
      setFormValues(initEvent)
    }
  }, [activeEvent, setFormValues])

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    })
  }

  const initForm = () => {
    setFormValues(initEvent)
    setStartDate(now.toDate())
    setEndDate(nowPlus1.toDate())
    setTitleValid(true)
    setNotesValid(true)
  }

  const closeModal = () => {
    dispatch(uiCloseModal())
    dispatch(eventClearActiveEvent())
    initForm()
  }

  const handleStartDateChange = (e) => {
    setStartDate(e)
    setFormValues({ ...formValues, start: e })
  }

  const handleEndDateChange = (e) => {
    setEndDate(e)
    setFormValues({ ...formValues, end: e })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const momentStart = moment(start)
    const momentEnd = moment(end)

    if (momentStart.isSameOrAfter(momentEnd)) {
      return Swal.fire(
        'Error',
        'End date must be greater than start date',
        'error'
      )
    }

    if (title.trim().length < 2) {
      return setTitleValid(false)
    }

    if (notes.trim().length === 0) {
      return setNotesValid(false)
    }

    if (activeEvent) {
      dispatch(startEventUpdate(formValues))
    } else {
      dispatch(startEventAddNew(formValues))
    }

    setTitleValid(true)
    setNotesValid(true)
    closeModal()
  }

  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
      className="modal"
      overlayClassName="modal-background"
    >
      <h1> {!activeEvent ? 'New Event' : 'Edit Event'} </h1>
      <hr />
      <form className="container" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Start date and time</label>
          <DateTimePicker
            onChange={handleStartDateChange}
            value={startDate}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>End date and time</label>
          <DateTimePicker
            onChange={handleEndDateChange}
            value={endDate}
            minDate={startDate}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label>Title and Notes</label>
          <input
            type="text"
            className={`form-control ${!titleValid && 'is-invalid'}`}
            placeholder="Event Title"
            name="title"
            autoComplete="off"
            value={title}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label>Notes</label>
          <textarea
            type="text"
            className={`form-control ${!notesValid && 'is-invalid'}`}
            placeholder="Event Information"
            rows="5"
            name="notes"
            value={notes}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-outline-primary w-50 mx-1">
            <i className="far fa-save"></i>
            <span> Save</span>
          </button>
          <button
            type="button"
            className="btn btn-primary w-50 mx-1"
            onClick={closeModal}
          >
            <i className="far fa-times-circle"></i>
            <span> Close</span>
          </button>
        </div>
      </form>
    </Modal>
  )
}
