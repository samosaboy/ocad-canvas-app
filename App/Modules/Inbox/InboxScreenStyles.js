import { StyleSheet } from 'react-native'
import { Containers, Colors, Fonts } from '../../Common/index'
// import { width, height, totalSize } from 'react-native-dimension'

export default StyleSheet.create({
  messageContainer: {
    backgroundColor: Colors.white,
    padding: 0
  },
  seeAll: {
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: '#CBD2D9'
  },
  messageCount: {
    backgroundColor: Colors.blue,
    marginTop: 2
  },
  marginBottom: {
    marginBottom: 15
  },
  noMarginBottom: {
    marginBottom: 0
  },
  courseNameSubtitle: {
    color: Colors.lightGrey,
    fontSize: Fonts.size.small
  },
  courseNameTitle: {
    color: Colors.ios,
    fontSize: Fonts.size.medium + 2,
    fontWeight: '400'
  },
  messageSubject: {
    fontWeight: '600',
    color: Colors.ios
  },
  messageSubtitle: {
    paddingLeft: 10
  },
  messageSubtitleSender: {
    fontWeight: '400',
    color: Colors.charcoal
  },
  messageText: {
    fontWeight: '400'
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
