import request from '@/utils/request'

export default {
  // 新建项目
  createProject(data) {
    return request.post('/project/create', data)
  },

  // 更新项目
  updateProject(data) {
    return request.put('/project/update', data)
  },

  // 查询单个项目详情
  getProjectDetail(id) {
    return request.get(`/project/${id}`)
  },

  // 分页查询项目列表
  getProjectList(data) {
    return request.post('/project/list', data)
  },
  // 获取项目总数
  getProjectCount() {
    return request.get('/project/count')
  },
}
