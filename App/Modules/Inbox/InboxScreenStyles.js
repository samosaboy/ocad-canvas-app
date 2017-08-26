import { StyleSheet } from 'react-native'
import { Containers, Colors, Fonts } from '../../Common/index'
import { width } from 'react-native-dimension'

export default StyleSheet.create({
  messageContainer: {
    backgroundColor: Colors.white,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.lighterGrey,
    padding: 0
  },
  seeAll: {
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: '#CBD2D9'
  },
  messageCount: {
    borderColor: Colors.lightGrey,
    borderWidth: 1,
    backgroundColor: Colors.transparent,
    marginTop: 2
  },
  messageCountText: {
    color: Colors.lightGrey,
    fontWeight: '600'
  },
  marginBottom: {
    marginBottom: 15
  },
  noMarginBottom: {
    marginBottom: 0
  },
  courseNameSubtitle: {
    color: Colors.lightGrey,
    fontSize: Fonts.size.small,
    paddingTop: 3
  },
  courseNameTitle: {
    color: Colors.ios,
    fontSize: Fonts.size.medium + 3,
    fontWeight: '600',
    paddingBottom: 3
  },
  messageSubject: {
    fontWeight: '600',
    color: Colors.background
  },
  messageSubtitle: {
    paddingLeft: 10
  },
  messageSubtitleSender: {
    fontWeight: '500',
    color: Colors.ios
  },
  messageText: {
    fontWeight: '400',
    color: Colors.ios
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
  lightBoxContainer: {
    width: width(100)
  },
  textLabel: {
    fontSize: Fonts.size.medium,
    marginLeft: 0
  },
  textInput: {
    fontSize: Fonts.size.medium,
    width: width(100),
    height: 200,
    paddingLeft: 0
  },
  ...Containers
})
