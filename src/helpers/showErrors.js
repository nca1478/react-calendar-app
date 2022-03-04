import Swal from 'sweetalert2'

export const showErrorStartLogin = (body) => {
  if (body.msg) {
    Swal.fire('Error', body.msg, 'error')
  } else if (body.errors.email) {
    Swal.fire('Error', body.errors.email.msg, 'error')
  } else if (body.errors.password) {
    Swal.fire('Error', body.errors.password.msg, 'error')
  }
}

export const showErrorStartRegister = (body) => {
  if (body.msg) {
    Swal.fire('Error', body.msg, 'error')
  } else if (body.errors.name) {
    Swal.fire('Error', body.errors.name.msg, 'error')
  } else if (body.errors.email) {
    Swal.fire('Error', body.errors.email.msg, 'error')
  } else if (body.errors.password) {
    Swal.fire('Error', body.errors.password.msg, 'error')
  }
}
