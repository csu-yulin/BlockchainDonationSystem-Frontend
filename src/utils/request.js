import axios from 'axios'

// 创建 Axios 实例
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // 使用环境变量配置基础 URL
  timeout: 10000,
  withCredentials: true,
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 可在此添加额外的请求头配置，例如 Authorization（如果后续需要）
    return config
  },
  (error) => {
    console.error('请求发送失败', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.code !== 200) {
      console.warn(`业务异常: ${res.message || '未知错误'}`)
      return Promise.reject(new Error(res.message || 'Error'))
    }
    return res.data
  },
  (error) => {
    // 统一处理错误
    if (error.response) {
      const {status, data} = error.response
      console.error(`请求失败，状态码: ${status}，错误信息: ${data.message}`)
    } else {
      console.error('网络错误，请检查连接')
    }
    return Promise.reject(error)
  }
)

export default instance
