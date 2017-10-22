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
  const replyUserConversation = (conversationId, params) => api.post(`conversations/${conversationId}/add_message?${params}`)
  // User
  const getUserGroups = () => api.get('users/self/groups')
  const getUserGroupsSingle = (groupId) => api.get(`groups/${groupId}`)
  const getUserActivityStream = () => api.get('users/activity_stream')
  const getUserActivityStreamSummary = () => api.get('users/self/activity_stream/summary')
  const getUserByCourse = (courseId, userId) => api.get(`courses/${courseId}/users/${userId}`, { include: ['email', 'enrollments', 'avatar_url', 'bio'] })
  // Courses
  const getCourseActivity = (courseId) => api.get(`courses/${courseId}/activity_stream`)
  const getCourseActivitySummary = (courseId) => api.get(`courses/${courseId}/activity_stream/summary`)
  const getCourseThreads = (courseId, isAnnouncement = null) => api.get(`courses/${courseId}/discussion_topics`, { 'only_announcements': isAnnouncement, 'plain_messages': true, 'order_by': 'recent_activity', 'per_page': 50 })
  const getCourseThreadsSingle = (courseId, discussionId) => api.get(`courses/${courseId}/discussion_topics/${discussionId}`)
  const getCourseThreadsSingleEntries = (courseId, discussionId, entries = null) => api.get(`courses/${courseId}/discussion_topics/${discussionId}/${entries}`)
  const getCourseAssignments = (courseId) => api.get(`courses/${courseId}/assignments`, { 'per_page': 100 })
  const getCourseAssignmentsSingle = (courseId, assignId) => api.get(`courses/${courseId}/assignments/${assignId}`)
  const getCourseSyllabus = (courseId) => api.get(`courses/${courseId}`, { include: ['syllabus_body'], 'plain_messages': true })
  const getCourseMemberList = (courseId) => api.get(`courses/${courseId}/users`, { include: ['enrollments', 'avatar_url'], 'per_page': 200 })
  const getCourseSubmissions = (courseId) => api.get(`courses/${courseId}/students/submissions`, { per_page: '50' }) // match assignment_id in this response w/ getCourseAssignment's id
  const getCourseSubmissionsSingle = (courseId, assignId, userId) => api.get(`courses/${courseId}/assignments/${assignId}/submissions/${userId}`, { include: ['submission_comments'] })
  // const getCourseFiles = (courseId, page) => api.get(`courses/${courseId}/files`, { 'per_page': 10, 'page': page, 'sort': 'created_at' })
  const getCourseFolders = (courseId) => api.get(`courses/${courseId}/folders`, { 'per_page': 50, 'sort': 'name' })
  const getSingleFolderInfo = (folderId) => api.get(`folders/${folderId}`)
  const getSingleFolder = (folderId, page) => api.get(`folders/${folderId}/files`, { 'per_page': 10, 'page': page, 'sort': 'created_at' })
  // Recipients
  const getPossibleRecipients = (contextId) => api.get('search/recipients', { context: `${contextId}`, 'per_page': 200 })

  return {
    // Required
    getCourses,
    // Users Conversations
    getUserConversations,
    getUserConversationSingle,
    getUserUnreadCount,
    postUserConversation,
    editUserConversationSingle,
    replyUserConversation,
    // User
    getUserGroups,
    getUserGroupsSingle,
    getUserActivityStream,
    getUserActivityStreamSummary,
    getUserByCourse,
    // Courses
    getCourseActivity,
    getCourseActivitySummary,
    getCourseThreads,
    getCourseThreadsSingle,
    getCourseThreadsSingleEntries,
    getCourseAssignments,
    getCourseAssignmentsSingle,
    getCourseSyllabus,
    getCourseMemberList,
    getCourseSubmissions,
    getCourseSubmissionsSingle,
    // getCourseFiles,
    getCourseFolders,
    getSingleFolderInfo,
    getSingleFolder,
    // Recipients
    getPossibleRecipients
  }
}

export default {
  create
}
