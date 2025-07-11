import React, { useState } from 'react';
import styled from 'styled-components';

const ContactContainer = styled.section`
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #fefefe 0%, #fef8f5 100%);
`;

const ContactContent = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ContactInfo = styled.div`
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
    margin-bottom: 2rem;
  }
`;

const ContactMethod = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }

  .icon {
    font-size: 1.5rem;
    color: #EFC0C2;
  }

  .details {
    h4 {
      font-size: 1.1rem;
      font-weight: 600;
      color: #333;
      margin-bottom: 0.25rem;
    }

    p {
      font-size: 0.9rem;
      color: #666;
      margin: 0;
    }
  }
`;

const ContactForm = styled.form`
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  label {
    display: block;
    font-weight: 600;
    color: #333;
    margin-bottom: 0.5rem;
  }

  input, textarea, select {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #e1e5e9;
    border-radius: 10px;
    font-size: 1rem;
    transition: border-color 0.3s ease;

    &:focus {
      outline: none;
      border-color: #EFC0C2;
    }
  }

  textarea {
    resize: vertical;
    min-height: 120px;
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #EFC0C2 0%, #d4a5a7 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(239, 192, 194, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const SuccessMessage = styled.div`
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  color: white;
  padding: 1rem;
  border-radius: 10px;
  text-align: center;
  margin-top: 1rem;
  font-weight: 600;
`;

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });

    // Reset success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <ContactContainer id="contact">
      <ContactContent>
        <ContactInfo>
          <h2>Get in Touch</h2>
          <p>
            Have questions about our products or need assistance with your order? 
            We'd love to hear from you! Send us a message and we'll respond as soon as possible.
          </p>

          <ContactMethod>
            <div className="icon">📧</div>
            <div className="details">
              <h4>Email</h4>
              <p>hello@3dshop.com</p>
            </div>
          </ContactMethod>

          <ContactMethod>
            <div className="icon">📱</div>
            <div className="details">
              <h4>Phone</h4>
              <p>+1 (555) 123-4567</p>
            </div>
          </ContactMethod>

          <ContactMethod>
            <div className="icon">📍</div>
            <div className="details">
              <h4>Address</h4>
              <p>123 3D Street, Digital City, DC 12345</p>
            </div>
          </ContactMethod>

          <ContactMethod>
            <div className="icon">⏰</div>
            <div className="details">
              <h4>Business Hours</h4>
              <p>Mon-Fri: 9AM-6PM | Sat: 10AM-4PM</p>
            </div>
          </ContactMethod>
        </ContactInfo>

        <ContactForm onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email address"
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="subject">Subject *</label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            >
              <option value="">Select a subject</option>
              <option value="general">General Inquiry</option>
              <option value="product">Product Question</option>
              <option value="order">Order Status</option>
              <option value="support">Technical Support</option>
              <option value="feedback">Feedback</option>
            </select>
          </FormGroup>

          <FormGroup>
            <label htmlFor="message">Message *</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Tell us how we can help you..."
            />
          </FormGroup>

          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </SubmitButton>

          {isSubmitted && (
            <SuccessMessage>
              Thank you! Your message has been sent successfully. We'll get back to you soon!
            </SuccessMessage>
          )}
        </ContactForm>
      </ContactContent>
    </ContactContainer>
  );
};

export default Contact; 