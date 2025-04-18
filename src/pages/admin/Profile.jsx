import React, { useState } from 'react';
import { useResetPassword } from '../../hooks/common/Userlogins'; // adjust path if needed
import { toast } from 'react-toastify';


const Profile = () => {
  const { resetPassword } = useResetPassword();

  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [profile, setProfile] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleResetPassword = async () => {
    if (profile.newPassword !== profile.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
  
    try {
      await resetPassword(profile.currentPassword, profile.newPassword);
      toast.success('Password updated successfully!');
      
      // Reset form and toggle UI state
      setProfile({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setIsEditingPassword(false);
      
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to update password');
    }
  };
  

  return (
    <div className="mx-auto my-5 p-5 rounded-lg shadow-md bg-white">
      <div className="mb-6 pb-5 border-b border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-800">Account Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Update your email or reset your password.</p>
      </div>

      {/* Password Section */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-700">Password</h2>
          <button
            onClick={() => setIsEditingPassword(!isEditingPassword)}
            className="text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            {isEditingPassword ? 'Cancel' : 'Reset Password'}
          </button>
        </div>

        {isEditingPassword ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={profile.currentPassword}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={profile.newPassword}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={profile.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex justify-end mt-2">
              <button
                onClick={handleResetPassword}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Update Password
              </button>
            </div>
          </div>
        ) : (
          <div className="text-gray-500">
            ●●●●●●●●●● <span className="text-xs text-gray-400">(hidden for security)</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
