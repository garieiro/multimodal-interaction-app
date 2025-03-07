const transformDataToSunburst = (data) => {
  const hierarchy = {
    name: 'Users',
    children: [],
  }

  Object.entries(data).forEach(([userId, events]) => {
    const userNode = {
      name: `User ${userId}`,
      children: [],
    }

    const eventTypes = {}

    events.forEach((event) => {
      const { Type, EventType, Start, End } = event
      const duration = new Date(End).getTime() - new Date(Start).getTime()

      if (!eventTypes[Type]) {
        eventTypes[Type] = {}
      }
      if (eventTypes[Type][EventType]) {
        eventTypes[Type][EventType] += duration
      } else {
        eventTypes[Type][EventType] = duration
      }
    })

    Object.entries(eventTypes).forEach(([type, typeEvents]) => {
      const typeNode = {
        name: type,
        children: [],
      }

      Object.entries(typeEvents).forEach(([eventType, duration]) => {
        typeNode.children.push({ name: eventType, value: duration })
      })

      userNode.children.push(typeNode)
    })

    hierarchy.children.push(userNode)
  })
  return hierarchy
}

export default transformDataToSunburst
