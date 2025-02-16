/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        // Main text font
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        // Headings and display text
        space: ['Space Grotesk', 'sans-serif'],
        // Code blocks and technical content
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        // Custom font sizes if needed
        '2xs': '0.625rem',
        '3xs': '0.5rem',
      },
      fontWeight: {
        // Custom font weights if needed
        thin: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
      },
      colors: {
        neutral: {
          25: 'hsl(174, 15%, 97%)',
          50: 'hsl(174, 15%, 94%)',
          100: 'hsl(174, 15%, 88%)',
          200: 'hsl(174, 15%, 82%)',
          300: 'hsl(174, 15%, 72%)',
          400: 'hsl(174, 15%, 64%)',
          500: 'hsl(174, 15%, 54%)',
          600: 'hsl(174, 15%, 44%)',
          700: 'hsl(174, 15%, 34%)',
          800: 'hsl(174, 15%, 24%)',
          900: 'hsl(174, 15%, 16%)',
          950: 'hsl(174, 15%, 12%)',
        },
        primary: {
          25: 'hsl(170, 80%, 97%)',
          50: 'hsl(170, 80%, 94%)',
          100: 'hsl(170, 80%, 88%)',
          200: 'hsl(170, 80%, 82%)',
          300: 'hsl(170, 80%, 72%)',
          400: 'hsl(170, 80%, 66%)',
          500: 'hsl(170, 80%, 60%)',
          600: 'hsl(170, 80%, 52%)',
          700: 'hsl(170, 80%, 44%)',
          800: 'hsl(170, 80%, 36%)',
          900: 'hsl(170, 80%, 28%)',
          950: 'hsl(170, 80%, 20%)',
        },
        secondary: {
          25: 'hsl(190, 75%, 97%)',
          50: 'hsl(190, 75%, 94%)',
          100: 'hsl(190, 75%, 88%)',
          200: 'hsl(190, 75%, 82%)',
          300: 'hsl(190, 75%, 72%)',
          400: 'hsl(190, 75%, 66%)',
          500: 'hsl(190, 75%, 60%)',
          600: 'hsl(190, 75%, 52%)',
          700: 'hsl(190, 75%, 44%)',
          800: 'hsl(190, 75%, 36%)',
          900: 'hsl(190, 75%, 28%)',
          950: 'hsl(190, 75%, 20%)',
        },
        tertiary: {
          25: 'hsl(150, 70%, 97%)',
          50: 'hsl(150, 70%, 94%)',
          100: 'hsl(150, 70%, 88%)',
          200: 'hsl(150, 70%, 82%)',
          300: 'hsl(150, 70%, 72%)',
          400: 'hsl(150, 70%, 66%)',
          500: 'hsl(150, 70%, 55%)',
          600: 'hsl(150, 70%, 48%)',
          700: 'hsl(150, 70%, 40%)',
          800: 'hsl(150, 70%, 32%)',
          900: 'hsl(150, 70%, 24%)',
          950: 'hsl(150, 70%, 16%)',
        },
        accent: '#0984E3',
        highlight: '#00D2D3',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        'none': '0px',
        'sm': '4px',
        DEFAULT: '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '24px',
        '3xl': '32px',
        'full': '9999px',
        'button': '8px'
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),
            maxWidth: '65ch',
            h1: {
              backgroundClip: 'text',
              backgroundImage: 'linear-gradient(to right, var(--tw-gradient-stops))',
              fontWeight: '800',
            },
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: theme('colors.primary.600'),
              },
            },
            h1: {
              color: theme('colors.gray.900'),
            },
            h2: {
              color: theme('colors.gray.900'),
            },
            h3: {
              color: theme('colors.gray.900'),
            },
            h4: {
              color: theme('colors.gray.900'),
            },
            code: {
              color: theme('colors.primary.500'),
              backgroundColor: theme('colors.gray.100'),
              padding: '0.25rem',
              borderRadius: '0.25rem',
              fontWeight: '500',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.primary.400'),
              '&:hover': {
                color: theme('colors.primary.300'),
              },
            },
            h1: {
              color: theme('colors.white'),
            },
            h2: {
              color: theme('colors.white'),
            },
            h3: {
              color: theme('colors.white'),
            },
            h4: {
              color: theme('colors.white'),
            },
            code: {
              color: theme('colors.primary.400'),
              backgroundColor: theme('colors.gray.800'),
            },
            blockquote: {
              color: theme('colors.gray.400'),
              borderLeftColor: theme('colors.gray.700'),
            },
            hr: {
              borderColor: theme('colors.gray.700'),
            },
            strong: {
              color: theme('colors.white'),
            },
            thead: {
              color: theme('colors.white'),
              borderBottomColor: theme('colors.gray.700'),
            },
            tbody: {
              tr: {
                borderBottomColor: theme('colors.gray.700'),
              },
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
} 