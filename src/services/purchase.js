import api from '../api';
import mixpanel from 'mixpanel-browser';

const purchase = {
  create: async (body) => {
    try {
      const res = await api.post(`/purchases/create`, body);
      mixpanel.track('Fund Purchased');
      mixpanel.people.increment('funds purchased');
      return Promise.resolve(res.data.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  update: async (purchaseId, body) => {
    try {
      await api.put(`/purchases/update/${purchaseId}`, body);
      mixpanel.track('Fund Updated');
      mixpanel.people.increment('funds updated');
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },
  delete: async (purchaseId) => {
    try {
      await api.delete(`/purchases/${purchaseId}`);
      mixpanel.track('Fund Deleted');
      mixpanel.people.increment('funds deleted');
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export default purchase;
