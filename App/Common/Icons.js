import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const icons = {
  'compose': [MaterialCommunityIcons, 'message-plus', 30, '#000000'],
  'send': [MaterialCommunityIcons, 'send', 30, '#000000'],
  'close': [MaterialCommunityIcons, 'close', 30, '#000000'],
  'reply': [MaterialCommunityIcons, 'reply', 30, '#000000'],
  // Tabs
  'message': [MaterialCommunityIcons, 'message-text-outline', 30, '#000000'],
  'courses': [MaterialCommunityIcons, 'book-open', 30, '#000000']
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
