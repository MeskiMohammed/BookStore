import './bootstrap';
import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import '../css/app.css';
import { CartProvider } from './components/store/cart-context';
import { ToastProvider } from './components/ToastContext';

createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
    return pages[`./Pages/${name}.jsx`]
  },
  setup({ el, App, props }) {
    createRoot(el).render(
      <ToastProvider>
        <CartProvider>
          <App {...props} />
        </CartProvider>
      </ToastProvider>
    )
  },
})
