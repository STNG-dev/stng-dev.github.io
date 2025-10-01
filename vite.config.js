import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import eslint from 'vite-plugin-eslint'
import stylelint from "vite-plugin-stylelint";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	plugins: [
		eslint({
			cache: false,
			include: ["src/**/*.js", "src/**/*.vue", "src/**/*.jsx", "src/**/*.ts"],
			exclude: ["node_modules/**", "dist/**"],
			fix: true,
		}),
		stylelint({
			include: ["src/**/*.css", "src/**/*.scss", "src/**/*.sass", "src/**/*.less"],
			exclude: ["node_modules/**", "dist/**"],
			fix: true,
			emitError: true,
			emitWarning: true,
		})
	],
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, "index.html"),
				formRegTelegram: resolve(__dirname, "formRegTelegram.html"),
			}
		},
		target: "esnext",
		minify: "esbuild",
	},
	server: {
		port: 3000,
		open: true,
	}
});
