// src/hooks/common/authHooks.js
import axiosInstance from '../../api/axiosInstance';
const keralaoffertoken = localStorage.getItem('keralaoffertoken');
// Login Hook
export const useLogin = () => {
  const login = async (email, password) => {
    const response = await axiosInstance.post('/login', { email, password });
    const { token, user } = response.data;

    localStorage.setItem('keralaoffertoken', token);
    localStorage.setItem('user', JSON.stringify(user));

    return response.data;
  };

  return { login };
};

// Signup Hook
export const useSignup = () => {
  const signup = async (formData) => {
    const response = await axiosInstance.post('/signup', formData);
    const { token, user } = response.data;

    localStorage.setItem('keralaoffertoken', token);
    localStorage.setItem('user', JSON.stringify(user));

    return response.data;
  };

  return { signup };
};

// Reset Password Hook
export const useResetPassword = () => {
  const resetPassword = async (currentPassword, newPassword) => {
    const response = await axiosInstance.put('/reset-password', {
      currentPassword,
      newPassword,
    });
    return response.data;
  };

  return { resetPassword };
};

// Logout Hook
export const useLogout = () => {
  const logout = async () => {
    try {
      await axiosInstance.post('/logout'); // optional
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      localStorage.removeItem('keralaoffertoken');
      localStorage.removeItem('user');
    }
  };

  return { logout };
};
