import { defineConfig } from 'cypress';

export default defineConfig({
  video: false,
  e2e: {
    supportFile: false,
  },
  env: {
    test: false,
  },
});
