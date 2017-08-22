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
  const getCourses = () => api.get('courses', { 'enrollment_state': 'completed', 'per_page': '50' }) // implement scroll down to fetch more (do 10 at a time)
  // Users
  const getUserConversations = () => api.get('conversations')
  // Courses
  const getCourseActivity = (courseId) => api.get(`courses/${courseId}/activity_stream/summary`)
  const getCourseDiscussions = (courseId) => api.get(`courses/${courseId}/discussion_topics`)
  const getCourseAllFiles = (courseId) => api.get(`courses/${courseId}/files`)
  const getCourseAssignments = (userId, courseId) => api.get(`users/${userId}/courses/${courseId}/assignments`)

  return {
    // Required
    getCourses,
    // Users
    getUserConversations,
    // Courses
    getCourseActivity,
    getCourseAssignments,
    getCourseDiscussions,
    getCourseAllFiles
  }
}

export default {
  create
}
