import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';
import LoginModal from './components/LoginModal';
import MannequinStyler from './components/MannequinStyler';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Product } from './types';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #fefefe 0%, #fef8f5 100%);
`;

const MainContent = styled.main`
  padding-top: 80px;
`;

const NavigationButton = styled(Link)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  margin-left: 1rem;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  }
`;

const HomePage: React.FC = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCartItems(prev => [...prev, product]);
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const handleLoginRequired = () => {
    setIsLoginModalOpen(true);
  };

  const handleLoginSuccess = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <>
      <Header 
        cartItemCount={cartItems.length}
        onCartClick={() => setIsCartOpen(true)}
        onLoginClick={() => setIsLoginModalOpen(true)}
      />
      <MainContent>
        <Hero />
        <ProductGrid 
          onAddToCart={addToCart} 
          onLoginRequired={handleLoginRequired}
        />
      </MainContent>
      <Cart 
        isOpen={isCartOpen}
        items={cartItems}
        onClose={() => setIsCartOpen(false)}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
      />
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={handleLoginSuccess}
      />
    </>
  );
};

const StylerPage: React.FC = () => {
  return (
    <>
      <Header 
        cartItemCount={0}
        onCartClick={() => {}}
        onLoginClick={() => {}}
      />
      <MannequinStyler />
    </>
  );
};

const AppContent: React.FC = () => {
  return (
    <Router>
      <AppContainer>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/styler" element={<StylerPage />} />
        </Routes>
      </AppContainer>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App; 