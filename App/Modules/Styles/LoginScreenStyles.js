import EStyleSheet from 'react-native-extended-stylesheet'
import { Colors, Containers, Fonts } from '../../Common/index'

const styles = EStyleSheet.create({
  switch: {
    fontSize: Fonts.size.regular,
    alignSelf: 'center',
    flex: 1
  },
  input: {
    marginBottom: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: Colors.iosLight,
    borderRadius: 25
  },
  button: {
    padding: 15,
    margin: 0,
    borderRadius: 25,
    backgroundColor: '#3D4AD0',
    alignSelf: 'stretch'
  },
  ...Containers
})

EStyleSheet.build()

export { styles }
