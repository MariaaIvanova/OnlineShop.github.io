import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.section`
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #fefefe 0%, #fef8f5 100%);
`;

const AboutContent = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const AboutText = styled.div`
  h2 {
    font-size: 2.5rem;
    font-weight: 700;
    background: linear-gradient(135deg, #EFC0C2 0%, #d4a5a7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 1.5rem;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: #666;
    margin-bottom: 1.5rem;
  }

  .highlight {
    color: #EFC0C2;
    font-weight: 600;
  }
`;

const AboutImage = styled.div`
  background: linear-gradient(135deg, #EFC0C2 0%, #d4a5a7 100%);
  border-radius: 20px;
  padding: 3rem;
  text-align: center;
  box-shadow: 0 20px 40px rgba(239, 192, 194, 0.2);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    animation: float 6s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
  }
`;

const IconContainer = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
`;

const StatsContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const StatCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .number {
    font-size: 2rem;
    font-weight: 700;
    color: #EFC0C2;
    margin-bottom: 0.5rem;
  }

  .label {
    font-size: 0.9rem;
    color: #666;
    font-weight: 500;
  }
`;

const About: React.FC = () => {
  return (
    <AboutContainer id="about">
      <AboutContent>
        <AboutText>
          <h2>Welcome to 3D Shop</h2>
          <p>
            We're passionate about bringing you the most innovative and stylish products 
            with cutting-edge 3D visualization technology. Our mission is to provide 
            an immersive shopping experience that lets you explore products like never before.
          </p>
          <p>
            From <span className="highlight">fashion-forward clothing</span> to 
            <span className="highlight"> elegant furniture</span> and 
            <span className="highlight"> cutting-edge electronics</span>, 
            we curate only the finest items for our customers.
          </p>
          <p>
            Experience the future of online shopping with our interactive 3D models, 
            allowing you to examine every detail before making your purchase decision.
          </p>
        </AboutText>

        <AboutImage>
          <IconContainer>🛍️</IconContainer>
          <h3 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>
            Experience Shopping in 3D
          </h3>
          <p style={{ color: 'white', opacity: 0.9 }}>
            Rotate, zoom, and explore products from every angle
          </p>
        </AboutImage>
      </AboutContent>

      <StatsContainer>
        <StatCard>
          <div className="number">8</div>
          <div className="label">Unique Products</div>
        </StatCard>
        <StatCard>
          <div className="number">3</div>
          <div className="label">Product Categories</div>
        </StatCard>
        <StatCard>
          <div className="number">100%</div>
          <div className="label">3D Interactive</div>
        </StatCard>
      </StatsContainer>
    </AboutContainer>
  );
};

export default About; 