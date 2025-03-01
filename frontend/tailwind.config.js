/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      // Main text font
      sans: ['DM Sans', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      // Headings and display text
      space: ['Space Grotesk', 'Azeret Mono', 'sans-serif'],
      // Code blocks and technical content
      mono: ['JetBrains Mono', 'monospace'],
    },
    extend: {
      fontSize: {
        // Thêm các custom sizes cho heading nếu cần
        'h1': ['2.5rem', { lineHeight: '1.2', fontWeight: '700' }],  /* 40px */
        'h2': ['2rem', { lineHeight: '1.25', fontWeight: '700' }],   /* 32px */
        'h3': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],  /* 24px */
        'h4': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }], /* 20px */
        'h5': ['1.1rem', { lineHeight: '1.5', fontWeight: '600' }],  /* 16px */
        // Giữ nguyên các sizes hiện tại
        '2xs': '0.625rem',  /* 10px */
        '3xs': '0.5rem',  /* 8px */
      },
      colors: {
        neutral: {
          25: 'hsl(180, 10%, 98%)',
          50: 'hsl(180, 10%, 94%)',
          100: 'hsl(180, 10%, 88%)',
          200: 'hsl(180, 10%, 82%)',
          300: 'hsl(180, 10%, 74%)',
          400: 'hsl(180, 10%, 66%)',
          500: 'hsl(180, 10%, 56%)',
          600: 'hsl(180, 10%, 46%)',
          700: 'hsl(180, 10%, 36%)',
          800: 'hsl(180, 10%, 26%)',
          900: 'hsl(180, 10%, 16%)',
          950: 'hsl(180, 10%, 10%)',
        },
        primary: { // Forest Teal
          25: 'hsl(174, 85%, 98%)',
          50: 'hsl(174, 85%, 95%)',
          100: 'hsl(174, 85%, 90%)',
          200: 'hsl(174, 80%, 82%)',
          300: 'hsl(174, 75%, 70%)',
          400: 'hsl(174, 75%, 60%)',
          500: 'hsl(174, 75%, 50%)',
          600: 'hsl(174, 80%, 40%)',
          700: 'hsl(174, 85%, 32%)',
          800: 'hsl(174, 90%, 25%)',
          900: 'hsl(174, 90%, 18%)',
          950: 'hsl(174, 95%, 12%)',
        },
        secondary: { // Sage Blue
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
        tertiary: { // Deep Green
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
        accent: {
          light: 'var(--color-accent)',
          hover: 'var(--color-accent-hover)',
          dark: 'var(--color-accent-dark)',
        },
        highlight: {
          light: 'var(--color-highlight)',
          dark: 'var(--color-highlight-dark)',
        },
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
            color: theme('colors.neutral.700'),
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
              color: theme('colors.neutral.900'),
            },
            h2: {
              color: theme('colors.neutral.900'),
            },
            h3: {
              color: theme('colors.neutral.900'),
            },
            h4: {
              color: theme('colors.neutral.900'),
            },
            code: {
              color: theme('colors.primary.500'),
              backgroundColor: theme('colors.neutral.100'),
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
            color: theme('colors.neutral.300'),
            a: {
              color: theme('colors.primary.400'),
              '&:hover': {
                color: theme('colors.primary.300'),
              },
            },
            h1: {
              color: theme('colors.neutral.50'),
            },
            h2: {
              color: theme('colors.neutral.50'),
            },
            h3: {
              color: theme('colors.neutral.50'),
            },
            h4: {
              color: theme('colors.neutral.50'),
            },
            code: {
              color: theme('colors.primary.400'),
              backgroundColor: theme('colors.neutral.800'),
            },
            blockquote: {
              color: theme('colors.neutral.400'),
              borderLeftColor: theme('colors.neutral.700'),
            },
            hr: {
              borderColor: theme('colors.neutral.700'),
            },
            strong: {
              color: theme('colors.neutral.50'),
            },
            thead: {
              color: theme('colors.neutral.50'),
              borderBottomColor: theme('colors.neutral.700'),
            },
            tbody: {
              tr: {
                borderBottomColor: theme('colors.neutral.700'),
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