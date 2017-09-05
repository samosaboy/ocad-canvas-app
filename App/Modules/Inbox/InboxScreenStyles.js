import { StyleSheet } from 'react-native'
import { Containers, Colors, Fonts } from '../../Common/index'
// import { width } from 'react-native-dimension'

export default StyleSheet.create({
  seeAll: {
    backgroundColor: Colors.white,
    borderTopWidth: 0.5,
    borderTopColor: Colors.iosLight
  },
  messageCount: {
    borderColor: Colors.iosLight,
    borderWidth: 0.5,
    backgroundColor: Colors.transparent,
    marginTop: 2
  },
  messageCountText: {
    color: Colors.lightGrey,
    fontWeight: '400'
  },
  marginBottom: {
    marginBottom: 5
  },
  noMarginBottom: {
    marginBottom: 0
  },
  courseNameSubtitle: {
    color: Colors.ios,
    // fontSize: Fonts.size.small,
    fontWeight: '600',
    paddingTop: 3
  },
  courseNameTitle: {
    fontWeight: '400',
    color: Colors.lightGrey,
    // fontSize: Fonts.size.small,
    paddingBottom: 3
  },
  messageSubject: {
    fontWeight: '400',
    fontSize: 15,
    color: Colors.background,
    paddingBottom: 1,
    paddingLeft: 10,
    alignSelf: 'flex-start',
    flexWrap: 'nowrap',
    flex: 1
  },
  messageDate: {
    // fontWeight: '300',
    color: Colors.lightGrey,
    fontSize: Fonts.size.small,
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    textAlign: 'right',
    paddingRight: 10,
    paddingBottom: 2,
    flex: 1
  },
  messageSubtitle: {
    paddingLeft: 10
  },
  messageSubtitleSubject: {
    fontWeight: '400',
    paddingBottom: 1,
    color: Colors.ios
  },
  messageText: {
    fontWeight: '400',
    color: Colors.darkGrey
  },
  fullMessageText: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20
  },
  fullMessageTitle: {
    fontWeight: '600',
    paddingBottom: 25
  },
  messageHeader: {
    flex: 1,
    flexDirection: 'row'
  },
  messageContentContainer: {
    flexDirection: 'column'
  },
  messageDateContainer: {
    color: Colors.lightGrey,
    justifyContent: 'flex-start',
    paddingBottom: 15
  },
  messageTextContainer: {
    justifyContent: 'flex-start'
  },
  attachmentContainer: {
    padding: 10,
    flexDirection: 'row',
    borderWidth: 0.5,
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
  textLeft: {
    alignItems: 'flex-end'
  },
  textRight: {
    alignItems: 'center'
  },
  conversationThread: {
    borderTopColor: Colors.lighterGrey,
    borderTopWidth: 0
  },
  ...Containers
})
