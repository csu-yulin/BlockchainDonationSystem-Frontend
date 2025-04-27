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
  // 根据orgId获取项目统计数据
  getProjectStatsByOrgId(orgId) {
    return request.get(`/project/stats/${orgId}`)
  },
  // 上传项目封面
  uploadCover(formData) {
    return request.post('/project/cover', formData, {
      headers: {'Content-Type': 'multipart/form-data'},
    })
  },
  // 随机获取3个项目
  getRandomProjects() {
    return request.get('/project/random')
  },
}
