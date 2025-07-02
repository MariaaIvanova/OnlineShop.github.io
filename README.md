# 3D Online Shop

A beautiful, modern online shop with immersive 3D product models built with React, TypeScript, and Three.js.

## ✨ Features

- **3D Product Models**: Interactive 3D viewers for each product using Three.js
- **Modern Design**: Clean, minimalistic UI with smooth animations
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile
- **Shopping Cart**: Full cart functionality with slide-out panel
- **Product Filtering**: Filter by category and sort by price/name
- **Beautiful Animations**: Smooth transitions and hover effects using Framer Motion

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Styled Components** for styling
- **Three.js** with React Three Fiber for 3D graphics
- **Framer Motion** for animations
- **Lucide React** for icons

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd shop
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Navigation header
│   ├── Hero.tsx        # Hero section
│   ├── ProductGrid.tsx # Product listing
│   ├── ProductCard.tsx # Individual product card
│   ├── Product3DViewer.tsx # 3D model viewer
│   └── Cart.tsx        # Shopping cart
├── data/               # Data files
│   └── products.ts     # Product data
├── types/              # TypeScript type definitions
│   └── index.ts        # Product and cart types
├── App.tsx             # Main app component
└── index.tsx           # App entry point
```

## 🎨 Design Features

- **Gradient Backgrounds**: Beautiful gradient backgrounds throughout the app
- **Glass Morphism**: Modern glass-like effects with backdrop blur
- **Smooth Animations**: Hover effects, page transitions, and micro-interactions
- **3D Interactions**: Rotate, zoom, and explore products in 3D space
- **Responsive Grid**: Adaptive product grid that works on all screen sizes

## 🛍️ Shopping Features

- **Product Browsing**: View products with images and descriptions
- **3D Exploration**: Click to view products in interactive 3D
- **Add to Cart**: One-click add to cart functionality
- **Cart Management**: View, remove items, and clear cart
- **Category Filtering**: Filter products by category
- **Price Sorting**: Sort products by price or name

## 🎯 3D Features

- **Interactive Models**: Rotate and zoom 3D models
- **Auto-rotation**: Automatic model rotation with controls
- **Category-specific Models**: Different 3D shapes for different product categories
- **Realistic Lighting**: Studio lighting setup for best visual quality
- **Touch Controls**: Works with mouse and touch gestures

## 🔧 Customization

### Adding New Products

Edit `src/data/products.ts` to add new products:

```typescript
{
  id: 'unique-id',
  name: 'Product Name',
  description: 'Product description',
  price: 99.99,
  category: 'electronics', // or 'furniture'
  image: 'image-url',
  colors: ['Black', 'White'],
  sizes: ['One Size']
}
```

### Styling

The app uses styled-components for styling. Main color scheme:
- Primary: `#667eea` to `#764ba2` (gradient)
- Background: `#f5f7fa` to `#c3cfe2` (gradient)
- Text: `#333` (dark), `#666` (medium)

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🚀 Deployment

Build the app for production:

```bash
npm run build
```

The `dist` folder will contain the optimized production build.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using React, TypeScript, and Three.js
# OnlineShop.github.io
