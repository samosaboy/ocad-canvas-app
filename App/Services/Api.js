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
  const getCourses = () => api.get('courses', { 'enrollment_state': 'active', 'per_page': '50' }) // implement scroll down to fetch more (do 10 at a time)
  // Users Conversations
  const getUserConversations = (count, page, type?) => api.get('conversations', { include: 'participant_avatars', 'per_page': count, 'page': page, scope: type })
  const getUserConversationSingle = (conversationId) => api.get(`conversations/${conversationId}`)
  const getUserUnreadCount = () => api.get('conversations/unread_count')
  const postUserConversation = (params) => api.post(`conversations?${params}`)
  // const postUserConversation = (recipients, body, group?) => api.post('conversations', { recipients, body, group_conversation: group })
  const editUserConversationSingle = (conversationId, params) => api.put(`conversations/${conversationId}?${params}`)
  // Courses
  const getCourseActivity = (courseId) => api.get(`courses/${courseId}/activity_stream/summary`)
  const getCourseDiscussions = (courseId) => api.get(`courses/${courseId}/discussion_topics`)
  const getCourseAllFiles = (courseId) => api.get(`courses/${courseId}/files`)
  const getCourseAssignments = (userId, courseId) => api.get(`users/${userId}/courses/${courseId}/assignments`)
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
    // Courses
    getCourseActivity,
    getCourseAssignments,
    getCourseDiscussions,
    getCourseAllFiles,
    // Recipients
    getPossibleRecipients
  }
}

export default {
  create
}
