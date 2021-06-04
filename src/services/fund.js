import api from '../api';

const fund = {
  index: async (params = {}) => {
    try {
      const res = await api.get(`/funds/list`, { params });
      return Promise.resolve(res.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  show: async (fundCode, params = {}) => {
    try {
      const res = await api.get(`/funds/show/${fundCode}`, { params });
      return Promise.resolve(res.data.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export default fund;
