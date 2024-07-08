/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary:"#db4f4a"
            },
        },

        container: {
            center: true,
            padding: "1rem",
        },
    },
};
