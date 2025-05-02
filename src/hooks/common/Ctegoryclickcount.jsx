import axiosInstance from '../../api/axiosInstance';

export const incrementcategoryClickCount = async () => {
    try {
        const response = await axiosInstance.post('/categoryclick');
        return response.data.count;
    } catch (error) {
        console.error('Error incrementing click count:', error);
        return null;
    }
};

export const resetcategoryclickCount = async () => {
    try {
        const response = await axiosInstance.post('/categoryreset');
        return response.data.count;
    } catch (error) {
        console.error('Error resetting visitors count:', error);
        return null;
    }
};

export const getcategoryclickCount = async () => {
    try {
        const response = await axiosInstance.get('/categorycount');
        return response.data.count;
    } catch (error) {
        console.error('Error getting visitors count:', error);
        return null;
    }
};
