import React from 'react'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { startLogin, startRegister } from '../../actions/auth'
import useForm from '../../hooks/useForm'
import './LoginScreen.css'

export const LoginScreen = () => {
  const dispatch = useDispatch()
  const [formLoginValues, handleLoginInputChange] = useForm({
    lEmail: '',
    lPassword: '',
  })
  const { lEmail, lPassword } = formLoginValues

  const [formRegisterValues, handleRegisterInputChange] = useForm({
    rName: '',
    rEmail: '',
    rPassword1: '',
    rPassword2: '',
  })
  const { rName, rEmail, rPassword1, rPassword2 } = formRegisterValues

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(startLogin(lEmail, lPassword))
  }

  const handleRegister = (e) => {
    e.preventDefault()

    if (rPassword1 !== rPassword2) {
      Swal.fire('Error', 'Passwords must be equals', 'error')
      return false
    }

    dispatch(startRegister(rName, rEmail, rPassword1))
  }

  return (
    <div className="row m-0 vh-100 justify-content-center align-items-center">
      <div className="col-md-5 col-sm-6">
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          {/* Login Tab */}
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="login-tab"
              data-bs-toggle="tab"
              data-bs-target="#login"
              type="button"
              role="tab"
              aria-controls="login"
              aria-selected="true"
            >
              Login
            </button>
          </li>

          {/* Register Tab */}
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="register-tab"
              data-bs-toggle="tab"
              data-bs-target="#register"
              type="button"
              role="tab"
              aria-controls="register"
              aria-selected="false"
            >
              Register
            </button>
          </li>
        </ul>

        {/* Tab Content */}
        <div className="tab-content" id="myTabContent">
          {/* Login Form */}
          <div
            className="tab-pane fade show active"
            id="login"
            role="tabpanel"
            aria-labelledby="login-tab"
          >
            <div className="login-form-1">
              <h3>Calendar App</h3>
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    id="lEmail"
                    name="lEmail"
                    value={lEmail}
                    onChange={handleLoginInputChange}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    name="lPassword"
                    value={lPassword}
                    onChange={handleLoginInputChange}
                  />
                </div>
                <div className="mb-3">
                  <input type="submit" className="btnSubmit" value="Login" />
                </div>
              </form>
            </div>
          </div>

          {/* Register Form */}
          <div
            className="tab-pane fade"
            id="register"
            role="tabpanel"
            aria-labelledby="register-tab"
          >
            <div className="login-form-2">
              <h3>Register</h3>
              <form onSubmit={handleRegister}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    name="rName"
                    value={rName}
                    onChange={handleRegisterInputChange}
                    autoComplete="off"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    name="rEmail"
                    value={rEmail}
                    onChange={handleRegisterInputChange}
                    autoComplete="off"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    name="rPassword1"
                    value={rPassword1}
                    onChange={handleRegisterInputChange}
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm Password"
                    name="rPassword2"
                    value={rPassword2}
                    onChange={handleRegisterInputChange}
                  />
                </div>

                <div className="mb-3">
                  <input type="submit" className="btnSubmit" value="Register" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
