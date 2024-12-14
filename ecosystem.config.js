require('dotenv').config()
module.exports = {
	apps: [
		{
			name: 'sistem-informasi-relawan',
			script: 'node_modules/next/dist/bin/next',
			exec_mode: 'fork', // Change exec_mode to 'fork' for single instance
			instances: 1, // Set instances to 1
			args: 'start',
			env: {
				APP_PORT: 8010,
				// 'NODE_ENV': 'development'
				...process.env
			}
		}
	]
}
