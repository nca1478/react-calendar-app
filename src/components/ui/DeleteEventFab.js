import React from 'react'
import { useDispatch } from 'react-redux'
import { startEventDeleted } from '../../actions/events'

export const DeletedEventFab = () => {
  const dispatch = useDispatch()

  const handleDelete = () => {
    dispatch(startEventDeleted())
  }

  return (
    <button className="btn btn-danger fab-danger" onClick={handleDelete}>
      <i className="fa-solid fa-trash"></i>
      <span> Borrar Evento</span>
    </button>
  )
}
