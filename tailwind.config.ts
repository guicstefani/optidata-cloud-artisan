
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				// Premium Gold System
				gold: {
					50: '#FFFDF5',
					100: '#FFF9E6',
					200: '#FFF2CC',
					300: '#FFE599',
					400: '#FFD966',
					500: '#F4C430', // Amarelo mel
					600: '#DCAE1D', // Dourado premium
					700: '#B8941A',
					800: '#947317',
					900: '#715612',
				},
				// Premium Dark System
				dark: {
					50: '#F5F5F5',
					100: '#E0E0E0',
					200: '#BDBDBD',
					300: '#9E9E9E',
					400: '#757575',
					500: '#616161',
					600: '#424242',
					700: '#2d2d2d', // Cinza escuro
					800: '#1a1a1a', // Preto suave
					900: '#0f0f0f', // Preto profundo
				},
				// Enhanced card system
				card: {
					DEFAULT: '#1e1e1e',
					foreground: 'hsl(var(--card-foreground))'
				},
				primary: {
					DEFAULT: '#DCAE1D',
					foreground: '#0f0f0f'
				},
				secondary: {
					DEFAULT: '#2d2d2d',
					foreground: '#F4C430'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: '#2d2d2d',
					foreground: '#9E9E9E'
				},
				accent: {
					DEFAULT: '#F4C430',
					foreground: '#0f0f0f'
				},
				popover: {
					DEFAULT: '#1e1e1e',
					foreground: 'hsl(var(--popover-foreground))'
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0', opacity: '0' },
					to: { height: 'var(--radix-accordion-content-height)', opacity: '1' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)', opacity: '1' },
					to: { height: '0', opacity: '0' }
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'scale-in': {
					'0%': {
						transform: 'scale(0.95)',
						opacity: '0'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				},
				'slide-in-right': {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0)' }
				},
				'shimmer': {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' }
				},
				'glow': {
					'0%, 100%': { boxShadow: '0 0 5px rgba(220, 174, 29, 0.3)' },
					'50%': { boxShadow: '0 0 20px rgba(220, 174, 29, 0.6), 0 0 30px rgba(220, 174, 29, 0.4)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-5px)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'scale-in': 'scale-in 0.2s ease-out',
				'slide-in-right': 'slide-in-right 0.3s ease-out',
				'shimmer': 'shimmer 2s infinite linear',
				'glow': 'glow 2s ease-in-out infinite',
				'float': 'float 3s ease-in-out infinite'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'mesh-gold': 'linear-gradient(135deg, #DCAE1D 0%, #F4C430 50%, #FFD966 100%)',
				'mesh-dark': 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #2d2d2d 100%)'
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
				mono: ['JetBrains Mono', 'monospace'],
			}
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		function({ addUtilities }: any) {
			addUtilities({
				'.hover-scale': {
					'@apply transition-all duration-300 hover:scale-105 hover:shadow-lg': {},
				},
				'.hover-glow': {
					'@apply transition-all duration-300 hover:shadow-gold-600/30 hover:shadow-lg': {},
				},
				'.glass': {
					'background': 'rgba(30, 30, 30, 0.8)',
					'backdrop-filter': 'blur(12px)',
					'border': '1px solid rgba(220, 174, 29, 0.2)',
				},
				'.shimmer': {
					'background': 'linear-gradient(90deg, transparent, rgba(220, 174, 29, 0.4), transparent)',
					'background-size': '200% 100%',
				}
			})
		}
	],
} satisfies Config;
