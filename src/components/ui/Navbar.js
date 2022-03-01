import React from 'react'

export const Navbar = () => {
  return (
    <div className="navbar navbar-dark bg-dark mb-4">
      <div className="container-fluid">
        <span className="navbar-brand">CalendarApp</span>

        <button className="btn btn-outline-danger">
          <i className="fa-solid fa-right-from-bracket"></i>
          <span> Logout</span>
        </button>
      </div>
    </div>
  )
}
