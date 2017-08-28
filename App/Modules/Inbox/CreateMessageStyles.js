import { StyleSheet } from 'react-native'
import { Containers, Colors, Fonts } from '../../Common/index'
import { width, height } from 'react-native-dimension'

export default StyleSheet.create({
  lightBoxContainer: {
    width: width(100),
    height: height(100),
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textError: {
    fontSize: Fonts.size.small,
    color: Colors.lightGrey,
    marginLeft: 10
  },
  textLabel: {
    fontSize: Fonts.size.medium,
    marginLeft: 0
  },
  textInput: {
    fontSize: Fonts.size.medium + 3,
    width: width(100),
    height: height(60),
    maxHeight: height(100),
    paddingLeft: 10,
    paddingTop: 10
  },
  lightBoxList: {
    marginTop: 0,
    marginLeft: 0,
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.lighterGrey
  },
  lightBoxContent: {
    alignSelf: 'center',
    marginTop: 0,
    backgroundColor: Colors.white,
    borderRadius: 5,
    width: width(80),
    maxHeight: 350
  },
  lightBoxIcon: {
    position: 'absolute',
    left: 15,
    top: 20
  },
  ...Containers
})
