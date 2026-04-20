/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,tsx,jsx,vue,js}",
    "./index.html",
    "./**/*.html",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        /* ── Semantic tokens (CSS-variable driven, theme-aware) ── */
        background:           'var(--background)',
        foreground:           'var(--foreground)',
        card: {
          DEFAULT:            'var(--card)',
          foreground:         'var(--card-foreground)',
        },
        popover: {
          DEFAULT:            'var(--popover)',
          foreground:         'var(--popover-foreground)',
        },
        primary: {
          DEFAULT:            'var(--primary)',
          foreground:         'var(--primary-foreground)',
          light:              'var(--primary-light)',
        },
        secondary: {
          DEFAULT:            'var(--secondary)',
          foreground:         'var(--secondary-foreground)',
        },
        muted: {
          DEFAULT:            'var(--muted)',
          foreground:         'var(--muted-foreground)',
        },
        accent: {
          DEFAULT:            'var(--accent)',
          foreground:         'var(--accent-foreground)',
        },
        destructive: {
          DEFAULT:            'var(--destructive)',
          foreground:         'var(--destructive-foreground)',
        },
        mono: {
          DEFAULT:            'var(--mono)',
          foreground:         'var(--mono-foreground)',
        },
        border:               'var(--border)',
        input:                'var(--input)',
        ring:                 'var(--ring)',
        success: {
          DEFAULT: 'var(--success)',
          light:   'var(--success-light)',
        },
        warning: {
          DEFAULT: 'var(--warning)',
          light:   'var(--warning-light)',
        },
        danger: {
          DEFAULT: 'var(--danger)',
          light:   'var(--danger-light)',
        },
        info: {
          DEFAULT: 'var(--info)',
          light:   'var(--info-light)',
        },
        gray: {
          50:  'var(--gray-50)',  100: 'var(--gray-100)', 200: 'var(--gray-200)',
          300: 'var(--gray-300)', 400: 'var(--gray-400)', 500: 'var(--gray-500)',
          600: 'var(--gray-600)', 700: 'var(--gray-700)', 800: 'var(--gray-800)',
          900: 'var(--gray-900)', 950: 'var(--gray-950)',
        },
        surface: {
          DEFAULT: 'var(--card)',
          muted:   'var(--muted)',
          strong:  'var(--accent)',
        },

        /* ── Named palette — color_codes.md ── */

        /* Blue family */
        blue: {
          DEFAULT:    '#3598DC',
          madison:    '#578EBE',
          chambray:   '#2C3E50',
          ebonyclay:  '#22313F',
          hoki:       '#67809F',
          steel:      '#4B77BE',
          soft:       '#4C87B9',
          dark:       '#5E738B',
          sharp:      '#5C9BD1',
          oleo:       '#94A0B2',
        },

        /* Green family */
        green: {
          DEFAULT:    '#32C5D2',
          meadow:     '#1BBC9B',
          seagreen:   '#1BA39C',
          turquoise:  '#36D7B7',
          haze:       '#44B6AE',
          jungle:     '#26C281',
          soft:       '#3FABA4',
          dark:       '#4DB3A2',
          sharp:      '#2AB4C0',
          steel:      '#29B4B6',
        },

        /* Grey family */
        grey: {
          DEFAULT:    '#E5E5E5',
          steel:      '#E9EDEF',
          cararra:    '#FAFAFA',
          gallery:    '#555555',
          cascade:    '#95A5A6',
          silver:     '#BFBFBF',
          salsa:      '#ACB5C3',
          salt:       '#BFCAD1',
          mint:       '#525E64',
        },

        /* Red / Pink family */
        red: {
          DEFAULT:      '#E7505A',
          pink:         '#E08283',
          sunglo:       '#E26A6A',
          intense:      '#E35B5A',
          thunderbird:  '#D91E18',
          flamingo:     '#EF4836',
          soft:         '#D05454',
          haze:         '#F36A5A',
          mint:         '#E43A45',
        },

        /* Yellow / Orange family */
        yellow: {
          DEFAULT:      '#C49F47',
          gold:         '#E87E04',
          casablanca:   '#F2784B',
          crusta:       '#F3C200',
          lemon:        '#F7CA18',
          saffron:      '#F4D03F',
          soft:         '#C8D046',
          haze:         '#C5BF66',
          mint:         '#C5B96B',
        },

        /* Purple family */
        purple: {
          DEFAULT:    '#8E44AD',
          plum:       '#8775A7',
          medium:     '#BF55EC',
          studio:     '#8E44AD',
          wisteria:   '#9B59B6',
          seance:     '#9A12B3',
          intense:    '#8775A7',
          sharp:      '#796799',
          soft:       '#8877A9',
        },

        /* Base neutrals */
        dark:    '#2F353B',
        default: '#E1E5EC',
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"'],
      },
      fontSize: {
        '2xs':  ['0.6875rem', { lineHeight: '1.2' }],
        'xs':   ['0.75rem',   { lineHeight: '1.125rem' }],
        '2sm':  ['0.8125rem', { lineHeight: '1.323' }],
        'sm':   ['0.875rem',  { lineHeight: '1.25rem' }],
        'base': ['0.9375rem', { lineHeight: '1.5rem' }],
        'md':   ['1rem',      { lineHeight: '1.5rem' }],
        'lg':   ['1.125rem',  { lineHeight: '1.625rem' }],
        'xl':   ['1.25rem',   { lineHeight: '1.75rem' }],
        '2xl':  ['1.5rem',    { lineHeight: '2rem' }],
        '3xl':  ['1.875rem',  { lineHeight: '2.25rem' }],
      },
      borderRadius: {
        'sm':     'var(--radius-sm)',
        'md':     'var(--radius-md)',
        'lg':     'var(--radius-lg)',
        'xl':     'var(--radius-xl)',
        '2xl':    'var(--radius-2xl)',
        'full':   'var(--radius-full)',
        'card':   'var(--radius-xl)',
        'button': 'var(--radius-md)',
        'input':  'var(--radius-md)',
      },
      boxShadow: {
        'xs':   'var(--shadow-xs)',
        'sm':   'var(--shadow-sm)',
        'md':   'var(--shadow-md)',
        'lg':   'var(--shadow-lg)',
        'xl':   'var(--shadow-xl)',
        'card': 'var(--shadow-sm)',
        'lift': '0 4px 18px -2px rgba(0,0,0,.08)',
      },
      spacing: {
        4.5: '1.125rem',
        5.5: '1.375rem',
        7.5: '1.875rem',
        18:  '4.5rem',
        88:  '22rem',
        128: '32rem',
      },
      transitionDuration: {
        fast: '150ms',
        normal: '200ms',
      },
    },
  },
  plugins: [],
};
