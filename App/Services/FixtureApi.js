export default {
  getCourses: () => {
    const courses = require('../Fixtures/courses.json')
    return {
      ok: true,
      data: courses
    }
  }
}
