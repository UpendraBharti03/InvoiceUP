import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'
import {TanStackRouterVite} from '@tanstack/router-vite-plugin';
import path from 'path';
import process from 'process';

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd(), '')
    const port = Number(env?.PORT) || 3000;
    return {
        resolve: {
            alias: {
                '@/': path.resolve(__dirname, './src'),
                '@ui-helpers': path.resolve(__dirname, './src/libs/ui-helpers'),
                '@ant-ui': path.resolve(__dirname, './src/libs/ant-ui'),
            },
        },
        plugins: [
            react(),
            TanStackRouterVite(),
        ],
        server: {
            port,
        },
        build: {
            outDir: "build",
        },
        preview: {
            port,
            base: "build",
        },
        define: {
            __APP_ENV__: JSON.stringify(env.APP_ENV),
        }
    }
})
