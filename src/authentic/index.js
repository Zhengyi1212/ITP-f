// 认证相关的工具函数，用于操作 Token

const TOKEN_KEY = 'authToken';

/**
 * 从 localStorage 获取 Token
 * @returns {string|null}
 */
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

/**
 * 将 Token 保存到 localStorage
 * @param {string} token
 */
export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

/**
 * 从 localStorage 移除 Token
 */
export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}
