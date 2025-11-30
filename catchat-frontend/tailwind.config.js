/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  corePlugins: {

  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        coffee: {
          "color-scheme": "dark",
          "primary": "oklch(71.996% 0.123 62.756)",
          "primary-content": "oklch(14.399% 0.024 62.756)",
          "secondary": "oklch(34.465% 0.029 199.194)",
          "secondary-content": "oklch(86.893% 0.005 199.194)",
          "accent": "oklch(42.621% 0.074 224.389)",
          "accent-content": "oklch(88.524% 0.014 224.389)",
          "neutral": "oklch(16.51% 0.015 326.261)",
          "neutral-content": "oklch(83.302% 0.003 326.261)",
          "base-100": "oklch(24% 0.023 329.708)",
          "base-200": "oklch(21% 0.021 329.708)",
          "base-300": "oklch(16% 0.019 329.708)",
          "base-content": "oklch(72.354% 0.092 79.129)",
          "info": "oklch(79.49% 0.063 184.558)",
          "info-content": "oklch(15.898% 0.012 184.558)",
          "success": "oklch(74.722% 0.072 131.116)",
          "success-content": "oklch(14.944% 0.014 131.116)",
          "warning": "oklch(88.15% 0.14 87.722)",
          "warning-content": "oklch(17.63% 0.028 87.722)",
          "error": "oklch(77.318% 0.128 31.871)",
          "error-content": "oklch(15.463% 0.025 31.871)",
          "--rounded-box": "1rem",
          "--rounded-btn": "0.5rem",
          "--rounded-badge": "1rem",
          "--animation-btn": "0.25s",
          "--animation-input": "0.2s",
          "--btn-focus-scale": "0.95",
          "--border-btn": "1px",
          "--tab-border": "1px",
          "--tab-radius": "0.5rem",
        },
      },
    ],
    styled: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
  },
}

