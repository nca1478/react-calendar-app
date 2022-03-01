import { types } from '../types/types'

export const uiOpenModal = () => ({
  type: types.uiOpenModal,
})

export const uiCloseModal = () => {
  return {
    type: types.uiCloseModal,
  }
}
