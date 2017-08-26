import Ionicons from 'react-native-vector-icons/Ionicons'

const icons = {
  'compose': [Ionicons, 'ios-create-outline', 25, '#000000'],
  'send': [Ionicons, 'ios-send-outline', 30, '#000000'],
  'close': [Ionicons, 'ios-close', 35, '#000000'],
  'message': [Ionicons, 'ios-mail-outline', 25, '#000000'],
  'courses': [Ionicons, 'ios-easel-outline', 25, '#000000']
}

let IconsMap = {}

let IconsLoaded = new Promise((resolve, reject) => {
  Promise.all(
    Object.keys(icons).map(iconName =>
      icons[iconName][0].getImageSource(
        icons[iconName][1],
        icons[iconName][2],
        icons[iconName][3]
      ))
  ).then(sources => {
    Object.keys(icons).forEach((iconName, idx) => (IconsMap[iconName] = sources[idx]))
    resolve(true)
  })
  .catch(err => reject(err))
  .done()
})

export {
  IconsMap,
  IconsLoaded
}
