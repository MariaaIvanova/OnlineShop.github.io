import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';
import { Product } from '../types';

interface Product3DViewerProps {
  product: Product;
}

const ViewerContainer = styled.div`
  width: 100%;
  height: 600px;
  position: relative;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const Controls = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
  z-index: 10;
`;

const ControlButton = styled.button`
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: white;
    transform: scale(1.1);
  }
`;

const ProductInfo = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(255, 255, 255, 0.9);
  padding: 1rem;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  max-width: 300px;
`;

const ProductName = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
`;

const ProductDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
  line-height: 1.4;
`;

// Simple 3D model component - in a real app, you'd load actual 3D models
const ProductModel: React.FC<{ product: Product }> = ({ product }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  // Generate different 3D shapes based on product category
  const getModelGeometry = () => {
    switch (product.category) {
      case 'electronics':
        return <boxGeometry args={[2, 1, 1]} />;
      case 'furniture':
        return <cylinderGeometry args={[1, 1, 2, 8]} />;
      default:
        return <sphereGeometry args={[1, 32, 32]} />;
    }
  };

  const getModelMaterial = () => {
    switch (product.category) {
      case 'electronics':
        return <meshStandardMaterial color="#2c3e50" metalness={0.8} roughness={0.2} />;
      case 'furniture':
        return <meshStandardMaterial color="#8b4513" metalness={0.1} roughness={0.8} />;
      default:
        return <meshStandardMaterial color="#667eea" metalness={0.3} roughness={0.5} />;
    }
  };

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      {getModelGeometry()}
      {getModelMaterial()}
    </mesh>
  );
};

const Product3DViewer: React.FC<Product3DViewerProps> = ({ product }) => {
  const [autoRotate, setAutoRotate] = useState(true);

  const handleResetView = () => {
    // Reset camera position
    const controls = document.querySelector('canvas')?.parentElement?.querySelector('div');
    if (controls) {
      // This would reset the OrbitControls in a real implementation
    }
  };

  const toggleAutoRotate = () => {
    setAutoRotate(!autoRotate);
  };

  return (
    <ViewerContainer>
      <ProductInfo>
        <ProductName>{product.name}</ProductName>
        <ProductDescription>{product.description}</ProductDescription>
      </ProductInfo>

      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <ProductModel product={product} />
        
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          autoRotate={autoRotate}
          autoRotateSpeed={2}
        />
        
        <Environment preset="studio" />
      </Canvas>

      <Controls>
        <ControlButton onClick={handleResetView} title="Reset View">
          🔄
        </ControlButton>
        <ControlButton onClick={toggleAutoRotate} title={autoRotate ? "Stop Rotation" : "Start Rotation"}>
          {autoRotate ? "⏸️" : "▶️"}
        </ControlButton>
      </Controls>
    </ViewerContainer>
  );
};

export default Product3DViewer; 