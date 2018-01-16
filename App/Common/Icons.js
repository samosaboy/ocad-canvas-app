import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const icons = {
  'compose': [MaterialCommunityIcons, 'message-plus', 30, '#8E8E93'],
  'send': [MaterialCommunityIcons, 'send', 30, '#8E8E93'],
  'close': [MaterialCommunityIcons, 'close', 30, '#8E8E93'],
  'reply': [MaterialCommunityIcons, 'reply', 30, '#8E8E93'],
  'options': [MaterialCommunityIcons, 'dots-vertical', 30, '#8E8E93'],
  'type': [MaterialCommunityIcons, 'calendar-multiple', 30, '#8E8E93'],
  'people': [MaterialCommunityIcons, 'account-multiple', 30, '#8E8E93'],
  'delete': [MaterialCommunityIcons, 'delete', 25, '#8E8E93'],
  'share': [MaterialCommunityIcons, 'share-variant', 25, '#8E8E93'],

  // Tabs
  'messages': [MaterialCommunityIcons, 'email', 30, '#8E8E93'],
  'courses': [MaterialCommunityIcons, 'book-open', 30, '#8E8E93'],
  'profile': [MaterialCommunityIcons, 'account-circle', 30, '#8E8E93']
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
