// Dependencias
import React from 'react'
import { useDispatch } from 'react-redux'

// Actions
import { uiOpenModal } from '../../actions/ui'

export const AddNewFab = () => {
  const dispatch = useDispatch()

  const handleClickNew = () => {
    dispatch(uiOpenModal())
  }

  return (
    <button className="btn btn-primary fab" onClick={handleClickNew}>
      <i className="fa-solid fa-plus"></i>
    </button>
  )
}
