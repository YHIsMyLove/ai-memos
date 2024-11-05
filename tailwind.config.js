/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        flomo: {
          "primary": "#121212",
          "primary-content": "#d9d9d9",
          "secondary": "#202020",
          "secondary-content": "#666666",
          "info": "#3A4359",
          "info-content": "#2B88D8",
          "accent": "#397354",
          "accent-content": "#d6e2da",
          "success": "#00f38c",
          "success-content": "#001407",
          "warning": "#ffa900",
          "warning-content": "#160a00",
          "error": "#ff0063",
          "error-content": "#160003",
        },
      },
    ],
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
  }

}