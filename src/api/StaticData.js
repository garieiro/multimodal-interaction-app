const fetchStaticDataFromAPI = async () => {
  try {
    const response = await fetch('http://localhost:5000/data')
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

export default fetchStaticDataFromAPI
