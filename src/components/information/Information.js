import React from 'react'
import './../styles.css'

const Information = ({
  dataset,
  totalUsers,
  selectedUsers,
  eventTypeNum,
  typesNumber,
}) => {
  const datasetDuration = totalUsers.reduce(
    (total, user) => total + user.duration,
    0
  )

  const selectedUsersDuration = selectedUsers.reduce(
    (total, user) => total + user.duration,
    0
  )

  const formattedTypes = typesNumber
    .split('\n')
    .map((type, index) => <li key={index}>{type}</li>)

  const formattedEventTypes = eventTypeNum
    .split('\n')
    .map((event, index) => <li key={index}>{event}</li>)

  const datasetInfo = [
    { label: 'Dataset Name', value: dataset },
    {
      label: 'Number of Users',
      value: `${selectedUsers.length} / ${totalUsers.length}`,
    },
    { label: 'Dataset Duration', value: `${datasetDuration} s` },
    { label: "User's Duration", value: `${selectedUsersDuration} s` },
    {
      label: 'Types Information',
      value: (
        <ul className="info-list">
          {formattedTypes.length > 0 ? formattedTypes : 'No types available'}
        </ul>
      ),
    },
    {
      label: 'Event Types Information',
      value: (
        <ul className="info-list">
          {formattedEventTypes.length > 0
            ? formattedEventTypes
            : 'No events available'}
        </ul>
      ),
    },
  ]

  return (
    <div className="info-card">
      <ul className="info-list-container">
        {datasetInfo.map((item, index) => (
          <li key={index} className="info-item">
            <strong>{item.label}:</strong> {item.value}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Information
