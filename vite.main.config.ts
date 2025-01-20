import os from "os";
import path from "path";
import { defineConfig } from 'vite';
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vitejs.dev/config
export default defineConfig({
  build: {
    lib: {
      entry: 'src/main.ts',
      fileName: () => '[name].js',
      formats: ["es"]
    }
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: `lib/youtubedr/${process.env.PACKAGE_OS_ARCH || os.arch()
            }/${os.platform()}/*`,
          dest: "lib/youtubedr",
        },
      ]
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@main": path.resolve(__dirname, "./src/main"),
      "@commands": path.resolve(__dirname, "./src/commands"),
    }
  }
});
