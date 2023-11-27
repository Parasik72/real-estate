import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './common/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'dark-blue': '#091638'
      },
      fontSize: {
        '1.5xl': ['1.35rem', '1.85rem'],
        '6.5xl': ['4.05rem', '1.25']
      },
      padding: {
        '13': '3.25rem'
      },
      height: {
        '2px': '2px'
      },
      maxWidth: {
        '250px': '250px',
        '350px': '350px'
      }
    },
    customForms: (theme: any) => ({
      default: {
        select: {
          icon: '<svg fill="current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>',
        }
      }
    })
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/custom-forms')
  ],
}
export default config
