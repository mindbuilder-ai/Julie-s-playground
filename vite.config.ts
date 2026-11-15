import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vite';

function copyAudioFolderPlugin() {
  return {
    name: 'copy-audio-folder',
    closeBundle() {
      const srcAudio = path.resolve(__dirname, 'audio');
      const destAudio = path.resolve(__dirname, 'dist', 'audio');
      if (fs.existsSync(srcAudio)) {
        fs.mkdirSync(destAudio, { recursive: true });
        for (const file of fs.readdirSync(srcAudio)) {
          fs.copyFileSync(path.join(srcAudio, file), path.join(destAudio, file));
        }
      }
    },
  };
}

export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss(), copyAudioFolderPlugin()],
  server: {
    hmr: process.env.DISABLE_HMR !== 'true',
  },
});
