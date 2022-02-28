import React, { useState } from 'react'
import moment from 'moment'
import Modal from 'react-modal'
import DateTimePicker from 'react-datetime-picker'
import Swal from 'sweetalert2'

import { useDispatch, useSelector } from 'react-redux'
import { uiCloseModal } from '../../actions/ui'

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

export const CalendarModal = () => {
  const dispatch = useDispatch()
  const { modalOpen } = useSelector((state) => state.ui)
  const [startDate, setStartDate] = useState(now.toDate())
  const [endDate, setEndDate] = useState(nowPlus1.toDate())
  const [titleValid, setTitleValid] = useState(true)
  const [formValues, setFormValues] = useState({
    title: '',
    notes: '',
    start: now.toDate(),
    end: nowPlus1.toDate(),
  })
  const { title, notes, start, end } = formValues

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    })
  }

  const closeModal = () => {
    dispatch(uiCloseModal())
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

    setTitleValid(true)
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
      <h1> New Event </h1>
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

        <hr />
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
          <small id="emailHelp" className="form-text text-muted">
            Short description
          </small>
        </div>

        <div className="mb-3">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notes"
            rows="5"
            name="notes"
            value={notes}
            onChange={handleInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            More Information
          </small>
        </div>

        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-outline-primary">
            <i className="far fa-save"></i>
            <span> Save</span>
          </button>
        </div>
      </form>
    </Modal>
  )
}
