import axiosInstance from '../../api/axiosInstance';

export const incrementadsClickCount = async () => {
  try {
    const response = await axiosInstance.post('/adsclick');
    return response.data.count;
  } catch (error) {
    console.error('Error incrementing click count:', error);
    return null;
  }
};

export const incrementAdsClickseparateLy = async (adId) => {
  try {
    const response = await axiosInstance.put(`/storeads/click/${adId}`);
    return response.data.totalClicks;
  } catch (error) {
    console.error('Error incrementing click count:', error);
    return null;
  }
};
export const resetAdClickCount = async (adId) => {
  try {
    const response = await axiosInstance.put(`/storeads/reset-clicks/${adId}`);
    return response.data.totalClicks;
  } catch (error) {
    console.error('Error resetting ad click count:', error);
    return null;
  }
};



export const resetadsVisitorsCount = async () => {
  try {
    const response = await axiosInstance.post('/adsreset');
    return response.data.count;
  } catch (error) {
    console.error('Error resetting visitors count:', error);
    return null;
  }
};

export const getadsVisitorsCount = async () => {
  try {
    const response = await axiosInstance.get('/adscount');
    return response.data.count;
  } catch (error) {
    console.error('Error getting visitors count:', error);
    return null;
  }
};
