import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';
import { FBXLoader } from 'three-stdlib';
import * as THREE from 'three';

interface ClothingItem {
  id: string;
  name: string;
  description: string;
  image: string;
  modelPath: string;
  category: 'clothes';
}

const clothingItems: ClothingItem[] = [
  {
    id: '1',
    name: 'Cutie Patootie t-shirt',
    description: 'Comfortable and stylish Cutie Patootie t-shirt designed for literal divas.',
    image: '/models/Basic Tee1 Preview.png',
    modelPath: 'public/models/moniken/Basic Tee1 Manequeen_Model.fbx',
    category: 'clothes'
  },
  {
    id: '2',
    name: 'Girlyboss t-shirt',
    description: 'Another fabulous t-shirt for the ultimate diva vibes and girlboss energy.',
    image: '/models/Basic Tee2 Preview.png',
    modelPath: 'public/models/moniken/Basic Tee2 Manequeen_Model.fbx',
    category: 'clothes'
  },
  {
    id: '3',
    name: 'Girlypop t-shirt',
    description: 'The iconic girlypop t-shirt for the queen who slays every day.',
    image: '/models/Basic Tee3 Preview.png',
    modelPath: 'public/models/moniken/Basic Tee3 Manequeen_Model.fbx',
    category: 'clothes'
  },
  {
    id: '4',
    name: 'Stylish Cap',
    description: 'A trendy and fashionable cap perfect for any outfit and occasion.',
    image: '/models/cup1.png', // Using cup image as placeholder - you may want to add a hat preview image
    modelPath: 'public/models/Cappa Manequeen_Model.fbx',
    category: 'clothes'
  }
];

const Container = styled.div`
  display: flex;
  height: 100vh;
  background: linear-gradient(135deg, #fefefe 0%, #fef8f5 100%);
`;

const Sidebar = styled.div`
  width: 300px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  padding: 2rem;
  overflow-y: auto;
  box-shadow: 2px 0 20px rgba(0, 0, 0, 0.1);
`;

const SidebarTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #333;
  text-align: center;
`;

const ClothingGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ClothingCard = styled.div<{ $isSelected: boolean }>`
  background: ${props => props.$isSelected ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'white'};
  border: 2px solid ${props => props.$isSelected ? '#667eea' : 'rgba(0, 0, 0, 0.1)'};
  border-radius: 15px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const ClothingImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 0.5rem;
`;

const ClothingName = styled.h3<{ $isSelected: boolean }>`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: ${props => props.$isSelected ? 'white' : '#333'};
`;

const ClothingDescription = styled.p<{ $isSelected: boolean }>`
  font-size: 0.8rem;
  color: ${props => props.$isSelected ? 'rgba(255, 255, 255, 0.8)' : '#666'};
  line-height: 1.3;
`;

const ViewerContainer = styled.div`
  flex: 1;
  position: relative;
  background: linear-gradient(135deg, #fefefe 0%, #fef8f5 100%);
`;

const Controls = styled.div`
  position: absolute;
  bottom: 2rem;
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
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  &:hover {
    background: white;
    transform: scale(1.1);
  }

  svg {
    width: 20px;
    height: 20px;
    color: #333;
  }
`;

const InfoPanel = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: rgba(255, 255, 255, 0.95);
  padding: 1.5rem;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  max-width: 300px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const InfoTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
`;

const InfoText = styled.p`
  font-size: 0.9rem;
  color: #666;
  line-height: 1.4;
`;

const MannequinModel: React.FC<{ selectedItem: ClothingItem | null }> = ({ selectedItem }) => {
  const meshRef = useRef<THREE.Group>(null);
  const [model, setModel] = useState<THREE.Group | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    
    if (!selectedItem) {
      setModel(null);
      setIsLoading(false);
      return;
    }

    console.log('Loading model:', selectedItem.modelPath);

    const loader = new FBXLoader();
    loader.load(selectedItem.modelPath, (object) => {
      console.log('Model loaded successfully:', object);
      
      try {
        // Reset transformations
        object.scale.set(1, 1, 1);
        object.position.set(0, 0, 0);
        object.rotation.set(0, 0, 0);
        
        // Center the model
        const box = new THREE.Box3().setFromObject(object);
        const center = box.getCenter(new THREE.Vector3());
        object.position.sub(center);
        
        // Scale the model appropriately
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 1.5 / maxDim; // Scale to fit in view
        object.scale.setScalar(scale);
        
        // Move the model up a bit so it's centered in view
        object.position.y += 0.5;
        
        object.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            if (child.material) {
              child.material.needsUpdate = true;
              // Ensure materials are visible
              if (Array.isArray(child.material)) {
                child.material.forEach(mat => {
                  mat.transparent = false;
                  mat.opacity = 1;
                  mat.side = THREE.DoubleSide;
                  mat.emissive = new THREE.Color(0x111111); // Add slight emissive for visibility
                });
              } else {
                child.material.transparent = false;
                child.material.opacity = 1;
                child.material.side = THREE.DoubleSide;
                child.material.emissive = new THREE.Color(0x111111); // Add slight emissive for visibility
              }
            }
          }
        });
        
        setModel(object);
        setIsLoading(false);
      } catch (err) {
        console.error('Error processing model:', err);
        setError('Failed to process model');
        setIsLoading(false);
      }
    }, undefined, (error) => {
      console.error('Error loading model:', error);
      setError('Failed to load model');
      setIsLoading(false);
    });
  }, [selectedItem]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  if (isLoading) {
    return (
      <group>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 2, 8]} />
          <meshStandardMaterial color="#f0f0f0" metalness={0.1} roughness={0.8} />
        </mesh>
        <mesh position={[0, 1.5, 0]}>
          <sphereGeometry args={[0.4, 16, 16]} />
          <meshStandardMaterial color="#f0f0f0" metalness={0.1} roughness={0.8} />
        </mesh>
      </group>
    );
  }

  if (error) {
    return (
      <group>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 2, 8]} />
          <meshStandardMaterial color="#ff6b6b" metalness={0.1} roughness={0.8} />
        </mesh>
        <mesh position={[0, 1.5, 0]}>
          <sphereGeometry args={[0.4, 16, 16]} />
          <meshStandardMaterial color="#ff6b6b" metalness={0.1} roughness={0.8} />
        </mesh>
      </group>
    );
  }

  if (!model) {
    return (
      <group>
        {/* Default mannequin body */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 2, 8]} />
          <meshStandardMaterial color="#f0f0f0" metalness={0.1} roughness={0.8} />
        </mesh>
        {/* Default head */}
        <mesh position={[0, 1.5, 0]}>
          <sphereGeometry args={[0.4, 16, 16]} />
          <meshStandardMaterial color="#f0f0f0" metalness={0.1} roughness={0.8} />
        </mesh>
      </group>
    );
  }

  console.log('Rendering model:', model);
  
  return (
    <group>
      <primitive 
        ref={meshRef} 
        object={model} 
      />
      {/* Add a simple cube to test if 3D rendering is working */}
      <mesh position={[2, 0, 0]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#00ff00" />
      </mesh>
    </group>
  );
};

