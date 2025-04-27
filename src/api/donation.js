import request from '@/utils/request'

export default {
  // 创建捐款
  donate(data) {
    return request.post('/donation/donate', data)
  },

  // 查询单笔捐款详情
  getDonation(data) {
    return request.post('/donation/get', data)
  },

  // 查询项目的捐款列表
  getProjectDonations(data) {
    return request.post('/donation/project/donations', data)
  },

  // 查询用户的捐款历史
  getUserDonations(data) {
    return request.post('/donation/user/donations', data)
  },

  // 分页查询捐款记录
  listDonations(data) {
    return request.post('/donation/list', data)
  },

  // 统计捐款总额(有条件)
  getDonationStats(data) {
    return request.post('/donation/stats/total', data)
  },
  // 统计捐款总额
  getDonationAmount() {
    return request.get('/donation/amount')
  },
  //支付宝沙箱支付
  pay(data) {
    return request.get('/donation/pay', {params: data})
  }
}
