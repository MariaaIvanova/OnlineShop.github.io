import React from 'react';
import styled from 'styled-components';
import { ShoppingCart, Menu } from 'lucide-react';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
`;

const Logo = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
  background: linear-gradient(135deg, #EFC0C2 0%, #d4a5a7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: #EFC0C2;
  }
`;

const CartButton = styled.button`
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(239, 192, 194, 0.1);
  }
`;

const CartBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
      background: #EFC0C2;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Header: React.FC<HeaderProps> = ({ cartItemCount, onCartClick }) => {
  return (
    <HeaderContainer>
      <Logo>3D Shop</Logo>
      
      <Nav>
        <NavLink href="#home">Home</NavLink>
        <NavLink href="#products">Products</NavLink>
        <NavLink href="#about">About</NavLink>
        <NavLink href="#contact">Contact</NavLink>
      </Nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <CartButton onClick={onCartClick}>
          <ShoppingCart size={24} />
          {cartItemCount > 0 && <CartBadge>{cartItemCount}</CartBadge>}
        </CartButton>
        
        <MobileMenuButton>
          <Menu size={24} />
        </MobileMenuButton>
      </div>
    </HeaderContainer>
  );
};

export default Header; 