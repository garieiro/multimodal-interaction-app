import React from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap'
import '../styles.css'

const Sidebar = ({ isOpen, onClose, dataset, totalUsers, selectedUsers }) => {
  const datasetDuration = totalUsers.reduce(
    (total, user) => total + user.duration,
    0
  )

  const selectedUsersDuration = selectedUsers.reduce(
    (total, user) => total + user.duration,
    0
  )

  const datasetInfo = [
    { label: 'Dataset Name', value: dataset },
    {
      label: 'Number of Users',
      value: `${selectedUsers.length} / ${totalUsers.length}`,
    },
    { label: 'Dataset Duration', value: `${datasetDuration} s` },
    { label: "User's Duration", value: `${selectedUsersDuration} s` },
  ]
  return (
    isOpen && (
      <div onMouseMove={(e) => e.clientX > 250 && onClose()}>
        <div className="sidebar" onMouseLeave={onClose}>
          <div className="sidebar-header">
            <h2>Menu</h2>
          </div>
          <Nav vertical style={{ marginBottom: '40px' }}>
            <NavItem>
              <NavLink href="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/overview">Dashboard</NavLink>
            </NavItem>
          </Nav>
          <div className="sidebar-section-info">
            <h3>Dataset Info</h3>
          </div>
          <Nav vertical style={{ marginBottom: '40px' }}>
            {datasetInfo.map((item, index) => (
              <NavItem key={index}>
                <div className="info-item">
                  <span style={{ color: 'burlywood' }} className="label">
                    {item.label}:{' '}
                  </span>
                  <span className="value">{item.value}</span>
                </div>
              </NavItem>
            ))}
          </Nav>
        </div>
      </div>
    )
  )
}

export default Sidebar
