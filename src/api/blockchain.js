import request from '@/utils/request'

export default {
  // 创建项目
  createProject(data) {
    return request.post('/blockchain/project/create', data)
  },

  // 捐款
  donate(data) {
    return request.post('/blockchain/donate', data)
  },

  // 上传凭证
  uploadVoucher(data) {
    return request.post('/blockchain/voucher/upload', data)
  },

  // 查看项目详情
  getProjectDetail(data) {
    return request.post('/blockchain/project/get', data)
  },

  // 查询项目捐款列表
  getProjectDonations(data) {
    return request.post('/blockchain/project/donations', data)
  },

  // 查询捐款详情
  getDonationDetail(data) {
    return request.post('/blockchain/donation/get', data)
  },

  // 查询凭证详情
  getVoucherDetail(data) {
    return request.post('/blockchain/voucher/get', data)
  },

  // 查询项目凭证列表
  getProjectVouchers(data) {
    return request.post('/blockchain/project/vouchers', data)
  },

  // 查询总项目数
  getProjectCount() {
    return request.get('/blockchain/project/count')
  },

  // 查询总捐款数
  getDonationCount() {
    return request.get('/blockchain/donation/count')
  },

  // 查询总凭证数
  getVoucherCount() {
    return request.get('/blockchain/voucher/count')
  },

  // 验证捐款交易
  verifyTransaction(data) {
    return request.post('/blockchain/verify', data)
  },
}
