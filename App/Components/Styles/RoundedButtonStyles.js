import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../Common/'

export default StyleSheet.create({
  button: {
    height: 55,
    borderRadius: 15,
    marginHorizontal: Metrics.section,
    marginVertical: Metrics.baseMargin,
    backgroundColor: Colors.fire,
    justifyContent: 'center'
  },
  buttonText: {
    color: Colors.white,
    textAlign: 'center',
    fontWeight: '300',
    fontSize: Fonts.size.button,
    marginVertical: Metrics.baseMargin
  }
})
