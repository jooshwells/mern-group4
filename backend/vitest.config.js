import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',

    globals: true,

    include: ['src/modules/auth/v2/tests/*.js'],

    testTimeout: 10000,
  },
});
