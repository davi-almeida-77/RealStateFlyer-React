/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        body:    ['"DM Sans"', 'sans-serif'],
        mono:    ['"Space Mono"', 'monospace'],
      },
      colors: {
        bg:     '#f0f0ec',
        dark:   '#111111',
        muted:  '#aaaaaa',
        ghost:  '#c8c8c8',
        canvas: '#ffffff',
      },
    },
  },
  plugins: [],
}
