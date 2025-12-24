import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext'; // To get backendUrl

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { backendUrl } = useContext(AppContext);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get token and role from URL query parameters
  const token = searchParams.get('token');
  const role = searchParams.get('role'); // e.g., 'admin' or 'doctor'

  useEffect(() => {
    // Validate required query parameters on load
    if (!token || (role !== 'admin' && role !== 'doctor')) {
      setError("Invalid or missing password reset parameters.");
    }
  }, [token, role]);

  const handleResetSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    
    if (newPassword.length < 6) {
      return setError("Password must be at least 6 characters long.");
    }
    if (newPassword !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    setIsLoading(true);

    try {
      // Target the correct role's reset endpoint
      const url = `${backendUrl}/api/${role}/reset-password`;

      const resetData = { 
        token, 
        newPassword 
      };

      const { data } = await axios.post(url, resetData);

      if (data.success) {
        toast.success(data.message || "Password successfully reset!");
        navigate('/login'); // Redirect to login page
      } else {
        toast.error(data.message || "Failed to reset password. Link may be expired.");
        setError("Reset failed. Please request a new link.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred. Check token and try again.');
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  if (error && (!token || !role)) {
    return (
      <div className="h-[70vh] flex items-center justify-center text-center">
        <div className="p-8 bg-red-50 border border-red-200 rounded-xl max-w-md">
          <h2 className="text-xl font-bold text-red-700 mb-4">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button onClick={() => navigate('/login')} className="text-blue-600 font-semibold hover:underline">Go to Login Page</button>
        </div>
      </div>
    );
  }

  return (
    <div className='h-[90vh] flex items-center justify-center p-4'>
      <div className='bg-white p-8 rounded-xl shadow-2xl w-full max-w-sm border border-gray-100'>
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">Set New Password</h2>
        <p className="text-gray-600 text-sm text-center mb-6">
          Account: <span className="font-semibold capitalize">{role}</span>
        </p>

        <form onSubmit={handleResetSubmit} className='flex flex-col gap-4'>
          
          {/* New Password Input */}
          <div className="w-full">
            <label className="text-sm font-medium block mb-1 text-gray-700">New Password</label>
            <input
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
              type="password"
              required
              placeholder='Enter new password (min 6 chars)'
            />
          </div>

          {/* Confirm Password Input */}
          <div className="w-full">
            <label className="text-sm font-medium block mb-1 text-gray-700">Confirm New Password</label>
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
              type="password"
              required
              placeholder='Confirm new password'
            />
          </div>
          
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button 
            type="submit"
            disabled={isLoading}
            className={`bg-blue-600 text-white w-full py-3 rounded-lg text-base font-semibold transition-colors shadow-md mt-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'}`}
          >
            {isLoading ? 'Processing...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;