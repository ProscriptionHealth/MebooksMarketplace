import { defineConfig } from "vite";
import baseConfig from "./vite.config";

// Override the server configuration to use port 5000
export default defineConfig({
  ...baseConfig,
  server: {
    ...baseConfig.server,
    port: 5000,
    host: "0.0.0.0",
  },
});