import { StyleSheet } from 'react-native'
import { Colors, Containers, Fonts } from '../../Common/index'

export default StyleSheet.create({
  messageSubject: {
    fontWeight: '600',
    fontSize: Fonts.size.regular,
    color: Colors.background,
    paddingBottom: 1,
    paddingLeft: 10,
    alignSelf: 'flex-start',
    flexWrap: 'nowrap'
  },
  messageDate: {
    // fontWeight: '300',
    color: Colors.lightGrey,
    fontSize: Fonts.size.regular,
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    textAlign: 'right',
    paddingRight: 10, // paddingBottom: 10,
    flex: 1
  },
  messageSubtitle: {
    paddingLeft: 10
  },
  messageRightContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1
  },
  messageSubtitleSubject: {
    fontSize: Fonts.size.regular,
    fontWeight: '500',
    paddingBottom: 1,
    alignSelf: 'flex-start',
    color: Colors.ios,
    flex: 0.96
  },
  messageText: {
    alignSelf: 'flex-start',
    fontWeight: '400',
    color: Colors.darkGrey,
    fontSize: Fonts.size.regular
  },
  metaContainer: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10
  },
  fullMessageTextContainer: {
    backgroundColor: Colors.white,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20
  },
  fullMessageText: {
    fontSize: Fonts.size.regular
  },
  fullMessageTitle: {
    fontSize: Fonts.size.regular + 2,
    fontWeight: '600'
  },
  attachmentContainer: {
    padding: 10,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 3,
    borderColor: Colors.lighterGrey,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  attachmentNameSizeContainer: {
    flexDirection: 'column'
  },
  attachmentIcon: {
    marginRight: 10,
    marginLeft: 5
  },
  attachmentName: {
    fontSize: Fonts.size.small
  },
  attachmentSize: {
    textAlign: 'left',
    color: Colors.lightGrey,
    fontSize: Fonts.size.small
  },
  textInput: {
    fontSize: Fonts.size.regular,
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 20,
    paddingBottom: 20
  },
  date: {
    alignSelf: 'center',
    marginRight: 10,
    fontSize: Fonts.size.regular,
    color: Colors.lightGrey
  },
  ...Containers
})
