import mixpanel from 'mixpanel-browser';
import api from '../api';

const portfolio = {
  index: async (params = {}) => {
    try {
      const res = await api.get(`/portfolios/list`, { params });
      return Promise.resolve(res.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  show: async (portfolioId, params = {}) => {
    try {
      const res = await api.get(`/portfolios/show/${portfolioId}`, { params });
      return Promise.resolve(res.data.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  create: async () => {
    try {
      const res = await api.post(`/portfolios/create`);
      mixpanel.track('Portfolio Created');
      mixpanel.people.increment('portfolios created');
      return Promise.resolve(res.data.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  update: async (portfolioId, portfolio) => {
    try {
      await api.put(`/portfolios/update/${portfolioId}`, portfolio);
      mixpanel.track('Portfolio Title Update');
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },
  status: async (portfolioId, params = {}) => {
    try {
      const res = await api.put(
        `/portfolios/update/${portfolioId}/status`,
        null,
        {
          params,
        }
      );
      mixpanel.track('Portfolio Visibility Update', { status });
      return Promise.resolve(res.data.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  delete: async (portfolioId) => {
    try {
      await api.delete(`/portfolios/${portfolioId}`);
      mixpanel.track('Portfolio Delete');
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export default portfolio;
