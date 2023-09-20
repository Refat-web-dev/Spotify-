// vite.config.js
import {
    resolve
} from 'path'
import {
    defineConfig
} from 'vite'

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                playlist: resolve(__dirname, '/pages/playlist/index.html'),
                persons: resolve(__dirname, '/pages/persons/index.html'),
            },
        },
    },
})