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
  const getCourses = () => api.get('courses', {
    'enrollment_state': 'active'
  })
  const getCourseActivity = (id) => api.get(`courses/${id}/activity_stream/summary`)
  const getConversationList = () => api.get('conversations')
  return {
    getCourses,
    getCourseActivity,
    getConversationList
  }
}

export default {
  create
}
