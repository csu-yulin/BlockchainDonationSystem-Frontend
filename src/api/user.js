import request from '@/utils/request'

export default {
  // 获取图形验证码
  getCaptcha() {
    return request.get('/user/captcha')
  },

  // 校验图形验证码
  validateCaptcha(params) {
    return request.post('/user/validateCaptcha', null, {params})
  },

  // 获取手机验证码
  getSmsCode(phoneNumber) {
    return request.get('/user/smsCode', {params: {phoneNumber}})
  },

  // 个体用户注册
  registerIndividual(data) {
    return request.post('/user/register/individual', data)
  },

  // 实名认证
  individualVerify(data) {
    return request.post('/user/individualVerify', data)
  },

  // 手机号登录
  loginByPhone(data) {
    return request.post('/user/login/phone', data)
  },
  // 手机号登录
  loginByEmail(data) {
    return request.post('/user/login/email', data)
  },


  // 公益组织注册
  registerOrganization(data) {
    return request.post('/user/register/organization', data)
  },

  // 登出功能
  logout(data) {
    return request.post('/user/logout', data)
  },

  // 获取单个用户信息
  getUserInfo(userId) {
    return request.get(`/user/${userId}`)
  },

  // 分页查询用户列表
  getUsers(data) {
    return request.post('/user/users', data)
  },

  // 更新个体用户信息
  updateIndividual(data) {
    return request.put('/user/update/individual', data)
  },

  // 更新公益组织信息
  updateOrganization(data) {
    return request.put('/user/update/organization', data)
  },

  // 上传头像
  uploadAvatar(userId, formData) {
    return request.post(`/user/${userId}/avatar`, formData, {
      headers: {'Content-Type': 'multipart/form-data'},
    })
  },
  // 获取用户总数
  getUserCount() {
    return request.get('/user/count')
  },
}
