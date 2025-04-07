import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from 'tailwindcss';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
        }),
        tailwindcss(),
        react(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'resources/js'),
        },
    },
    /*server: {
        host: '0.0.0.0', // Allow access from the network
        port: 5173, // Default Vite port
        strictPort: true,
        cors: true,
        hmr: {
            host: '192.168.100.57', // Replace with your actual local IP
        },
    },*/
});
