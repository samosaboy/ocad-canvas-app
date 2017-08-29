import Reactotron from 'reactotron-react-native'

console.tron = Reactotron

Reactotron
  .configure()
  // .configure({ host: '192.168.86.106' })
  .useReactNative()
  .connect()
  .clear()
