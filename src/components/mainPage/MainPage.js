import React, { useEffect, useRef, useState } from 'react'
import { Alert, Button, Container, ListGroup, ListGroupItem } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import {
  fetchStaticAllFilesFromAPI,
  fetchStaticFilteredDataFromAPI,
} from '../../api/StaticData'
import 'font-awesome/css/font-awesome.min.css'

const MainPage = () => {
  const navigate = useNavigate()
  const [dataset, setDataset] = useState([])
  const [saveDataset, setSaveDataset] = useState([])
  const [allUsers, setAllUsers] = useState([])
  const [checkedUsers, setCheckedUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])

  // Warning Submit Data
  const [submitWarn, setSubmitWarn] = useState(false)

  // Control InfoCards
  const [showDataset, setShowDataset] = useState(true)
  const [showDatasetInfo, setShowDatasetInfo] = useState(false)
  const [showDataUsers, setShowDatasetUsers] = useState(false)

  // Control Disable Buttons
  const [disableAllUsers, setDisableAllUsers] = useState(false)
  const [enableAllUsers, setEnableAllUsers] = useState(true)

  // Get All Datasets
  useEffect(() => {
    const fetchDataset = async () => {
      try {
        const fetchedDataset = await fetchStaticAllFilesFromAPI()
        if (Array.isArray(fetchedDataset) && fetchedDataset.length === 0) {
          setShowDataset(false)
        }
        setDataset(fetchedDataset)
      } catch (error) {
        console.error('Error fetching Dataset:', error)
      }
    }

    fetchDataset().catch((error) =>
      console.error('Error fetching Dataset:', error)
    )
  }, [])

  // Fromat Dataset Name -> Remove .json
  const formatDatasetName = (filename) => {
    const nameWithoutExtension = filename.replace('.json', '')
    return nameWithoutExtension
      .replace(/^dataset/i, 'Dataset')
      .replace(/(\d+)/, ' $1')
  }

  // Click no dataset e mostra a info e os users
  const handleDatasetClick = async (datasetName) => {
    setSaveDataset(datasetName)
    try {
      const fetchedUsersData = await fetchStaticAllFilesFromAPI(datasetName)
      if (fetchedUsersData.length === 0) {
        setShowDatasetInfo(false)
        return
      }
      setAllUsers(fetchedUsersData || [])
      setShowDatasetUsers(true)
      setCheckedUsers([])
      setFilteredUsers([])
      setSaveDataset(datasetName)
      setShowDatasetInfo(true)
    } catch (error) {
      console.error('Error fetching Users Data:', error)
    }
  }

  const handleCheckboxChange = (user) => {
    setCheckedUsers((prevCheckedUsers) => {
      const isChecked = prevCheckedUsers.includes(user)
      const updatedUsers = isChecked
        ? prevCheckedUsers.filter((u) => u !== user)
        : [...prevCheckedUsers, user]
      transformUsers(updatedUsers)

      if (updatedUsers.length === allUsers.length) {
        setEnableAllUsers(false)
        setDisableAllUsers(true)
      } else {
        setEnableAllUsers(true)
        setDisableAllUsers(false)
      }

      return updatedUsers
    })
  }

  const handleSelectAllUsers = (allUsers) => {
    transformUsers(allUsers)
    setCheckedUsers(allUsers)
    setDisableAllUsers(true)
  }

  const handleDisableAllUsers = () => {
    setDisableAllUsers(false)
    setEnableAllUsers(true)
    setCheckedUsers([])
    setFilteredUsers([])
  }

  const transformUsers = (checkedUsers) => {
    const transformedUsers = checkedUsers.map((userObj) => {
      const userName = userObj.user
      return userName.replace(/\D/g, '')
    })
    setFilteredUsers(transformedUsers)
  }

  const handleSubmitClick = async (datasetName) => {
    if (checkedUsers.length === 0) {
      setSubmitWarn(true)
      setTimeout(() => {
        setSubmitWarn(false)
      }, 5000)
      return
    }
    try {
      const fetchedFilteredData = await fetchStaticFilteredDataFromAPI(
        datasetName,
        filteredUsers
      )
      const updatedData = fetchedFilteredData || []
      const currentDataset =
        dataset.find((d) => d.dataset === datasetName) || {}
      const datasetInformation = datasetFile(currentDataset)

      const numberOfTypes = datasetInformation.find(
        (item) => item.label === 'Number of Types'
      ).value

      const numberOfEventTypes = datasetInformation.find(
        (item) => item.label === 'Number of Event Types'
      ).value

      navigate('/overview', {
        state: {
          receivedData: updatedData,
          dataset: datasetName,
          totalUsers: allUsers,
          selectedUsers: checkedUsers,
          eventTypeNum: numberOfEventTypes,
          typesNumber: numberOfTypes,
        },
      })
    } catch (error) {
      console.error('Error fetching Filtered data:', error)
    }
  }

  const datasetFile = (file) => [
    {
      label: 'Name',
      value: file.dataset ? file.dataset : 'No dataset Name',
    },
    {
      label: 'Number of Users',
      value: file.users ? file.users : '0',
    },
    {
      label: 'Dataset Time',
      value: file.total_duration ? `${file.total_duration} s` : '0 s',
    },
    {
      label: 'Number of Types',
      value: file.type_counts ? formatObject(file.type_counts) : 'No data',
    },
    {
      label: 'Number of Event Types',
      value: file.event_type_counts
        ? formatObject(file.event_type_counts)
        : 'No data',
    },
  ]

  const formatObject = (obj) => {
    return Object.entries(obj)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n')
  }

  const sortedDataset = dataset.sort((first, second) =>
    first.dataset.localeCompare(second.dataset)
  )

  return (
    <div className="main-container">
      <div className="title">
        <h1 className="title-text">
          Visualization and Analysis <br /> of <br /> Multimodal Interaction
        </h1>
      </div>

      <div className="grid-container">
        <div className="grid-item">
          <Container className="centered-container">
            {showDataset ? (
              <ListGroup className="scrollable-list">
                {sortedDataset.map((file, index) => (
                  <ListGroupItem
                    key={index}
                    action
                    tag="button"
                    onClick={() => handleDatasetClick(file.dataset)}
                    className="dataset-list-item"
                  >
                    {formatDatasetName(file.dataset)}
                  </ListGroupItem>
                ))}
              </ListGroup>
            ) : (
              <p>No datasets available</p>
            )}
          </Container>
        </div>

        <div className="grid-item">
          {showDatasetInfo ? (
            <Container className="centered-container">
              <ListGroup className="scrollable-list">
                {datasetFile(
                  dataset.find((d) => d.dataset === saveDataset) || {}
                ).map((info, index) => (
                  <ListGroupItem key={index}>
                    <strong>{info.label}:</strong>
                    <pre
                      className="text-muted"
                      style={{ whiteSpace: 'pre-wrap', margin: '0' }}
                    >
                      {info.value}
                    </pre>
                  </ListGroupItem>
                ))}
              </ListGroup>
            </Container>
          ) : (
            <p>No info Available</p>
          )}
        </div>

        <div className="grid-item">
          {showDataUsers ? (
            <Container className="centered-container">
              <ListGroup className="scrollable-list">
                {allUsers.map((user, index) => (
                  <ListGroupItem key={index} className="user-item">
                    <div className="user-info">
                      <input
                        type="checkbox"
                        checked={checkedUsers.includes(user)}
                        onChange={() => handleCheckboxChange(user)}
                      />
                      <div className="user-details">
                        <div className="user-name">{user.user}</div>
                        <div className="user-duration">
                          Duration: {user.duration} seconds
                        </div>
                      </div>
                    </div>
                  </ListGroupItem>
                ))}
              </ListGroup>
              <div className="buttons-container">
                <div className="buttons-selected-container">
                  {enableAllUsers && (
                    <div className="selectAll-container">
                      <Button
                        color="secondary"
                        onClick={() => handleSelectAllUsers(allUsers)}
                      >
                        Select All
                      </Button>
                    </div>
                  )}
                  {disableAllUsers && (
                    <div className="disableAll-container">
                      <Button
                        color="secondary"
                        onClick={() => handleDisableAllUsers()}
                      >
                        Disable
                      </Button>
                    </div>
                  )}
                </div>
                <div className="submit-container">
                  <Button
                    color="primary"
                    onClick={() => handleSubmitClick(saveDataset)}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </Container>
          ) : (
            <p>No users available</p>
          )}
        </div>
      </div>
      <div className="alert-container">
        {submitWarn && (
          <Alert color="warning" className="alert-position">
            <i className="fa fa-warning" style={{ marginRight: '10px' }}></i>
            You have to select at least one user
          </Alert>
        )}
      </div>
    </div>
  )
}

export default MainPage
