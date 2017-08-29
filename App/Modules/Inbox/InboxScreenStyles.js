import { StyleSheet } from 'react-native'
import { Containers, Colors, Fonts } from '../../Common/index'
// import { width } from 'react-native-dimension'

export default StyleSheet.create({
  messageContainer: {
    backgroundColor: Colors.white,
    borderTopWidth: 0,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.lighterGrey,
    paddingBottom: 10
  },
  seeAll: {
    backgroundColor: Colors.white,
    borderTopWidth: 0,
    borderTopColor: Colors.ios
  },
  messageCount: {
    borderColor: Colors.lightGrey,
    borderWidth: 1,
    backgroundColor: Colors.transparent,
    marginTop: 2
  },
  messageCountText: {
    color: Colors.lightGrey,
    fontWeight: '400'
  },
  marginBottom: {
    marginBottom: 15
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
    fontSize: 14,
    color: Colors.background
  },
  messageSubtitle: {
    paddingLeft: 10
  },
  messageSubtitleSubject: {
    fontWeight: '400',
    color: Colors.ios
  },
  messageText: {
    fontWeight: '300',
    color: Colors.darkGrey
  },
  fullMessageText: {
    padding: 20
  },
  fullMessageTitle: {
    fontWeight: '600',
    paddingBottom: 15
  },
  messageHeader: {
    flex: 1,
    flexDirection: 'row'
  },
  messageContentContainer: {
    flexDirection: 'column',
    paddingTop: 15,
    paddingBottom: 25
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
