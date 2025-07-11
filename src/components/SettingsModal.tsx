import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Camera, Save, Eye, EyeOff } from 'lucide-react';
import { useSettingsForm } from '../hooks/useSettingsForm';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 2rem;
`;

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 20px;
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  backdrop-filter: blur(10px);

  &:hover {
    background: white;
  }
`;

const Header = styled.div`
  padding: 2rem 2rem 1rem;
  border-bottom: 1px solid #e1e5e9;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
  margin: 0;
`;

const Subtitle = styled.p`
  color: #666;
  margin: 0.5rem 0 0;
  font-size: 0.9rem;
`;

const Form = styled.form`
  padding: 2rem;
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 1rem;
`;

const InputGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 500;
  color: #333;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #EFC0C2;
  }
`;

const ProfilePicSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const ProfilePicPreview = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 2px solid #e1e5e9;
`;

const ProfilePic = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProfilePicUpload = styled.div`
  flex: 1;
`;

const UploadButton = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: linear-gradient(135deg, #EFC0C2 0%, #d4a5a7 100%);
  color: white;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-1px);
  }

  input {
    display: none;
  }
`;

const PasswordSection = styled.div`
  border-top: 1px solid #e1e5e9;
  padding-top: 1.5rem;
`;

const PasswordInputGroup = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SaveButton = styled.button`
  flex: 1;
  background: linear-gradient(135deg, #EFC0C2 0%, #d4a5a7 100%);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(239, 192, 194, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ResetButton = styled.button`
  flex: 1;
  background: transparent;
  color: #666;
  border: 2px solid #e1e5e9;
  padding: 1rem;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover:not(:disabled) {
    border-color: #EFC0C2;
    color: #EFC0C2;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Message = styled.div<{ type: 'success' | 'error' }>`
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  background: ${props => props.type === 'success' ? 'rgba(39, 174, 96, 0.1)' : 'rgba(231, 76, 60, 0.1)'};
  color: ${props => props.type === 'success' ? '#27ae60' : '#e74c3c'};
  border: 1px solid ${props => props.type === 'success' ? '#27ae60' : '#e74c3c'};
`;

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const {
    formData,
    profilePicPreview,
    isSubmitting,
    isLoading,
    message,
    handleInputChange,
    handleProfilePicChange,
    handleSubmit,
    handleReset,
    resetForm
  } = useSettingsForm();

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClose = useCallback(() => {
    if (!isSubmitting) {
      resetForm();
      onClose();
    }
  }, [isSubmitting, resetForm, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <Modal
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <ModalContent
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton onClick={handleClose}>
              <X size={20} />
            </CloseButton>

            <Header>
              <Title>Account Settings</Title>
              <Subtitle>Update your profile information and preferences</Subtitle>
            </Header>

            <Form onSubmit={handleSubmit}>
              {message && (
                <Message type={message.type}>
                  {message.text}
                </Message>
              )}

              <Section>
                <SectionTitle>Profile Information</SectionTitle>
                
                <ProfilePicSection>
                  <ProfilePicPreview>
                    {profilePicPreview ? (
                      <ProfilePic src={profilePicPreview} alt="Profile" />
                    ) : (
                      <User size={32} color="#666" />
                    )}
                  </ProfilePicPreview>
                  <ProfilePicUpload>
                    <UploadButton>
                      <Camera size={16} />
                      Upload Photo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePicChange}
                      />
                    </UploadButton>
                  </ProfilePicUpload>
                </ProfilePicSection>

                <InputGroup>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    required
                  />
                </InputGroup>

                <InputGroup>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </InputGroup>
              </Section>

              <PasswordSection>
                <SectionTitle>Change Password</SectionTitle>
                
                <PasswordInputGroup>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={formData.currentPassword}
                    onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                  />
                  <PasswordToggle
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </PasswordToggle>
                </PasswordInputGroup>

                <PasswordInputGroup>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type={showNewPassword ? 'text' : 'password'}
                    value={formData.newPassword}
                    onChange={(e) => handleInputChange('newPassword', e.target.value)}
                  />
                  <PasswordToggle
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </PasswordToggle>
                </PasswordInputGroup>

                <PasswordInputGroup>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  />
                  <PasswordToggle
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </PasswordToggle>
                </PasswordInputGroup>
              </PasswordSection>

              <ButtonGroup>
                <ResetButton 
                  type="button" 
                  onClick={handleReset}
                  disabled={isSubmitting}
                >
                  Reset
                </ResetButton>
                <SaveButton type="submit" disabled={isSubmitting || isLoading}>
                  {isSubmitting ? 'Saving...' : (
                    <>
                      <Save size={16} />
                      Save Changes
                    </>
                  )}
                </SaveButton>
              </ButtonGroup>
            </Form>
          </ModalContent>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default SettingsModal; 