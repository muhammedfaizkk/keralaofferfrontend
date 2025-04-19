import axiosInstance from '../../api/axiosInstance';



export const getVisitorsCount = async () => {
  try {
    const response = await axiosInstance.get('/visitors/count');
    return response.data.count;
  } catch (error) {
    console.error('Error fetching visitors count:', error);
    return 0;
  }
    useEffect(() => {
      fetchStores();
    }, []);
  
};

export const incrementVisitorsCount = async () => {
  try {
    const response = await axiosInstance.post('/visitors/increment');
    return response.data.count;
  } catch (error) {
    console.error('Error incrementing visitors count:', error);
    return null;
  }
};

export const resetVisitorsCount = async () => {
  try {
    const response = await axiosInstance.post('/visitors/reset'); // assuming POST /visitors/reset
    return response.data.count;
  } catch (error) {
    console.error('Error resetting visitors count:', error);
    return null;
  }
};

export const getLoginTypeCounts = async () => {
  try {
    const response = await axiosInstance.get('/analytics/login-types');
    return response.data;
  } catch (error) {
    console.error('Error fetching login type counts:', error);
    return {
      emailLogin: 0,
      googleLogin: 0,
      facebookLogin: 0,
      totalLogins: 0
    };
  }
};

export const incrementLoginTypeCount = async (loginType) => {
  try {
    const response = await axiosInstance.post('/analytics/login-types/increment', {
      loginType // 'email', 'google', 'facebook'
    });
    return response.data;
  } catch (error) {
    console.error('Error incrementing login type count:', error);
    return null;
  }
};
