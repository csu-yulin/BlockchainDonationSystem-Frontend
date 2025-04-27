import request from '@/utils/request'

export default {
  // 创建资金流动记录（个体）
  createIndividualFundFlow(formData) {
    return request.post('/fundflow/create/individual', formData, {
      headers: {'Content-Type': 'multipart/form-data'},
    })
  },

  // 创建资金流动记录（组织）
  createOrgFundFlow(formData) {
    return request.post('/fundflow/create/org', formData, {
      headers: {'Content-Type': 'multipart/form-data'},
    })
  },

  // 更新资金流动记录（管理员）
  updateAdminFundFlow(data) {
    return request.post('/fundflow/update/admin', data)
  },

  // 更新资金流动记录（公益组织）
  updateOrgFundFlow(formData) {
    return request.post('/fundflow/update/org', formData, {
      headers: {'Content-Type': 'multipart/form-data'},
    })
  },
  // 根据组织Id获取资金流动记录列表
  getFundFlowListByOrgId(orgId) {
    return request.get(`/fundflow/${orgId}`)
  },
}
