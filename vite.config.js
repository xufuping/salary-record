import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

export default defineConfig({
	plugins: [
		uni()
	],
	server: {
		port: 8084,
		proxy: {
			'/api': {
				target: 'https//:chaxinjujuan.com', // 目标服务  
				changeOrigin: true,
				rewrite: path => path.replace(/^\/api/, ''),
			}
		}
	}
})