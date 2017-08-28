import Reactotron from 'reactotron-react-native'

console.tron = Reactotron

Reactotron
  .configure()
  .useReactNative()
  .connect()
  .clear()
