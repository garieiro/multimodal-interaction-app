export const fetchAllStaticDataFromAPI = async () => {
  try {
    const response = await fetch('http://127.0.0.1:5000/events')
    return await response.json()
  } catch (error) {
    console.error('Error fetching All Data:', error)
  }
}

export const fetchStaticTypesDataFromAPI = async () => {
  try {
    const response = await fetch('http://127.0.0.1:5000/events/types')
    return await response.json()
  } catch (error) {
    console.error('Error fetching All Types:', error)
  }
}

export const fetchStaticAllExperiencesFromAPI = async () => {
  try {
    const response = await fetch('http://127.0.0.1:5000/events/total')
    return await response.json()
  } catch (error) {
    console.error('Error fetching Types Count:', error)
  }
}

export const fetchStaticEventTypesDataFromAPI = async () => {
  try {
    const response = await fetch('http://127.0.0.1:5000/events/eventTypes')
    return await response.json()
  } catch (error) {
    console.error('Error fetching All Event Types:', error)
  }
}

export const fetchSunBurstFromAPI = async () => {
  try {
    const response = await fetch('http://127.0.0.1:5000/events/exps')
    return await response.json()
  } catch (error) {
    console.error('Failed to fetch sunburst data:', error)
    throw error
  }
}

export const fetchBoxPlotFromAPI = async () => {
  try {
    const response = await fetch('http://127.0.0.1:5000/events/expDurations')
    return await response.json()
  } catch (error) {
    console.error('Error fetching Box Plot:', error)
  }
}

export const fetchStaticCountWordsFromAPI = async (expIndex) => {
  try {
    const response = await fetch('http://127.0.0.1:5000/events/words')
    return await response.json()
  } catch (error) {
    console.error('Error fetching words:', error)
    throw error
  }
}

export const fetchStaticSankeyFromAPI = async (expIndex) => {
  try {
    const url =
      expIndex !== undefined
        ? `http://127.0.0.1:5000/events/sankey?exp=${expIndex}`
        : 'http://127.0.0.1:5000/events/sankey'

    const response = await fetch(url)

    return await response.json()
  } catch (error) {
    console.error('Error fetching sankey Data:', error)
    throw error
  }
}

export const fetchCountForAllTypesFromAPI = async () => {
  try {
    const types = await fetchStaticTypesDataFromAPI()

    const countByType = []

    await Promise.all(
      types.map(async (type) => {
        const response = await fetch(
          `http://127.0.0.1:5000/events/count?type=${type}`
        )
        const countData = await response.json()
        const count = countData[type]

        countByType.push({ type, count })
      })
    )

    return countByType
  } catch (error) {
    console.error('Error fetching Count for All Types:', error)
    return null
  }
}

export const fetchCountForAllEventTypesFromAPI = async () => {
  try {
    const eventTypes = await fetchStaticEventTypesDataFromAPI()

    const countByEventType = []

    await Promise.all(
      eventTypes.map(async (type) => {
        const response = await fetch(
          `http://127.0.0.1:5000/events/count?eventType=${type}`
        )
        const countData = await response.json()
        const count = countData[type]

        countByEventType.push({ type, count })
      })
    )

    return countByEventType
  } catch (error) {
    console.error('Error fetching Count for All Events Types:', error)
    return null
  }
}

export const fetchStaticCountExpsFromAPI = async () => {
  try {
    const response = await fetch('http://127.0.0.1:5000/events/expCount')
    return await response.json()
  } catch (error) {
    console.error('Error fetching Count Experiences:', error)
  }
}

export const fetchStaticPiesFromAPI = async () => {
  try {
    const response = await fetch('http://127.0.0.1:5000/events/pie-chart')
    return await response.json()
  } catch (error) {
    console.error('Error fetching Count Experiences:', error)
  }
}

export const fetchStaticPies2FromAPI = async () => {
  try {
    const response = await fetch('http://127.0.0.1:5000/events/type-semantic')
    return await response.json()
  } catch (error) {
    console.error('Error fetching Count Experiences:', error)
  }
}

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

export const fetchStaticAllTypesFromAPI = async () => {
  try {
    const response = await fetch('http://127.0.0.1:5000/events/count/types')
    return await response.json()
  } catch (error) {
    console.error('Error fetching Types Count:', error)
  }
}

export const fetchStaticAllFilesFromAPI = async () => {
  try {
    const response = await fetch('http://127.0.0.1:5000/files')
    return await response.json()
  } catch (error) {
    console.error('Error fetching All files', error)
  }
}