const MannequinStyler: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<ClothingItem | null>(clothingItems[0]); // Start with first item selected
  const [autoRotate, setAutoRotate] = useState(true);

  const handleResetView = () => {
    // This will be handled by OrbitControls
  };

  const toggleAutoRotate = () => {
    setAutoRotate(!autoRotate);
  };

  return (
    <Container>
      <Sidebar>
        <SidebarTitle>Available Styles</SidebarTitle>
        <ClothingGrid>
          {clothingItems.map((item) => (
            <ClothingCard
              key={item.id}
              $isSelected={selectedItem?.id === item.id}
              onClick={() => setSelectedItem(item)}
            >
              <ClothingImage src={item.image} alt={item.name} />
              <ClothingName $isSelected={selectedItem?.id === item.id}>
                {item.name}
              </ClothingName>
              <ClothingDescription $isSelected={selectedItem?.id === item.id}>
                {item.description}
              </ClothingDescription>
            </ClothingCard>
          ))}
        </ClothingGrid>
      </Sidebar>

      <ViewerContainer>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          style={{ background: 'transparent' }}
          gl={{ 
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            failIfMajorPerformanceCaveat: false
          }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
            gl.shadowMap.enabled = true;
            gl.shadowMap.type = THREE.PCFSoftShadowMap;
          }}
        >
          <ambientLight intensity={1.0} />
          <directionalLight 
            position={[5, 5, 5]} 
            intensity={1.5} 
            castShadow 
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <directionalLight 
            position={[-5, 5, -5]} 
            intensity={1.0} 
            color="#ffffff"
          />
          <directionalLight 
            position={[0, 10, 0]} 
            intensity={0.8} 
            color="#ffffff"
          />
          <pointLight 
            position={[0, 0, 5]} 
            intensity={0.5} 
            color="#ffffff"
          />
          
          <MannequinModel selectedItem={selectedItem} />
          
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            autoRotate={autoRotate}
            autoRotateSpeed={1}
            minDistance={2}
            maxDistance={10}
          />
          
          <Environment preset="sunset" />
        </Canvas>

        <Controls>
          <ControlButton onClick={handleResetView} title="Reset View">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </ControlButton>
          <ControlButton onClick={toggleAutoRotate} title={autoRotate ? "Stop Rotation" : "Start Rotation"}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </ControlButton>
        </Controls>

        <InfoPanel>
          <InfoTitle>3D Mannequin Styler</InfoTitle>
          <InfoText>
            {selectedItem 
              ? `Currently wearing: ${selectedItem.name}. Click on different items in the sidebar to try them on!`
              : "Select a clothing item from the sidebar to see it on the mannequin. Use the controls to rotate and zoom the view."
            }
          </InfoText>
        </InfoPanel>
      </ViewerContainer>
    </Container>
  );
};

export default MannequinStyler; 