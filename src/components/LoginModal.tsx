import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye, EyeOff, User, Mail, Lock, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { LoginCredentials, SignupCredentials } from '../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
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
  max-width: 400px;
  width: 100%;
  overflow: hidden;
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

const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #e1e5e9;
`;

const Tab = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 600;
  color: ${props => props.$active ? '#EFC0C2' : '#666'};
  border-bottom: 2px solid ${props => props.$active ? '#EFC0C2' : 'transparent'};
  transition: all 0.3s ease;

  &:hover {
    color: #EFC0C2;
  }
`;

const FormContainer = styled.div`
  padding: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid #e1e5e9;
  border-radius: 10px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #EFC0C2;
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
`;

const SubmitButton = styled.button`
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

const ErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 0.9rem;
  text-align: center;
  margin-top: 1rem;
`;

const SuccessMessage = styled.div`
  color: #27ae60;
  font-size: 0.9rem;
  text-align: center;
  margin-top: 1rem;
`;

const DemoInfo = styled.div`
  background: rgba(239, 192, 194, 0.1);
  border: 1px solid #EFC0C2;
  border-radius: 10px;
  padding: 1rem;
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #666;
`;

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const { login, signup, isLoading } = useAuth();

  const [loginForm, setLoginForm] = useState<LoginCredentials>({
    email: '',
    password: ''
  });

  const [signupForm, setSignupForm] = useState<SignupCredentials>({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const success = await login(loginForm);
    if (success) {
      setSuccess('Login successful!');
      setTimeout(() => {
        onClose();
        onSuccess?.();
      }, 1000);
    } else {
      setError('Invalid email or password');
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (signupForm.password !== signupForm.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (signupForm.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    const success = await signup(signupForm);
    if (success) {
      setSuccess('Account created successfully!');
      setTimeout(() => {
        onClose();
        onSuccess?.();
      }, 1000);
    } else {
      setError('Email already exists');
    }
  };

  const handleTabChange = (tab: 'login' | 'signup') => {
    setActiveTab(tab);
    setError('');
    setSuccess('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Modal
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <ModalContent
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton onClick={onClose}>
              <X size={20} />
            </CloseButton>

            <TabContainer>
              <Tab
                $active={activeTab === 'login'}
                onClick={() => handleTabChange('login')}
              >
                <LogIn size={16} style={{ marginRight: '0.5rem' }} />
                Login
              </Tab>
              <Tab
                $active={activeTab === 'signup'}
                onClick={() => handleTabChange('signup')}
              >
                <UserPlus size={16} style={{ marginRight: '0.5rem' }} />
                Sign Up
              </Tab>
            </TabContainer>

            <FormContainer>
              {activeTab === 'login' ? (
                <Form onSubmit={handleLoginSubmit}>
                  <InputGroup>
                    <InputIcon>
                      <Mail size={20} />
                    </InputIcon>
                    <Input
                      type="email"
                      placeholder="Email"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </InputGroup>

                  <InputGroup>
                    <InputIcon>
                      <Lock size={20} />
                    </InputIcon>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                      required
                    />
                    <PasswordToggle
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </PasswordToggle>
                  </InputGroup>

                  <SubmitButton type="submit" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                  </SubmitButton>


                </Form>
              ) : (
                <Form onSubmit={handleSignupSubmit}>
                  <InputGroup>
                    <InputIcon>
                      <User size={20} />
                    </InputIcon>
                    <Input
                      type="text"
                      placeholder="Username"
                      value={signupForm.username}
                      onChange={(e) => setSignupForm(prev => ({ ...prev, username: e.target.value }))}
                      required
                    />
                  </InputGroup>

                  <InputGroup>
                    <InputIcon>
                      <Mail size={20} />
                    </InputIcon>
                    <Input
                      type="email"
                      placeholder="Email"
                      value={signupForm.email}
                      onChange={(e) => setSignupForm(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </InputGroup>

                  <InputGroup>
                    <InputIcon>
                      <Lock size={20} />
                    </InputIcon>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      value={signupForm.password}
                      onChange={(e) => setSignupForm(prev => ({ ...prev, password: e.target.value }))}
                      required
                    />
                    <PasswordToggle
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </PasswordToggle>
                  </InputGroup>

                  <InputGroup>
                    <InputIcon>
                      <Lock size={20} />
                    </InputIcon>
                    <Input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm Password"
                      value={signupForm.confirmPassword}
                      onChange={(e) => setSignupForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      required
                    />
                    <PasswordToggle
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </PasswordToggle>
                  </InputGroup>

                  <SubmitButton type="submit" disabled={isLoading}>
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </SubmitButton>
                </Form>
              )}

              {error && <ErrorMessage>{error}</ErrorMessage>}
              {success && <SuccessMessage>{success}</SuccessMessage>}
            </FormContainer>
          </ModalContent>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default LoginModal; 