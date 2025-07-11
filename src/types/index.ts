export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  model3d?: string;
  colors?: string[];
  sizes?: string[];
  modelPath?: string;
  mannequinPath?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  profilePic?: string | null;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
} 