import { StyleSheet } from 'react-native'
import { Containers, Colors, Fonts } from '../../Common/index'
import { width, height } from 'react-native-dimension'

export default StyleSheet.create({
  lightBoxContainer: {
    width: width(100),
    height: height(100),
    alignItems: 'center',
    justifyContent: 'center'
  },
  textError: {
    color: Colors.black,
    marginLeft: 10
  },
  textLabel: {
    fontSize: Fonts.size.input,
    marginLeft: 0
  },
  textCenter: {
    textAlign: 'center'
  },
  textBold: {
    fontWeight: '500'
  },
  lightBoxListLabel: {
    // fontSize: Fonts.size.small,
    color: Colors.lightGrey,
    alignSelf: 'center'
  },
  lightBoxList: {
    marginTop: 0,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 11,
    paddingLeft: 0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lighterGrey
  },
  lightBoxListWider: {
    paddingTop: 20,
    paddingBottom: 20
  },
  lightBoxContent: {
    marginTop: 5,
    backgroundColor: Colors.iosTranslucent,
    borderRadius: 15,
    width: width(96),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  lightBoxContentFullContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
    paddingBottom: 15
  },
  lightBoxIcon: {
    position: 'absolute',
    left: 15,
    top: 20
  },
  courseActivityText: {
    paddingTop: 10
  },
  courseActivityTitle: {
    fontSize: Fonts.size.regular
  },
  courseActivityDate: {
    color: Colors.lightGrey
  },
  textInput: {
    fontSize: Fonts.size.regular,
    // width: width(100),
    // height: height(100)
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 10
  },
  destroy: {
    color: Colors.fire,
    fontWeight: '600'
  },
  close: {
    color: Colors.blue,
    fontWeight: '600'
  },
  ...Containers
})
