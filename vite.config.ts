import path from "node:path";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// https://vite.dev
export default defineConfig({
	plugins: [
		react(),
		babel({ presets: [reactCompilerPreset()] }),
		tailwindcss(),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: "./src/tests/setup.ts",
		coverage: {
			provider: "v8",
			reporter: ["text", "json", "html"],
			// 🚀 SOLUCIÓN: Removimos 'all: false' porque Vitest moderno ya no lo usa en sus tipos.
			exclude: [
				"node_modules/**",
				"src/components/ui/**",
				"src/interfaces/**",
				"src/tests/**",
				"src/main.tsx",
				"src/App.tsx",
				"vite.config.ts",
			],
		},
	},
});
