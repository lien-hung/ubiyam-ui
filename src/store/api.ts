const baseUrl = "https://ubiyam-api.onrender.com/api/v1/";

const API = {
  async request<T>(endpoint: string, config: RequestInit = {}) {
    const url = new URL(endpoint, baseUrl);
    const response = await fetch(url, config);

    if (response.ok && response.headers.get("Content-Type")?.includes("json")) {
      return await response.json() as T;
    }
  },

  get: async <T>(endpoint: string, config: RequestInit = {}) =>
    await API.request<T>(endpoint, { ...config, method: "GET" }),

  post: async <T>(endpoint: string, config: RequestInit = {}) =>
    await API.request<T>(endpoint, { ...config, method: "POST" }),

  put: async <T>(endpoint: string, config: RequestInit = {}) =>
    await API.request<T>(endpoint, { ...config, method: "PUT" }),

  delete: async <T>(endpoint: string, config: RequestInit = {}) =>
    await API.request<T>(endpoint, { ...config, method: "DELETE" }),
};

export default API;