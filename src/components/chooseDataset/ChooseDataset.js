import React, { useState } from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import ReadDataset from './ReadDataset'

const ChooseDataset = ({ title }) => {
  const { dataLoaded, datasetData } = ReadDataset()
  const [errorMessage, setErrorMessage] = useState('')

  const handleSelect = (eventKey) => {
    fetch(`http://127.0.0.1:5000/select-file?file_name=${eventKey}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          console.log('File set:', data)
          setErrorMessage('')
        } else {
          console.error('Error setting file:', data.message)
          setErrorMessage(data.message)
        }
      })
      .catch((error) => {
        console.error('Error setting file:', error)
        setErrorMessage('An error occurred while setting the file.')
      })
  }

  return (
    <div>
      <Navbar expand="lg" className={'custom-navbar'}>
        <Container fluid>
          <Navbar.Brand href="#home">{title}</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-dark-example" />
          <Navbar.Collapse id="navbar-dark-example">
            <Nav className="ms-auto">
              <NavDropdown
                id="nav-dropdown-dark-example"
                title="Choose a Dataset"
                onSelect={handleSelect}
              >
                {dataLoaded &&
                  datasetData.map((file, index) => (
                    <NavDropdown.Item key={index} eventKey={file}>
                      {file}
                    </NavDropdown.Item>
                  ))}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  )
}

export default ChooseDataset
