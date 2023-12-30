/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: {
				primary: "#4BE7AE",
				secondary: "#0F6C4A",
				text: "#D3FDEE",
			},
			keyframes: {
				"accordion-down": {
					from: { height: 0 },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: 0 },
				},
				"scale-up": {
					"0%": {
						transform: "scale(1);",
					},
					"100%": {
						transform: "scale(1.05);",
					},
				},
				"bg-fade-in": {
					"0%": {
						"background-color":
							"bg-[conic-gradient(from_90deg_at_50%_50%,#4BE7AE_0%,#043E29_50%,#4BE7AE_100%)]/0",
					},
					"100%": {
						"background-color":
							"bg-[conic-gradient(from_90deg_at_50%_50%,#4BE7AE_0%,#043E29_50%,#4BE7AE_100%)]/100",
					},
				},
				"domain-link-in": {
					"0%": {
						transform: "translateY(0) translateX(0)",
						// "opacity": "0" translate-x-6 translate-y-10
					},
					"100%": {
						transform: "translateY(2.5rem) translateX(1.5rem)",
						// "opacity": "1"
					},
				},
				"domain-link-out": {
					"0%": {
						// "opacity": "0" translate-x-6 translate-y-10
						transform: "translateY(2.5rem) translateX(1.5rem)",
					},
					"100%": {
						transform: "translateY(0) translateX(0)",
						// "opacity": "1"
					},
				},
				"domain-cursor-in": {
					"0%": {
						transform: "translateY(0) translateX(0)",
						// "opacity": "0" translate-x-6 translate-y-10
					},
					"100%": {
						transform: "translateY(-1.25rem) translateX(-1.25rem)",
						// "opacity": "1" -translate-x-5 -translate-y-1/2
					},
				},
				"domain-cursor-out": {
					"0%": {
						// "opacity": "0" translate-x-6 translate-y-10
						transform: "translateY(-1.25rem) translateX(-1.25rem)",
					},
					"100%": {
						transform: "translateY(0) translateX(0)",
						// "opacity": "1"
					},
				},
				"background-shine": {
					from: {
						backgroundPosition: "0 0",
					},
					to: {
						backgroundPosition: "-200% 0",
					},
				},
			},
			animation: {
				"domain-link-in": "domain-link-in 0.8s ease-in-out forwards ",
				"domain-link-out": "domain-link-out 0.8s ease-in-out forwards",
				"domain-cursor-in": "domain-cursor-in 0.8s ease-in-out forwards",
				"domain-cursor-out": "domain-cursor-out 0.8s ease-in-out forwards",
				"background-shine": "background-shine 2s linear infinite",
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"scale-up": "scale-up 0.5s ease-in-out forwards",
				"bg-fade-in": "bg-fade-in 0.5s ease-in-out forwards",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
