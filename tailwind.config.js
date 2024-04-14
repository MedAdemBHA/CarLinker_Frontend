/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
        './node_modules/tw-elements-react/dist/js/**/*.js',
    ],
    theme: {
        extend: {
            colors: {
                TK: {
                    background: '#131921',
                    default: '#131921',
                },
            },
        },
    },
    plugins: [],
};
