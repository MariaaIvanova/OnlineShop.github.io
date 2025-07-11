import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User as UserType } from '../types';
import { useFormValidation } from './useFormValidation';

interface SettingsFormData {
  username: string;
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const useSettingsForm = () => {
  const { user, updateUser, isLoading } = useAuth();
  const { errors, validateForm, clearErrors } = useFormValidation();
  
  const [formData, setFormData] = useState<SettingsFormData>({
    username: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [profilePicPreview, setProfilePicPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Initialize form data when user changes
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setProfilePicPreview(user.profilePic || null);
    }
  }, [user]);

  const handleInputChange = useCallback((field: keyof SettingsFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setMessage(null);
    clearErrors();
  }, [clearErrors]);

  const handleProfilePicChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setMessage({ type: 'error', text: 'Profile picture must be less than 5MB' });
        return;
      }

      if (!file.type.startsWith('image/')) {
        setMessage({ type: 'error', text: 'Please select a valid image file' });
        return;
      }

      setProfilePic(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicPreview(e.target?.result as string);
        setMessage(null);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const resetForm = useCallback(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setProfilePicPreview(user.profilePic || null);
      setProfilePic(null);
      setMessage(null);
      clearErrors();
      setIsSubmitting(false);
    }
  }, [user, clearErrors]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setMessage(null);
    clearErrors();

    try {
      // Validate required fields
      if (!formData.username.trim()) {
        setMessage({ type: 'error', text: 'Username is required' });
        return;
      }

      if (!formData.email.trim()) {
        setMessage({ type: 'error', text: 'Email is required' });
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setMessage({ type: 'error', text: 'Please enter a valid email address' });
        return;
      }

      if (formData.newPassword) {
        if (!formData.currentPassword) {
          setMessage({ type: 'error', text: 'Current password is required to change password' });
          return;
        }
        if (formData.newPassword !== formData.confirmPassword) {
          setMessage({ type: 'error', text: 'New passwords do not match' });
          return;
        }
        if (formData.newPassword.length < 6) {
          setMessage({ type: 'error', text: 'New password must be at least 6 characters' });
          return;
        }
      }

      const updateData: Partial<UserType> = {
        username: formData.username.trim(),
        email: formData.email.trim()
      };

      if (formData.newPassword) {
        updateData.password = formData.newPassword;
      }

      if (profilePicPreview && profilePicPreview !== user?.profilePic) {
        updateData.profilePic = profilePicPreview;
      }

      if (user) {
        await updateUser({ ...user, ...updateData });
        setMessage({ type: 'success', text: 'Settings updated successfully!' });
        
        setFormData(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }));

        setTimeout(() => {
          resetForm();
        }, 2000);
      }
    } catch (error) {
      console.error('Settings update error:', error);
      setMessage({ type: 'error', text: 'Failed to update settings. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, profilePicPreview, user, updateUser, isSubmitting, clearErrors, resetForm]);

  const handleReset = useCallback(() => {
    resetForm();
    setMessage({ type: 'success', text: 'Form reset to original values' });
  }, [resetForm]);

  return {
    formData,
    profilePic,
    profilePicPreview,
    isSubmitting,
    isLoading,
    message,
    errors,
    handleInputChange,
    handleProfilePicChange,
    handleSubmit,
    handleReset,
    resetForm
  };
}; 