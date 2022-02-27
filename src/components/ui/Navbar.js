import React from 'react'

export const Navbar = () => {
  return (
    <div className="navbar navbar-dark bg-dark mb-4">
      <div className="container-fluid">
        <span className="navbar-brand">Nelson</span>

        <button className="btn btn-outline-danger">
          <i class="fa-solid fa-right-from-bracket"></i>
          <span> Salir</span>
        </button>
      </div>
    </div>
  )
}
