/* eslint-disable import/prefer-default-export */

import { Navigation } from 'react-native-navigation'
import CoursesScreen from '../Modules/Courses/CoursesScreen'

import InboxScreen from '../Modules/Inbox/InboxScreen'
import SingleCourseView from '../Modules/Courses/CoursesScreenSingle'
import CoursesScreenSinglePeople from '../Modules/Courses/CoursesScreenSinglePeople'
import CourseScreenSingleActivitySingle from '../Modules/Courses/CoursesScreenSingleActivitySingle'
import CoursesScreenSingleAnnouncements from '../Modules/Courses/CoursesScreenSingleAnnouncements'
import CoursesScreenSingleAnnouncementsSingle from '../Modules/Courses/CoursesScreenSingleAnnouncementsSingle'
import CoursesScreenSingleDiscussions from '../Modules/Courses/CoursesScreenSingleDiscussions'
import CoursesScreenSingleDiscussionsSingle from '../Modules/Courses/CoursesScreenSingleDiscussionsSingle'
import CoursesScreenSingleSyllabus from '../Modules/Courses/CoursesScreenSingleSyllabus'
import CoursesScreenSingleAssignments from '../Modules/Courses/CoursesScreenSingleAssignments'
import CoursesScreenSingleAssignmentsSingle from '../Modules/Courses/CoursesScreenSingleAssignmentsSingle'
import CoursesScreenSingleFiles from '../Modules/Courses/CoursesScreenSingleFiles'
import CoursesScreenSingleFolder from '../Modules/Courses/CoursesScreenSingleFolder'
import CoursesScreenSingleGrades from '../Modules/Courses/CoursesScreenSingleGrades'
import CoursesScreenSingleGradesSingle from '../Modules/Courses/CoursesScreenSingleGradesSingle'
import SingleConversationView from '../Modules/Inbox/InboxScreenSingle'
import SingleConversationReply from '../Modules/Inbox/InboxScreenSingleReply'
import SingleConversationViewListParticipants from '../Modules/Inbox/InboxScreenSingleAllParticipants'

import CreateMessage from '../Modules/Inbox/CreateMessage'
import CreateMessageSelectCourse from '../Modules/Inbox/CreateMessageSelectCourse'
import CreateMessageSelectUser from '../Modules/Inbox/CreateMessageSelectUser'

export function registerScreens (store, Provider) {
  Navigation.registerComponent('CoursesScreen', () => CoursesScreen, store, Provider)
  Navigation.registerComponent('InboxScreen', () => InboxScreen)
  Navigation.registerComponent('SingleCourseView', () => SingleCourseView)
  Navigation.registerComponent('SingleConversationView', () => SingleConversationView)
  Navigation.registerComponent('SingleConversationReply', () => SingleConversationReply)
  Navigation.registerComponent('CourseScreenSingleActivitySingle', () => CourseScreenSingleActivitySingle)
  Navigation.registerComponent('CoursesScreenSinglePeople', () => CoursesScreenSinglePeople)
  Navigation.registerComponent('CoursesScreenSingleAnnouncements', () => CoursesScreenSingleAnnouncements)
  Navigation.registerComponent('CoursesScreenSingleAnnouncementsSingle', () => CoursesScreenSingleAnnouncementsSingle)
  Navigation.registerComponent('CoursesScreenSingleDiscussions', () => CoursesScreenSingleDiscussions)
  Navigation.registerComponent('CoursesScreenSingleDiscussionsSingle', () => CoursesScreenSingleDiscussionsSingle)
  Navigation.registerComponent('CoursesScreenSingleSyllabus', () => CoursesScreenSingleSyllabus)
  Navigation.registerComponent('CoursesScreenSingleAssignments', () => CoursesScreenSingleAssignments)
  Navigation.registerComponent('CoursesScreenSingleAssignmentsSingle', () => CoursesScreenSingleAssignmentsSingle)
  Navigation.registerComponent('CoursesScreenSingleFiles', () => CoursesScreenSingleFiles)
  Navigation.registerComponent('CoursesScreenSingleFolder', () => CoursesScreenSingleFolder)
  Navigation.registerComponent('CoursesScreenSingleGrades', () => CoursesScreenSingleGrades)
  Navigation.registerComponent('CoursesScreenSingleGradesSingle', () => CoursesScreenSingleGradesSingle)
  Navigation.registerComponent('SingleConversationViewListParticipants', () => SingleConversationViewListParticipants)
  Navigation.registerComponent('CreateMessage', () => CreateMessage, store, Provider)
  Navigation.registerComponent('CreateMessageSelectCourse', () => CreateMessageSelectCourse, store, Provider)
  Navigation.registerComponent('CreateMessageSelectUser', () => CreateMessageSelectUser, store, Provider)
}
