/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{vue, js,ts,jsx,tsx}'],
	theme: {
		fontFamily: {
			heading: ['Righteous', 'cursive'],
			body: ['Poppins', 'sans-serif'],
		},
		extend: {},
	},
	plugins: [],
};
