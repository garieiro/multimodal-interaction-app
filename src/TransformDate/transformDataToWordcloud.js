const transformDataToWordcloud = (data) => {
  const wordCounts = {}

  const processEvent = (event) => {
    if (event.Semantic && event.Semantic.RESULT) {
      const words = event.Semantic.RESULT.split(/\W+/).filter(Boolean)
      words.forEach((word) => {
        word = word.toUpperCase()
        if (wordCounts[word]) {
          wordCounts[word]++
        } else {
          wordCounts[word] = 1
        }
      })
    }
  }

  Object.values(data).forEach((eventArray) => {
    eventArray.forEach((event) => {
      processEvent(event)
    })
  })

  return Object.entries(wordCounts).map(([text, value]) => ({
    text,
    value,
  }))
}

export default transformDataToWordcloud
