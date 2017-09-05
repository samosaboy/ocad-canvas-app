import apisauce from 'apisauce'

const create = (baseURL = 'https://canvas.ocadu.ca/api/v1/') => {
  const api = apisauce.create({
    // TODO: Implement OAuth when you get client_Id, client_secret etc
    baseURL,
    headers: {
      'Cache-Control': 'no-cache',
      'Authorization': 'Bearer xeA83l5Wnc2PS3TSosmDzrJJJa6kfjFmRqqHVkA1hR5tWLydKYkFGmohnrXepsSN'
    },
    timeout: 10000
  })
  // Prepare for rate limit exceeded (403) https://canvas.instructure.com/doc/api/file.throttling.html

  // Required
  const getCourses = (state?) => api.get('courses', { 'enrollment_state': state || 'active', 'per_page': '50', include: ['term'] })
  // Users Conversations
  const getUserConversations = (count, page, type?) => api.get('conversations', { include: ['participant_avatars'], 'per_page': count, 'page': page, scope: type })
  const getUserConversationSingle = (conversationId) => api.get(`conversations/${conversationId}`)
  const getUserUnreadCount = () => api.get('conversations/unread_count')
  const postUserConversation = (params) => api.post(`conversations?${params}`)
  const editUserConversationSingle = (conversationId, params) => api.put(`conversations/${conversationId}?${params}`)
  // User
  const getUserGroups = () => api.get('users/self/groups')
  const getUserGroupsSingle = (groupId) => api.get(`groups/${groupId}`)
  const getUserActivityStream = () => api.get('users/activity_stream')
  const getUserActivityStreamSummary = () => api.get('users/self/activity_stream/summary')
  // Courses
  const getCourseActivity = (courseId) => api.get(`courses/${courseId}/activity_stream`)
  const getCourseActivitySummary = (courseId) => api.get(`courses/${courseId}/activity_stream/summary`)
  const getCourseDiscussions = (courseId, isAnnouncement = null) => api.get(`courses/${courseId}/discussion_topics`, { 'only_announcements': isAnnouncement, 'plain_messages': true, 'order_by': 'recent_activity', 'per_page': 50 })
  const getCourseDiscussionsSingle = (courseId, discussionId) => api.get(`courses/${courseId}/discussion_topics/${discussionId}/entries`)
  const getCourseAllFiles = (courseId) => api.get(`courses/${courseId}/files`)
  const getCourseAssignments = (userId, courseId) => api.get(`courses/${courseId}/assignments`)
  const getCourseAnnouncements = (courseId) => api.get('announcements', { 'context_codes': courseId })
  const getCourseSyllabus = (courseId) => api.get(`courses/${courseId}`, { include: ['syllabus_body'], 'plain_messages': true })
  const getCourseMemberList = (courseId) => api.get(`courses/${courseId}/users`, { include: ['enrollments', 'avatar_url'] })
  // Recipients
  const getPossibleRecipients = (contextId) => api.get('search/recipients', { context: `${contextId}` })

  return {
    // Required
    getCourses,
    // Users Conversations
    getUserConversations,
    getUserConversationSingle,
    getUserUnreadCount,
    postUserConversation,
    editUserConversationSingle,
    // User
    getUserGroups,
    getUserGroupsSingle,
    getUserActivityStream,
    getUserActivityStreamSummary,
    // Courses
    getCourseActivity,
    getCourseActivitySummary,
    getCourseDiscussions,
    getCourseDiscussionsSingle,
    getCourseAllFiles,
    getCourseAssignments,
    getCourseAnnouncements,
    getCourseSyllabus,
    getCourseMemberList,
    // Recipients
    getPossibleRecipients
  }
}

export default {
  create
}
