export const fetchStaticAllFilesFromAPI = async (dataset) => {
  try {
    const url = dataset
      ? `http://127.0.0.1:5000/files?dataset=${dataset}`
      : 'http://127.0.0.1:5000/files'
    const response = await fetch(url)
    return await response.json()
  } catch (error) {
    console.error('Error fetching All files', error)
    throw error
  }
}

export const fetchStaticFilteredDataFromAPI = async (dataset, users) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:5000/submit?dataset=${dataset}&users=${users}`
    )
    return await response.json()
  } catch (error) {
    console.error('Error fetching Filtered data:', error)
  }
}

// Fim da lista

export const fetchStaticTimeLineFromAPI = async (experienceId = null) => {
  try {
    const url = experienceId
      ? `http://127.0.0.1:5000/events/times?exp_id=${experienceId}`
      : 'http://127.0.0.1:5000/events/times'

    const response = await fetch(url)
    return await response.json()
  } catch (error) {
    console.error('Error fetching Count Experiences:', error)
  }
}
