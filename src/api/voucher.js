import request from '@/utils/request'

export default {
  // 创建凭证（上传文件）
  uploadVoucher(formData) {
    return request.post('/voucher/upload', formData, {
      headers: {'Content-Type': 'multipart/form-data'},
    })
  },

  // 根据ID查询单个凭证
  getVoucherById(voucherId) {
    return request.get(`/voucher/${voucherId}`)
  },

  // 查询凭证列表（支持分页和过滤）
  listVouchers(data) {
    return request.post('/voucher/list', data)
  },

  // 根据IPFS哈希查询凭证
  getVoucherByIpfs(ipfsHash) {
    return request.get('/voucher/by-ipfs', {params: {ipfsHash}})
  },
}
