// API 模块：统一管理所有后端请求

// 后端 API 的基础 URL
// 在开发环境中，Vite 的 proxy 会将 /api 代理到 target 地址。
// 在生产环境中，通常需要配置 Nginx 或其他网关来进行反向代理。
const BASE_URL = '/api';

/**
 * 封装的 fetch 函数，用于处理 API 请求
 * @param {string} endpoint - API 的路径 (e.g., '/users/login')
 * @param {object} options - fetch API 的配置对象 (method, headers, body, etc.)
 * @returns {Promise<any>} - 返回一个 Promise，解析为 JSON 格式的响应数据
 */
async function apiFetch(endpoint, options = {}) {
  const url = BASE_URL + endpoint;
  
  // 准备请求头
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // 从 localStorage (或 Pinia store) 获取认证 token
  const token = localStorage.getItem('authToken');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // 合并默认配置和传入的配置
  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);

    // 如果响应状态码不是 2xx，则抛出错误
    if (!response.ok) {
      // 尝试解析错误信息
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(errorData.message || '网络请求失败');
    }

    // 如果响应体为空，直接返回成功状态
    if (response.status === 204 || response.headers.get('content-length') === '0') {
      return { success: true };
    }

    // 解析 JSON 响应体
    return response.json();
  } catch (error) {
    console.error(`API Fetch Error: ${error.message}`);
    // 将错误向上层抛出，以便组件可以捕获和处理
    throw error;
  }
}

// =================================================================
// ============== 以下是根据项目文档定义的具体 API 函数 ==============
// =================================================================

/**
 * 用户登录
 * @param {object} credentials - 包含 username 和 password
 */
export const login = (credentials) => {
  return apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
};

/**
 * 获取当前登录用户的信息
 */
export const getUserInfo = () => {
  return apiFetch('/users/me');
};


// --- 设备管理 API ---

/**
 * 获取设备列表 (可带分页和过滤参数)
 * @param {object} params - 查询参数, e.g., { page: 1, limit: 10, name: '...' }
 */
export const getEquipmentList = (params) => {
  const queryString = new URLSearchParams(params).toString();
  return apiFetch(`/equipment?${queryString}`);
};

/**
 * 根据 ID 获取设备详情
 * @param {string} id - 设备 ID
 */
export const getEquipmentById = (id) => {
  return apiFetch(`/equipment/${id}`);
};

/**
 * 添加新设备
 * @param {object} equipmentData - 设备信息
 */
export const addEquipment = (equipmentData) => {
  return apiFetch('/equipment', {
    method: 'POST',
    body: JSON.stringify(equipmentData),
  });
};


// --- 采购管理 API ---

/**
 * 获取采购申请列表
 * @param {object} params - 查询参数
 */
export const getProcurementList = (params) => {
    const queryString = new URLSearchParams(params).toString();
    return apiFetch(`/procurement?${queryString}`);
};

/**
 * 创建采购申请
 * @param {object} procurementData - 采购申请信息
 */
export const createProcurement = (procurementData) => {
    return apiFetch('/procurement', {
        method: 'POST',
        body: JSON.stringify(procurementData),
    });
};
