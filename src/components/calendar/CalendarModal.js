import React, { useState } from 'react'
import Modal from 'react-modal'
import DateTimePicker from 'react-datetime-picker'
import moment from 'moment'

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
  const [startDate, setStartDate] = useState(now.toDate())
  const [endDate, setEndDate] = useState(nowPlus1.toDate())
  const [formValues, setFormValues] = useState({
    title: '',
    notes: '',
    start: now.toDate(),
    end: nowPlus1.toDate(),
  })
  const { title, notes } = formValues

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    })
  }

  const closeModal = () => {}

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
    console.log(formValues)
  }

  return (
    <Modal
      isOpen={true}
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
            className="form-control"
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
