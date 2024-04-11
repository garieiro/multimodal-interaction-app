import socketIOClient from 'socket.io-client'

const ENDPOINT = 'http://localhost:8000'

const KafkaDataReceiver = (onDataReceived) => {
  const socket = socketIOClient(ENDPOINT)

  socket.on('connect', () => {
    console.log('Connected to server')
  })

  socket.on('data_response', (data) => {
    console.log('Received data:', data)
    onDataReceived(data)
  })

  socket.on('disconnect', () => {
    console.log('Disconnected from server')
  })

  return socket
}

export default KafkaDataReceiver
