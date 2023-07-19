/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            height: {
                screen: [
                    "100vh /* fallback for Opera, IE and etc. */", "100dvh"
                ],
            },
            colors: {
                main: "#000",
                primary: {
                    default: "#5EEE48"
                }
            },
            boxShadow: {
                main: "0 0.06rem 0.3rem rgba(234, 54, 175, 0.2), 0 0.08rem 3rem rgba(117, 250, 105, 0.2) !important",
            }
        },
    },
    plugins: [],
};