import api from '../api';

const comparison = {
  index: async (params = {}) => {
    try {
      const res = await api.get(`/comparisons/list`, { params });
      return Promise.resolve(res.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  show: async (comparisonCode, params = {}) => {
    try {
      const res = await api.get(`/comparisons/show/${comparisonCode}`, {
        params,
      });
      return Promise.resolve(res.data.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export default comparison;
