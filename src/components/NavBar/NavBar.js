import React, { useEffect, useState } from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import '../styles.css'
import { fetchStaticCountExpsFromAPI } from '../../api/StaticData'
import ChooseDataset from '../chooseDataset/ChooseDataset'

const NavBar = () => {
  const [numExperiences, setNumExperiences] = useState([])

  useEffect(() => {
    const fetchExpCount = async () => {
      try {
        const fetchedData = await fetchStaticCountExpsFromAPI()
        setNumExperiences(fetchedData)
      } catch (error) {
        console.error('Error fetching word cloud data:', error)
      }
    }

    fetchExpCount()
  }, [])

  const generateExperienceItems = () => {
    const { total } = numExperiences
    const items = []

    for (let i = 1; i <= total; i++) {
      items.push(
        <NavDropdown.Item key={i} href={`/experience/${i}`}>
          Experience {i}
        </NavDropdown.Item>
      )
    }
    return items
  }

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container style={{ paddingLeft: '15px', margin: 0 }}>
        <Navbar.Brand href="/"> Multimodal Interaction </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/overview">Overview</Nav.Link>
          <Nav.Link href="/wordcloud">WordCloud</Nav.Link>
          <NavDropdown title="Categories" id="basic-nav-dropdown-categories">
            <NavDropdown.Item href="/types">Types</NavDropdown.Item>
            <NavDropdown.Item href="/eventTypes">Event Types</NavDropdown.Item>
            <NavDropdown title="Experiences" id="basic-nav-dropdown-categories">
              {generateExperienceItems()}
            </NavDropdown>
          </NavDropdown>
          <NavDropdown
            title="Visualizations"
            id="basic-nav-dropdown-visualizations"
          >
            <NavDropdown.Item href="/bubble">Bubble Chart</NavDropdown.Item>
            <NavDropdown.Item href="/sunburst">Sunburst Chart</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default NavBar
