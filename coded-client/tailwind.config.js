module.exports = {
	purge: [],
	darkMode: 'class',
	theme: {
		screens: {
			xs: '200px',
			sm: '640px',
			md: '720px',
			lg: '1024px',
			xl: '1280px',
			'2xl': '1440px',
		},
		extend: {
			margin: {
				18: '4.5rem',
			},
			fontSize: {
				xxs: '.50rem',
			},
			gridRowStart: {
				8: '8',
				9: '9',
				10: '10',
				11: '11',
				12: '12',
				13: '13',
			},
			gridTemplateRows: {
				11: 'repeat(11, minmax(0, 1fr))',
				12: 'repeat(12, minmax(0, 1fr))',
			},
			zIndex: {
				60: 60,
				70: 70,
				80: 80,
				90: 90,
				100: 100,
			},
			keyframes: {
				wiggle: {
					'0%, 100%': {
						transform: 'rotate(-3deg)',
					},
					'50%': {
						transform: 'rotate(3deg)',
					},
				},
			},
			animation: {
				wiggle: 'wiggle 1s ease-in-out infinite',
			},
		},
	},
	variants: {
		extend: {
			zIndex: ['hover'],
			textOpacity: ['dark'],
		},
	},
	plugins: [],
};
