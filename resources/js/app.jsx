import './bootstrap';
import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import '../css/app.css';
import { CartProvider } from './components/store/cart-context';
import { ToastProvider } from './components/ToastContext';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

createInertiaApp({
  title: (title) => `${title} - BookStore`,
  resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
  setup({ el, App, props }) {
    const root = createRoot(el);
    root.render(
      <ToastProvider>
        <CartProvider>
          <App {...props} />
        </CartProvider>
      </ToastProvider>
    );
  },
  progress: {
    color: '#4B5563',
  },
})
