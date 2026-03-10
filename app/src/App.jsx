import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { usePreloadImages } from './hooks/usePreloadImages';
import { PRELOAD_IMAGES } from './data/productsData';
import { LoadingScreen } from './components/LoadingScreen';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Cart } from './components/Cart';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';

function AppContent() {
  const [cartOpen, setCartOpen] = useState(false);
  return (
    <>
      <Header onOpenCart={() => setCartOpen(true)} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/produtos/:category" element={<CategoryPage />} />
      </Routes>
      <Cart open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

export default function App() {
  const appReady = usePreloadImages(PRELOAD_IMAGES);

  if (!appReady) {
    return <LoadingScreen />;
  }

  return (
    <BrowserRouter>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </BrowserRouter>
  );
}
